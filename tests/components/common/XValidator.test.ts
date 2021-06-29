import "../../VueGlobalConfig";

import { mount } from "@vue/test-utils";

import XValidator from "@/components/common/XValidator.vue";

describe("XValidator.vue", () => {
  it("reactive model", async () => {
    const w = mount(XValidator, {
      props: {
        modelValue: 123,
        rules: [{ between: [1, 100] }]
      }
    });

    expect(w.vm.isValid).toBe(false);

    await w.setProps({
      modelValue: 55,
      rules: [{ between: [1, 100] }]
    });

    expect(w.vm.isValid).toBe(true);
  });

  it("reactive rules", async () => {
    const w = mount(XValidator, {
      props: {
        modelValue: 123,
        rules: [{ between: [1, 100] }]
      }
    });

    expect(w.vm.isValid).toBe(false);

    await w.setProps({
      modelValue: 123,
      rules: [{ between: [1, 200] }]
    });

    expect(w.vm.isValid).toBe(true);
  });
});
