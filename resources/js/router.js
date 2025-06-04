import {
    createRouter,
    createWebHistory,
} from "vue-router";
import Dashboard from "./Pages/Dashboard/Dashboard.vue";
const routes = [
    { name: "home", path: "/", component: Dashboard },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});
export default router;
