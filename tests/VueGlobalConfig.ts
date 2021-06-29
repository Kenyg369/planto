import { config } from "@vue/test-utils";
import Quasar from "quasar";
import { Plugin } from "vue";

import { plugins } from "@/plugins";

const excludePlugins: string[] = ["components"];

const globalPlugins: Plugin[] = [];

Object.entries(plugins).map(([name, plugin]) => {
  if (!excludePlugins.includes(name)) {
    globalPlugins.push(plugin);
  }
});

// quasar need to be imported seperated in jest, due to this bug
// https://github.com/quasarframework/quasar/issues/8607
globalPlugins.push(Quasar);

config.global.plugins = globalPlugins;

