<script setup lang="ts">
import { defineEmit, ref } from "vue";

import { useAuth } from "@/composables/useAuth";
import { Config } from "@/config";

const emit = defineEmit(["toggle-drawer"]);
const { user } = useAuth();

const libertyLink = ref(Config.env("VITE_LIBERTY_HOME"));

const toggleDrawer = (): void => {
  emit("toggle-drawer");
};
</script>

<template>
  <QHeader
    class="bg-white border-b"
  >
    <QToolbar class="mx-auto text-gray-700">
      <QBtn
        dense
        flat
        round
        no-caps
        icon="menu"
        @click="toggleDrawer"
      />

      <QToolbarTitle>
        {{ $t('topNav.title') }}
      </QToolbarTitle>

      <QSpace />

      <QSeparator vertical />
      <QBtn
        icon="open_in_new"
        stretch
        flat
        no-caps
        :label="$t('routes.home')"
        type="a"
        :to="{ name: 'home' }"
        target="_blank"
      />
      <QSeparator vertical />
      <QBtn
        icon="o_perm_identity"
        stretch
        flat
        no-caps
        :label="user ? user.name : ''"
      />
    </QToolbar>
  </QHeader>
</template>
