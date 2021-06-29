<script setup lang="ts">
import { ValidationRules, useValidator } from "@/composables/validators/useValidator";
import { computed, defineProps, defineEmit, PropType, watch, onUpdated } from "vue";

const props = defineProps({
  modelValue: {
    required: true
  },
  rules: {
    required: true,
    type: [Object, String, Array, Function] as PropType<ValidationRules<unknown>>
  }
});
const emit = defineEmit(["validated"]);
const target = computed(() => props.modelValue);
const { isValid, errors, setRules } = useValidator(target, props.rules);

watch(() => props.rules, (newRules) => {
  setRules(newRules);
});
</script>

<template>
  <div v-bind="$attrs">
    <slot
      :isValid="isValid"
      :errors="errors"
    />
  </div>
</template>
