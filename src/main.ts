import "./styles/index.scss";
import "./styles/tailwind.css";

import { createApp } from "vue";

import App from "./App.vue";
import { install as installPlugins } from "./plugins";

const app = createApp(App);
installPlugins(app);
app.mount("#app");
