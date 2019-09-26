import Vue from 'vue';
import Vuex from 'vuex';

import noteStore from './noteStore';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    noteStore,
  },
  state: {
    status: '',
    token: localStorage.getItem('token') || '',
    username: localStorage.getItem('username') || '',
    session_time: localStorage.getItem('session_time') || '',
    search_text: '',
    search_result: [],
  },
  getters: {
    isLoggedIn: state => !!state.token,
    authStatus: state => state.status,
    username: state => state.username,
    sessionTime: state => state.session_time,
    searchText: state => state.search_text,
    searchResult: state => state.search_result,
  },
  mutations: {
    auth_request(state) {
      state.status = 'loading';
    },
    auth_success(state, token) {
      state.status = 'success';
      state.token = token;
      state.session_time = (new Date()).toISOString();
      localStorage.setItem('token', token);
      localStorage.setItem('session_time', (new Date()).toISOString());
    },
    auth_error(state) {
      state.status = 'error';
      state.token = '';
      state.session_time = '';
      localStorage.removeItem('token');
      localStorage.removeItem('session_time');
    },
    auth_logout(state) {
      state.status = '';
      state.token = '';
      state.session_time = '';
      localStorage.removeItem('token');
      localStorage.removeItem('session_time');
    },
    auth_session_time(state) {
      const timeNow = (new Date()).toISOString();
      state.session_time = timeNow;
      localStorage.setItem('session_time', timeNow);
    },
    set_username(state, name) {
      state.username = name;
    },
    clean_search_text(state) {
      state.search_text = '';
    },
    set_search_text(state, word) {
      state.search_text = word;
    },
    clean_search_result(state) {
      state.search_result = [];
    },
    set_search_result(state, result) {
      Vue.set(state, 'search_result', [...result]);
    },
  },
  actions: {
    login({ commit }, data) {
      // console.log(data);
      commit('auth_request');
      return Vue.axios.post('/api/v1/login', data).then((response) => {
        const { token } = response.data;
        commit('auth_success', token);
        Vue.axios.defaults.headers.common.Authorization = `Bearer ${token}`;
      }).catch((err) => {
        commit('auth_error');
        Promise.reject(err);
      });
    },
    refreshToken({ commit }, data) {
      return Vue.axios.get('/api/v1/auth/refresh_token', data).then((response) => {
        commit('auth_session_time');
        Promise.resolve(response);
      }).catch((err) => {
        Promise.reject(err);
      });
    },
    logout({ commit }) {
      return new Promise((resolve, reject) => {
        commit('auth_logout');
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        delete Vue.axios.defaults.headers.common.Authorization;
        resolve();
      });
    },
    setUsername({ commit }) {
      // console.log(data);
      return Vue.axios.get('/api/v1/auth/hello').then((response) => {
        commit('set_username', response.data.userName);
        localStorage.setItem('username', response.data.userName);
      });
    },
    setSearchText({ commit }, word) {
      return new Promise((resolve, reject) => {
        commit('set_search_text', word);
        resolve();
      });
    },
    cleanSearchText({ commit }) {
      return new Promise((resolve, reject) => {
        commit('clean_search_text');
        resolve();
      });
    },
    setSearchResult({ commit }, searchText) {
      // console.log('search', searchText);
      return Vue.axios.get(`/api/v1/noteapp/notes/${searchText}/search`).then((response) => {
        const results = response.data.data;
        commit('set_search_result', results);
      });
    },
    cleanSearchResult({ commit }) {
      return new Promise((resolve, reject) => {
        commit('clean_search_result');
        resolve();
      });
    },
  },
});
