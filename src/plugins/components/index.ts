import { Quasar, Notify } from "quasar";
import { App, Plugin } from "vue";

export const install = (app: App<Element>): void => {
  app.use(Quasar, {
    plugins: {
      Notify
    },
    config: {
      notify: {
        position: "bottom"
      }
    }
  });
};

export const plugin: Plugin = {
  install
};
