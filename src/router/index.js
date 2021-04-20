import Vue from "vue";
import VueRouter from "vue-router";
import store from "../store";
import oauth from "../auth/oauth";

Vue.use(VueRouter);

function requireAuthenticated(to, from, next) {
  if (!store.getters.isAuthenticated) {
    sessionStorage.setItem('originalRoute', JSON.stringify(to))
    next({ name: "login" });
  } else {
    next();
  }
}

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
      import(/* webpackChunkName: "checkin" */ "../views/CheckinPage.vue"),
    beforeEnter: requireAuthenticated
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
      await oauth.handleCallback(to.query);
      const originalRoute = sessionStorage.getItem('originalRoute');
      if (originalRoute) {
        sessionStorage.removeItem('originalRoute');
        next(JSON.parse(originalRoute));
      } else {
        next({ name: "home" });
      }
    }
  },
  {
    path: "/logout",
    name: "logout",
    beforeEnter: async (to, from, next) => {
      oauth.signOut();
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
