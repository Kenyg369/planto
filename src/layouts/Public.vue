<script setup lang="ts">
import PublicFooter from "@/components/public/common/PublicFooter.vue";
import PublicHeader from "@/components/public/common/PublicHeader.vue";
import { useRoute } from "vue-router";

const route = useRoute();
</script>

<template>
  <QLayout view="hHh lpR fFf">
    <PublicHeader />

    <QPageContainer>
      <QPage
        id="main-page"
        class="p-6"
      >
        <RouterView />
      </QPage>
    </QPageContainer>

    <PublicFooter />
  </QLayout>
</template>
