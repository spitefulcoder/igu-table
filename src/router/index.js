import VueRouter from "vue-router";
import Vue from "vue";

import isAuth from "../auth";

const routes = [
  { path: "/", name: "Main", component: () => import("@/pages/Main.vue") },
  {
    path: "/login",
    name: "Login",
    component: () => import("@/pages/Login.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.name !== "Login" && !isAuth) next({ name: "Login" });
  else next();
});

Vue.use(VueRouter);

export default router;
