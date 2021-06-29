import NProgress from "nprogress";
import { Plugin } from "vue";
import { createRouter, createWebHistory } from "vue-router";
import { AdminRoutes } from "./AdminRoutes";
import { PublicRoutes } from "./PublicRoutes";

const router = createRouter({
  history: createWebHistory("/"),
  routes: [
    ...PublicRoutes,
    ...AdminRoutes
  ]
});

router.beforeEach(() => { NProgress.start(); });
router.afterEach(() => { NProgress.done(); });

export const plugin: Plugin = router;
