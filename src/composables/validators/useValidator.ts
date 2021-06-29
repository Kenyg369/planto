import { i18n } from "@/plugins/i18n";
import { Ref, ref, watchEffect, getCurrentInstance } from "vue";
import { validators } from "./validators";

interface Composable<T> {
  isValid: Ref<boolean>;
  errors: Ref<string[]>;
  validate: () => void;
  setRules: (rules: ValidationRules<T>) => void;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ValidationRuleFunction<T> = (target: T, ...ruleArgs: any[]) => boolean | string;
export type ValidationRuleObject = Record<string, unknown[]>;
export type ValidationRule<T> = string | ValidationRuleFunction<T> | ValidationRuleObject;
export type ValidationRules<T> = ValidationRule<T> | Array<ValidationRule<T>>;
type RuleFunctionInfo<T> = {
  name: string,
  func: ValidationRuleFunction<T>,
  args: unknown[]
};

/**
 * @todo I still need to figure out how to make rules reactive,
 *        for now just use function rule as workaround. Also since function rule is
 *        supported, I'm not sure if we really need to support reactive rule.
 * @param target target has to be an reactive ref
 * @param rules rules formats:
 * 1. simple predefined rule
 * useValidator(ref(123), 'required')
 *
 * 2. list of simple predefined rule
 * useValidator(ref(123), ['required', 'date'])
 *
 * 3. predefined rule with arguments
 * useValidator(ref(123), {
 *  between: [0, 200]
 * })
 *
 * 4. custom validator function
 * useValidator(ref(123), target => target > 0 || i18n.global.t("validations.required"))
 *
 * 5. list of mixed format rules
 * useValidator(ref(123), ['required', { between: [0, 200] }, target => typeof target === 'number' || i18n.global.t("validations.number"))])
 */
export const useValidator = <T = unknown>(target: Ref<T>, rules: ValidationRules<T>): Composable<T> => {
  const component = getCurrentInstance();

  const isValid = ref(true);
  const errors = ref<string[]>([]);
  const _rules = ref<ValidationRules<T>>(rules);

  const _getRuleFunction = (rule: ValidationRule<T>): RuleFunctionInfo<T> | undefined => {
    if (typeof rule === "function") {
      return {
        name: "function",
        func: rule,
        args: []
      };
    }

    if (typeof rule === "string") {
      const validator = validators[rule as keyof typeof validators] as ValidationRuleFunction<T>;

      if (!validator) { return; }

      return {
        name: rule,
        func: validator,
        args: []
      };
    }

    if (typeof rule === "object") {
      const validator = validators[Object.keys(rule)[0] as keyof typeof validators] as ValidationRuleFunction<T>;

      if (!validator) { return; }

      return {
        name: Object.keys(rule)[0],
        func: validator,
        args: Object.values(rule)[0]
      };
    }
  };

  const _validateWithRule = (rule: ValidationRule<T>): ReturnType<ValidationRuleFunction<T>> => {
    const validatorFunction = _getRuleFunction(rule);

    // skip validation when rule is empty
    if (rule === "") {
      return true;
    }

    if (!validatorFunction) {
      throw new Error(i18n.global.t("validations.invalidRule"));
    }

    const result = validatorFunction.func(target.value, ...validatorFunction.args);

    if (typeof result === "string") {
      errors.value.push(result);
      isValid.value = false;
    }

    if (result === false) {
      if (i18n.global.te(`validations.${validatorFunction.name}`)) {
        errors.value.push(i18n.global.t(`validations.${validatorFunction.name}`, validatorFunction.args));
      }
      isValid.value = false;
    }

    return result;
  };

  const validate = (): void => {
    errors.value = [];
    isValid.value = true;

    if (Array.isArray(_rules.value)) {
      for (const rule of _rules.value) {
        _validateWithRule(rule);
      }
    }
    else {
      _validateWithRule(_rules.value);
    }

    if (component) {
      component.emit("validated", isValid.value);
    }
  };

  const setRules = (rules: ValidationRules<T>): void => {
    _rules.value = rules;
  };

  watchEffect(() => {
    validate();
  });

  return {
    isValid,
    errors,
    validate,
    setRules
  };
};
