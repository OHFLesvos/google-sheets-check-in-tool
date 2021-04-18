import Vue from "vue";
import VueRouter from "vue-router";
import store from "../store";
import oauth from "../oauth";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: () =>
      import(/* webpackChunkName: "home" */ "../views/HomePage.vue")
  },
  {
    path: "/checkin",
    name: "checkin",
    component: () =>
      import(/* webpackChunkName: "checkin" */ "../views/CheckinPage.vue")
  },
  {
    path: "/login",
    name: "login",
    component: () =>
      import(/* webpackChunkName: "login" */ "../views/LoginView.vue")
  },
  {
    path: "/callback",
    name: "callback",
    beforeEnter: async (to, from, next) => {
      await oauth.handleCallback(to.query)
      next({ name: "home" });
    }
  },
  {
    path: "*",
    component: () =>
      import(/* webpackChunkName: "notFound" */ "../views/NotFoundPage.vue")
  }
];

const router = new VueRouter({
  routes,
  mode: "history"
});

router.beforeEach((to, from, next) => {
  store.commit("resetTitle");
  store.commit("setExternalUrl", null);
  next();
});

export default router;
