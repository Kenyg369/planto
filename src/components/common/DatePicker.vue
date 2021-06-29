<script setup lang="ts">
import { validators } from "@/composables/validators/validators";
import { defineEmit, defineProps, ref } from "vue";

const props = defineProps({
  modelValue: {
    type: String,
  },
  before: String,
  after: String,
  error: String,
  label: String,
  isValid: Boolean,
  clearable: {
    type: Boolean,
    default: false
  },
  readonly: {
    type: Boolean,
    default: true
  },
  disable: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmit(["update:modelValue"]);

const qDateProxy = ref(null);
const options = (date: string): boolean => {
  const isoDate = date.split("/").join("-");
  let isSelectable = true;
  if (props.after) {
    isSelectable &&= validators.dateAfter(isoDate, props.after) as boolean;
  }

  if (props.before) {
    isSelectable &&= validators.dateBefore(isoDate, props.before) as boolean;
  }

  return isSelectable;
};

const updateDate = (date: string | null): void => {
  if (date) {
    emit("update:modelValue", date);
  }
  else if (props.clearable) {
    emit("update:modelValue", date);
  }
};
</script>
<template>
  <QInput
    data-liberty-id="input-date-picker"
    :model-value="modelValue"
    mask="####-##-##"
    outlined
    :clearable="clearable"
    :readonly="readonly"
    :label="label"
    no-error-icon
    :error-message="error"
    :error="!isValid"
    :disable="disable"
    @update:modelValue="updateDate"
  >
    <template v-slot:append>
      <QIcon
        data-liberty-id="icon-date-picker"
        name="event"
        class="cursor-pointer"
      >
        <QPopupProxy
          ref="qDateProxy"
          transition-show="scale"
          transition-hide="scale"
        >
          <QDate
            data-liberty-id="picker-date-picker"
            :model-value="modelValue"
            :options="options"
            mask="YYYY-MM-DD"
            @update:modelValue="updateDate"
          >
            <div class="row items-center justify-end">
              <QBtn
                v-close-popup
                icon="done"
                color="primary"
                flat
              />
            </div>
          </QDate>
        </QPopupProxy>
      </QIcon>
    </template>
  </QInput>
</template>
