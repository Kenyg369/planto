<script setup lang="ts">
import { defineProps } from "vue";

defineProps({
  id: {
    type: String,
    required: true
  }
});
</script>

<template>
  <div>Device {{ id }} Details</div>
</template>
