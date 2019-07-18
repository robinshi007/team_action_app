import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isLoadingRoute: false,
  },
  getters: {
    getIsLoadingRoute: state => state.isLoadingRoute,
  },
  mutations: {
    setLoadingRoute(state, status) {
      state.isLoadingRoute = status;
    },
  },
  actions: {
  },
});
