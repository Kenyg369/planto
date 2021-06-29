declare module "*.vue" {
  import type { DefineComponent } from "vue";
  const component: DefineComponent;
  export default component;
}

declare module "quasar/dist/icon-set/svg-fontawesome-v5.umd.prod";
