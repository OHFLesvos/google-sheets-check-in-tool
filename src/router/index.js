import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: () =>
      import(/* webpackChunkName: "home" */ "../views/HomePage.vue"),
  },
  {
    path: "/checkin",
    name: "checkin",
    component: () =>
      import(/* webpackChunkName: "checkin" */ "../views/CheckinPage.vue"),
  },
];

const router = new VueRouter({
  routes,
});

import store from "../store";
router.beforeEach((to, from, next) => {
  store.commit("resetTitle");
  store.commit("resetExternalUrl");
  next();
});

export default router;
