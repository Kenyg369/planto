import { useLoading } from "@/composables/useLoading";

describe("useLoading composable", () => {
  const { isLoading } = useLoading();

  it("isLoading", () => {
    expect(isLoading.value).toBe(false);

    isLoading.value = true;

    const { isLoading: isLoading2 } = useLoading();

    expect(isLoading2.value).toBe(true);
  });
});
