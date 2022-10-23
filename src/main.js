import Vue from "vue";
import App from "./App.vue";
import Login from "./pages/Login.vue";
import Main from "./pages/Main.vue";

import { BootstrapVue, IconsPlugin } from "bootstrap-vue";
import vSelect from "vue-select";
import "vue-select/dist/vue-select.css";
import VueRouter from "vue-router";

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import "./assets/main.css";

Vue.use(VueRouter);
Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
Vue.component("v-select", vSelect);

const router = new VueRouter({
  mode: "history",
  routes: [
    { path: "", component: Main, name: "Main" },
    { path: "/login", component: Login, name: "login" },
  ],
});

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
