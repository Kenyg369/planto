import "../../VueGlobalConfig";

import { mount } from "@vue/test-utils";

import DatePicker from "@/components/common/DatePicker.vue";
import { QDate, QInput } from "quasar";

describe("DatePicker.vue", () => {
  it("components", async () => {
    const wrapper = mount(DatePicker);
    expect(wrapper.findComponent(QDate)).toBeDefined();
    expect(wrapper.findComponent(QInput)).toBeDefined();
  });

  it("date options", async () => {
    const wrapper = mount(DatePicker, {
      props: {
        before: "2021-06-25",
        after: "2020-06-25"
      }
    });
    expect(wrapper.vm.options("2020-09-25")).toBe(true);
    expect(wrapper.vm.options("2022-09-25")).toBe(false);
    expect(wrapper.vm.options("2019-09-25")).toBe(false);
  });

  it("updateDate", async () => {
    const w = mount(DatePicker);

    w.vm.updateDate(null);
    expect(w.emitted()).not.toHaveProperty("update:modelValue");

    w.vm.updateDate("2020-09-25");
    expect(w.emitted()).toHaveProperty("update:modelValue");
    expect(w.emitted()["update:modelValue"][0]).toEqual(["2020-09-25"]);

    await w.setProps({
      clearable: true
    });
    w.vm.updateDate(null);
    expect(w.emitted()).toHaveProperty("update:modelValue");
    expect(w.emitted()["update:modelValue"][1]).toEqual([null]);
  });
});
