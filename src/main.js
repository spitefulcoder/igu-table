import Vue from "vue";
import App from "./App.vue";
import isAuth from "./auth";
import router from "./router";

import { BootstrapVue, IconsPlugin } from "bootstrap-vue";
import vSelect from "vue-select";
import "vue-select/dist/vue-select.css";

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import "./assets/main.css";

Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
Vue.component("v-select", vSelect);

new Vue({
  router,
  data: isAuth,
  render: (h) => h(App),
}).$mount("#app");
