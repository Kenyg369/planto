import { mount, VueWrapper } from "@vue/test-utils";
import { ComponentPublicInstance } from "vue";

// eslint-disable-next-line @typescript-eslint/ban-types,max-len,@typescript-eslint/no-explicit-any
export function useComposition<T extends (...args: any[]) => any>(composable: T, ...args: Parameters<T>): VueWrapper<ComponentPublicInstance<{}, ReturnType<typeof composable>>> {
  return mount({
    template: "<template />",
    emits: ["validated"],
    setup: () => composable(...args)
  });
}
