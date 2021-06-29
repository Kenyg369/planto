import { Ref, ComputedRef, ref, computed } from "vue";

interface Composable {
  validationState: Ref<Record<string, boolean>>;
  allValid: ComputedRef<boolean>;
  onValidated: (key: string, isValid: boolean) => void;
  resetValidationState: () => void;
}

export const useValidationState = (): Composable => {
  const validationState = ref<Record<string, boolean>>({});
  const allValid = computed(() => Object.values(validationState.value).every(state => state));

  const onValidated = (key: string, isValid: boolean): void => {
    validationState.value[key] = isValid;
  };

  const resetValidationState = (): void => {
    validationState.value = {};
  };

  return {
    validationState,
    allValid,
    onValidated,
    resetValidationState
  };
};
