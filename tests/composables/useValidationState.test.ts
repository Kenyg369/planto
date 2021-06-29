import { useValidationState } from "@/composables/validators/useValidationState";
import { useComposition } from "../mocks/useComposition";

describe("useValidationState composable", () => {
  const w = useComposition(useValidationState);

  it("int state", () => {
    expect(w.vm.validationState).toEqual({});
    expect(w.vm.allValid).toBe(true);
    expect(w.vm.onValidated).toBeDefined();
    expect(w.vm.resetValidationState).toBeDefined();
  });

  it("set state", () => {
    w.vm.onValidated("fieldName", true);
    expect(w.vm.validationState).toEqual({ "fieldName": true });
    expect(w.vm.allValid).toBe(true);

    w.vm.onValidated("fieldName2", true);
    expect(w.vm.validationState).toEqual({
      "fieldName": true,
      "fieldName2": true
    });
    expect(w.vm.allValid).toBe(true);

    w.vm.onValidated("fieldName3", false);
    expect(w.vm.validationState).toEqual({
      "fieldName": true,
      "fieldName2": true,
      "fieldName3": false,
    });
    expect(w.vm.allValid).toBe(false);
  });

  it("reset state", () => {
    expect(w.vm.validationState).toEqual({
      "fieldName": true,
      "fieldName2": true,
      "fieldName3": false,
    });
    expect(w.vm.allValid).toBe(false);

    w.vm.resetValidationState();
    expect(w.vm.validationState).toEqual({});
    expect(w.vm.allValid).toBe(true);
  });
});
