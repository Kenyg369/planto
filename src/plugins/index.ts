import { App } from "vue";

import { plugin as componentsPlugin } from "./components";
import { plugin as headPlugin } from "./head";
import { plugin as i18nPlugin } from "./i18n";
import { plugin as routerPlugin } from "./router";

export const plugins = {
  head: headPlugin,
  i18n: i18nPlugin,
  router: routerPlugin,
  components: componentsPlugin
};

export const install = (app: App<Element>): void => {
  Object.values(plugins).forEach((plugin) => {
    app.use(plugin);
  });
};
