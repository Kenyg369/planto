<script setup lang="ts">
import { ref } from "vue";
import { useRoute } from "vue-router";

import AdminDrawer from "@/components/admin/common/AdminDrawer.vue";
import AdminHeader from "@/components/admin/common/AdminHeader.vue";
import { Config } from "@/config";

const shouldOpenDrawer = ref(window && window.innerWidth > Config.breakpoints.xl);
const route = useRoute();

</script>

<template>
  <!-- https://next.quasar.dev/layout-builder -->
  <QLayout view="hHh Lpr lFf">
    <AdminHeader @toggle-drawer="shouldOpenDrawer = !shouldOpenDrawer" />

    <AdminDrawer :should-open="shouldOpenDrawer" />

    <QPageContainer>
      <QPage
        id="main-page"
        class="p-6"
      >
        <h1 class="text-4xl text-primary pb-2 my-8 border-b-2">
          {{ $t(`routes.${route.name}`) }}
        </h1>
        <RouterView />
      </QPage>
    </QPageContainer>
  </QLayout>
</template>
