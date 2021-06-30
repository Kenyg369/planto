<script setup lang="ts">
import { useHead } from "@vueuse/head";
import { onMounted } from "vue";
import { useRouter } from "vue-router";

import { useAuth } from "./composables/useAuth";
import { useLoading } from "./composables/useLoading";

const { loadUser, isAuthenticated } = useAuth();
const router = useRouter();
const { isLoading } = useLoading();

useHead({
  title: "Planto",
  meta: [
    { name: "description", content: "planto - the automated plant grow showcase." },
  ],
});

onMounted(async () => {
  isLoading.value = true;

  loadUser();

  // if (!isAuthenticated()) {
  //   router.push({ name: "unauthorized" });
  // }
  // else if (!hasRole(Role.Manager)) {
  //   router.push({ name: "forbidden" });
  // }
  isLoading.value = false;
});
</script>

<template>
  <RouterView />
  <QInnerLoading :showing="isLoading">
    <QSpinnerCube
      size="xl"
      color="primary"
    />
  </QInnerLoading>
</template>
