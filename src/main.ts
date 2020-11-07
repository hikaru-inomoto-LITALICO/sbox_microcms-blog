import { createApp } from "vue";
import { createRouter } from "./router";
import App from "./App.vue";
import "./index.css";

createApp(App).use(createRouter()).mount("#app");
