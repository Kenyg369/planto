<script>
export default {
  layout: "Admin"
};
</script>

<script setup>
import DeviceDetails from "@/components/admin/devices/DeviceDetails.vue";
import { defineProps } from "vue";

defineProps({
  id: {
    type: String,
    required: true
  }
});
</script>

<template>
  <div>
    <DeviceDetails :id="id" />
  </div>
</template>
