import { Ref, ref } from "vue";

interface Composable {
  isLoading: Ref<boolean>;
}
const isLoading = ref(false);

export const useLoading = (): Composable => {
  return {
    isLoading
  };
};
