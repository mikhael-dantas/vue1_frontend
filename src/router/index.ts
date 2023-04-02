import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import HomeView from "../views/HomeView.vue";
import HelloWorld2 from "../views/HelloWorld2.vue";
import HelloWorld3 from "../views/HelloWorld3.vue";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    name: "Home",
    component: HomeView,
  },
  {
    path: "/hello-world-2",
    name: "HelloWorld2",
    component: HelloWorld2,
  },
  {
    path: "/hello-world-3",
    name: "HelloWorld3",
    component: HelloWorld3,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
