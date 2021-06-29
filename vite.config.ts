import vueI18n from "@intlify/vite-plugin-vue-i18n";
import vue from "@vitejs/plugin-vue";
import path from "path";
import { defineConfig } from "vite";

export default defineConfig({
  base: "/",
  resolve: {
    alias: {
      "@/": `${path.resolve(__dirname, "src")}/`,
    },
  },
  server: {
    port: 8888,
    open: true
  },
  plugins: [
    vue(),
    // https://github.com/intlify/vite-plugin-vue-i18n
    vueI18n({
      include: [path.resolve(__dirname, "src/plugins/i18n/*.json")],
    }),
  ],
  optimizeDeps: {
    include: [
      "vue",
      "vue-i18n",
      "vue-router",
      "@vueuse/core",
      "axios"
    ],
  }
});
