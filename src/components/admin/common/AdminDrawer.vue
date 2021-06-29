<script setup lang="ts">
import { defineProps } from "vue";

defineProps({
  shouldOpen: {
    type: Boolean,
    default: true
  }
});
</script>

<template>
  <QDrawer
    :model-value="shouldOpen"
    side="left"
    bordered
  >
    <QList>
      <QExpansionItem
        :to="{ name: 'admin-devices' }"
        expand-separator
        icon="o_people_alt"
        :label="$t('routes.devices')"
        expand-icon="none"
      />
    </QList>
  </QDrawer>
</template>
