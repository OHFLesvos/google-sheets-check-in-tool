import Vue from "vue";
import VueRouter from "vue-router";
import store from "../store";

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
  {
    path: "/login",
    name: "login",
    component: () =>
      import(/* webpackChunkName: "login" */ "../views/LoginView.vue"),
  },
  {
    path: "/callback",
    name: "callback",
    component: () =>
      import(/* webpackChunkName: "login" */ "../views/LoginView.vue"),
  },
];

const router = new VueRouter({
  routes,
  mode: "history",
});

router.beforeEach((to, from, next) => {
  store.commit("resetTitle");
  store.commit("setExternalUrl", null);
  next();
});

export default router;
