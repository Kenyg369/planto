import { createRouterLayout } from "vue-router-layout";

// Create <RouterLayout> component.
export const RouterLayout = createRouterLayout(async (layout) => {
  // Resolves a layout component with layout type string.
  return await import(`../../layouts/${layout === "default" ? "Public" : layout}.vue`);
});
