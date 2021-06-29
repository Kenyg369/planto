import { Plugin } from "vue";
import { createI18n } from "vue-i18n";

import en from "./en.json";
import fr from "./fr.json";

export const i18n = createI18n({
  legacy: false,
  globalInjection: true,
  locale: "en",
  messages: {
    en,
    fr
  },
});

export const plugin: Plugin = i18n;
