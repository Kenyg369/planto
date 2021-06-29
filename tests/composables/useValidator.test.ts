import { useValidator } from "@/composables/validators/useValidator";
import { i18n } from "@/plugins/i18n";
import { useComposition } from "../mocks/useComposition";
import { ref } from "vue";
import { validators } from "@/composables/validators/validators";

describe("useValidator functionality", () => {
  it("invalid validation function", async () => {
    const target = ref();
    expect(() => useComposition(useValidator, target, "someNoneExistFunction")).toThrowError(i18n.global.t("validations.invalidRule"));
    expect(() => useComposition(useValidator, target, { "someNoneExistFunction": [] })).toThrowError(i18n.global.t("validations.invalidRule"));
  });

  it("reactive target", async () => {
    const target = ref();
    const w = useComposition(useValidator, target, "required");
    expect(target.value).toBeUndefined();
    expect(w.vm.isValid).toBe(false);
    expect(w.vm.errors).toHaveLength(1);
    expect(w.vm.errors[0]).toBe(i18n.global.t("validations.required"));
    expect(w.emitted()).toHaveProperty("validated");
    expect(w.emitted()["validated"][0]).toEqual([false]);

    target.value = 123;
    await w.vm.$nextTick();
    expect(w.vm.isValid).toBe(true);
    expect(w.emitted()).toHaveProperty("validated");
    expect(w.emitted()["validated"][1]).toEqual([true]);
  });

  it("empty rule", async () => {
    const target = ref();
    const w = useComposition(useValidator, target, "");
    expect(target.value).toBeUndefined();
    expect(w.vm.isValid).toBe(true);

    target.value = 123;
    await w.vm.$nextTick();
    expect(w.vm.isValid).toBe(true);
  });

  /**
   * This an example of using function rule to workaround reactive rule
   */
  it("reactive rule", async () => {
    const target = ref(11);
    const w = useComposition(() => useValidator<number>(target, target => {
      const range = target > 10 ? [20, 50] : [0, 5];

      return validators.between(target, ...range) || i18n.global.t("validations.between", range);
    }));
    expect(w.vm.isValid).toBe(false);
    expect(w.vm.errors).toHaveLength(1);
    expect(w.vm.errors[0]).toBe(i18n.global.t("validations.between", [20, 50]));

    target.value = 22;
    await w.vm.$nextTick();
    expect(w.vm.isValid).toBe(true);

    target.value = 7;
    await w.vm.$nextTick();
    expect(w.vm.isValid).toBe(false);
    expect(w.vm.errors).toHaveLength(1);
    expect(w.vm.errors[0]).toBe(i18n.global.t("validations.between", [0, 5]));

    target.value = 3;
    await w.vm.$nextTick();
    expect(w.vm.isValid).toBe(true);
  });

  it("reset rules", async () => {
    const target = ref(10);
    const range = [0, 5];

    const w = useComposition(() => useValidator<number>(target, { between: range }));
    expect(w.vm.isValid).toBe(false);
    expect(w.vm.errors).toHaveLength(1);
    expect(w.vm.errors[0]).toBe(i18n.global.t("validations.between", range));

    w.vm.setRules({ between: [7, 15] });
    await w.vm.$nextTick();
    expect(w.vm.isValid).toBe(true);

    w.vm.setRules({ between: [11, 15] });
    await w.vm.$nextTick();
    expect(w.vm.isValid).toBe(false);
    expect(w.vm.errors).toHaveLength(1);
    expect(w.vm.errors[0]).toBe(i18n.global.t("validations.between", [11, 15]));
  });

  it("function rule", async () => {
    const target = ref();
    const w = useComposition(() => useValidator<number>(target, target => target > 99));
    expect(target.value).toBeUndefined();
    expect(w.vm.isValid).toBe(false);
    expect(w.vm.errors).toHaveLength(1);
    expect(w.vm.errors[0]).toBe(i18n.global.t("validations.function"));

    target.value = 123;
    await w.vm.$nextTick();
    expect(w.vm.isValid).toBe(true);
  });

  it("function rule return custom error message", async () => {
    const target = ref();
    const w = useComposition(() => useValidator<number>(target, target => target > 99 || "too small bro"));
    expect(target.value).toBeUndefined();
    expect(w.vm.isValid).toBe(false);
    expect(w.vm.errors).toHaveLength(1);
    expect(w.vm.errors[0]).toBe("too small bro");

    target.value = 123;
    await w.vm.$nextTick();
    expect(w.vm.isValid).toBe(true);
    expect(w.vm.errors).toHaveLength(0);
  });

  it("object rule / between", async () => {
    const target = ref();
    const w = useComposition(() => useValidator<number>(target, {
      between: [0, 100]
    }));
    expect(target.value).toBeUndefined();
    expect(w.vm.isValid).toBe(false);
    expect(w.vm.errors).toHaveLength(1);
    expect(w.vm.errors[0]).toBe(i18n.global.t("validations.between", [0, 100]));

    target.value = 0;
    await w.vm.$nextTick();
    expect(w.vm.isValid).toBe(false);

    target.value = 100;
    await w.vm.$nextTick();
    expect(w.vm.isValid).toBe(false);

    target.value = -1;
    await w.vm.$nextTick();
    expect(w.vm.isValid).toBe(false);

    target.value = 101;
    await w.vm.$nextTick();
    expect(w.vm.isValid).toBe(false);

    target.value = 55;
    await w.vm.$nextTick();
    expect(w.vm.isValid).toBe(true);
  });

  it("multiple rules", async () => {
    const target = ref();
    const w = useComposition(() => useValidator<number>(target, [
      "required",
      "number",
      { between: [0, 100] },
      (target): boolean | string => target % 2 === 0 || "Must be even number"
    ]));

    expect(target.value).toBeUndefined();
    expect(w.vm.isValid).toBe(false);
    expect(w.vm.errors).toHaveLength(4);
    expect(w.vm.errors[0]).toBe(i18n.global.t("validations.required"));
    expect(w.vm.errors[1]).toBe(i18n.global.t("validations.number"));
    expect(w.vm.errors[2]).toBe(i18n.global.t("validations.between", [0, 100]));
    expect(w.vm.errors[3]).toBe("Must be even number");

    target.value = 54;
    await w.vm.$nextTick();
    expect(w.vm.isValid).toBe(true);
    expect(w.vm.errors).toHaveLength(0);
  });
});

describe("useValidator Rule: required", () => {
  const target = ref();
  const w = useComposition(useValidator, target, "required");

  it("undefined target", async () => {
    expect(target.value).toBeUndefined();
    expect(w.vm.isValid).toBe(false);
    expect(w.vm.errors).toHaveLength(1);
    expect(w.vm.errors[0]).toBe(i18n.global.t("validations.required"));
  });

  it("null target", async () => {
    target.value = null;
    await w.vm.$nextTick();
    expect(w.vm.isValid).toBe(false);
    expect(w.vm.errors).toHaveLength(1);
    expect(w.vm.errors[0]).toBe(i18n.global.t("validations.required"));
  });
});

describe("useValidator Rule: date", () => {
  const target = ref();
  const w = useComposition(useValidator, target, "date");

  it("undefined target", async () => {
    expect(target.value).toBeUndefined();
    expect(w.vm.isValid).toBe(false);
    expect(w.vm.errors).toHaveLength(1);
    expect(w.vm.errors[0]).toBe(i18n.global.t("validations.date"));
  });

  it("null target", async () => {
    target.value = null;
    await w.vm.$nextTick();
    expect(w.vm.isValid).toBe(false);
    expect(w.vm.errors).toHaveLength(1);
    expect(w.vm.errors[0]).toBe(i18n.global.t("validations.date"));
  });

  it("empty string target", async () => {
    target.value = "";
    await w.vm.$nextTick();
    expect(w.vm.isValid).toBe(false);
    expect(w.vm.errors).toHaveLength(1);
    expect(w.vm.errors[0]).toBe(i18n.global.t("validations.date"));
  });

  it("timestamp target", async () => {
    target.value = 1488370835081;
    await w.vm.$nextTick();
    expect(w.vm.isValid).toBe(true);
    expect(w.vm.errors).toHaveLength(0);
  });

  it("iso target", async () => {
    target.value = "2019-09-18T19:00:52Z";
    await w.vm.$nextTick();
    expect(w.vm.isValid).toBe(true);
    expect(w.vm.errors).toHaveLength(0);
  });
});

describe("useValidator type check Rules", () => {
  it("isType", async () => {
    const target = ref();
    const w = useComposition(() => useValidator(target, { isType: ["number"] }));
    expect(target.value).toBeUndefined();
    expect(w.vm.isValid).toBe(false);
    expect(w.vm.errors).toHaveLength(1);
    expect(w.vm.errors[0]).toBe(i18n.global.t("validations.isType"));

    target.value = 123;
    await w.vm.$nextTick();
    expect(w.vm.isValid).toBe(true);
    expect(w.vm.errors).toHaveLength(0);
  });

  it("number", async () => {
    const target = ref();
    const w = useComposition(() => useValidator(target, "number"));
    expect(target.value).toBeUndefined();
    expect(w.vm.isValid).toBe(false);
    expect(w.vm.errors).toHaveLength(1);
    expect(w.vm.errors[0]).toBe(i18n.global.t("validations.number"));

    target.value = 123;
    await w.vm.$nextTick();
    expect(w.vm.isValid).toBe(true);
    expect(w.vm.errors).toHaveLength(0);
  });

  it("string", async () => {
    const target = ref();
    const w = useComposition(() => useValidator(target, "string"));
    expect(target.value).toBeUndefined();
    expect(w.vm.isValid).toBe(false);
    expect(w.vm.errors).toHaveLength(1);
    expect(w.vm.errors[0]).toBe(i18n.global.t("validations.string"));

    target.value = "123";
    await w.vm.$nextTick();
    expect(w.vm.isValid).toBe(true);
    expect(w.vm.errors).toHaveLength(0);
  });

  it("boolean", async () => {
    const target = ref();
    const w = useComposition(() => useValidator(target, "boolean"));
    expect(target.value).toBeUndefined();
    expect(w.vm.isValid).toBe(false);
    expect(w.vm.errors).toHaveLength(1);
    expect(w.vm.errors[0]).toBe(i18n.global.t("validations.boolean"));

    target.value = false;
    await w.vm.$nextTick();
    expect(w.vm.isValid).toBe(true);
    expect(w.vm.errors).toHaveLength(0);
  });

  it("object", async () => {
    const target = ref();
    const w = useComposition(() => useValidator(target, "object"));
    expect(target.value).toBeUndefined();
    expect(w.vm.isValid).toBe(false);
    expect(w.vm.errors).toHaveLength(1);
    expect(w.vm.errors[0]).toBe(i18n.global.t("validations.object"));

    target.value = {};
    await w.vm.$nextTick();
    expect(w.vm.isValid).toBe(true);
    expect(w.vm.errors).toHaveLength(0);
  });

  it("array", async () => {
    const target = ref();
    const w = useComposition(() => useValidator(target, "array"));
    expect(target.value).toBeUndefined();
    expect(w.vm.isValid).toBe(false);
    expect(w.vm.errors).toHaveLength(1);
    expect(w.vm.errors[0]).toBe(i18n.global.t("validations.array"));

    target.value = [];
    await w.vm.$nextTick();
    expect(w.vm.isValid).toBe(true);
    expect(w.vm.errors).toHaveLength(0);
  });
});

describe("dateBefore", () => {
  const target = ref<string | null>("2022-05-26");
  const w = useComposition(() => useValidator(target, { dateBefore: ["2022-05-26"] }));

  it("same day", async () => {
    expect(w.vm.isValid).toBe(true);
    expect(w.vm.errors).toHaveLength(0);
  });

  it("invalid day", async () => {
    target.value = null;
    await w.vm.$nextTick();
    expect(w.vm.isValid).toBe(false);
    expect(w.vm.errors).toHaveLength(1);
    expect(w.vm.errors[0]).toBe(i18n.global.t("validations.dateBefore"));
  });

  it("same day with time", async () => {
    target.value = "2022-05-26T11:30:30";
    await w.vm.$nextTick();
    expect(w.vm.isValid).toBe(true);
    expect(w.vm.errors).toHaveLength(0);
  });

  it("previous day", async () => {
    target.value = "2021-05-26T11:30:30";
    await w.vm.$nextTick();
    expect(w.vm.isValid).toBe(true);
    expect(w.vm.errors).toHaveLength(0);
  });

  it("later day", async () => {
    target.value = "2023-05-26T11:30:30";
    await w.vm.$nextTick();
    expect(w.vm.isValid).toBe(false);
    expect(w.vm.errors).toHaveLength(1);
    expect(w.vm.errors[0]).toBe(i18n.global.t("validations.dateBefore"));
  });
});

describe("dateAfter", () => {
  const target = ref<string | null>("2022-05-26");
  const w = useComposition(() => useValidator(target, { dateAfter: ["2022-05-26"] }));

  it("same day", async () => {
    expect(w.vm.isValid).toBe(true);
    expect(w.vm.errors).toHaveLength(0);
  });

  it("invalid day", async () => {
    target.value = null;
    await w.vm.$nextTick();
    expect(w.vm.isValid).toBe(false);
    expect(w.vm.errors).toHaveLength(1);
    expect(w.vm.errors[0]).toBe(i18n.global.t("validations.dateAfter"));
  });

  it("same day with time", async () => {
    target.value = "2022-05-26T11:30:30";
    await w.vm.$nextTick();
    expect(w.vm.isValid).toBe(true);
    expect(w.vm.errors).toHaveLength(0);
  });

  it("previous day", async () => {
    target.value = "2021-05-26T11:30:30";
    await w.vm.$nextTick();
    expect(w.vm.isValid).toBe(false);
    expect(w.vm.errors).toHaveLength(1);
    expect(w.vm.errors[0]).toBe(i18n.global.t("validations.dateAfter"));
  });

  it("later day", async () => {
    target.value = "2023-05-26T11:30:30";
    await w.vm.$nextTick();
    expect(w.vm.isValid).toBe(true);
    expect(w.vm.errors).toHaveLength(0);
  });
});

describe("notEmpty", () => {
  const target = ref<string[]>([]);
  const w = useComposition(() => useValidator(target, "notEmpty"));

  it("not empty", async () => {
    expect(w.vm.isValid).toBe(false);
    expect(w.vm.errors).toHaveLength(1);
    expect(w.vm.errors[0]).toBe(i18n.global.t("validations.notEmpty"));
  });

  it("invalid day", async () => {
    target.value = ["123"];
    await w.vm.$nextTick();
    expect(w.vm.isValid).toBe(true);
    expect(w.vm.errors).toHaveLength(0);
  });
});
