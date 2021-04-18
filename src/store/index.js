import Vue from "vue";
import Vuex from "vuex";

const DEFAULT_TITLE = "Check-in Tool";

Vue.use(Vuex);

/* eslint-disable no-new */
const store = new Vuex.Store({
  state: {
    title: DEFAULT_TITLE,
    externalUrl: null,
    access_token: null,
    refresh_token: null,
    expiry_date: null
  },
  mutations: {
    setTitle(state, value) {
      state.title = value;
    },
    resetTitle(state) {
      state.title = DEFAULT_TITLE;
    },
    setExternalUrl(state, value) {
      state.externalUrl = value;
    },
    setAuthenticated(state, { access_token, refresh_token, expiry_date }) {
      state.access_token = access_token;
      state.refresh_token = refresh_token;
      state.expiry_date = expiry_date;
    },
    clearAuthenticated(state) {
      state.access_token = null;
      state.refresh_token = null;
      state.expiry_date = null;
    }
  },
  getters: {
    isAuthenticated(state) {
      return !!state.access_token;
    }
  }
});

export default store;
