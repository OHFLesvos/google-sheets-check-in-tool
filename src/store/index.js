import Vue from "vue";
import Vuex from "vuex";

const DEFAULT_TITLE = "Check-in Tool";

Vue.use(Vuex);

/* eslint-disable no-new */
const store = new Vuex.Store({
  state: {
    title: DEFAULT_TITLE,
    externalUrl: null,
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
    resetExternalUrl(state) {
      state.externalUrl = null;
    },
  },
});

export default store;
