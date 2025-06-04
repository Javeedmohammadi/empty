import "./assets/main.css";
import "tailwindcss/tailwind.css";
import { createApp } from "vue";
import router from "./router.js";
import { createPinia } from "pinia";
import App from "./app.vue";
import "./axios";
import "@mdi/font/css/materialdesignicons.css";
import "vuetify/styles";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";

const vuetify = createVuetify({
    components,
    directives,
});

const app = createApp(App);

app.use(router);
app.use(vuetify, {
    theme: {
        primary: "#0095E8",
    },
});

app.use(createPinia());

app.mount("#app");
