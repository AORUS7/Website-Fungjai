import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { auth } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";

import "./style.css";

let app;

onAuthStateChanged(auth, () => {
  if (!app) {
    app = createApp(App);
    app.use(router);
    app.mount("#app");
  }
});