import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    status: '',
    token: localStorage.getItem('token') || '',
    username: localStorage.getItem('username') || '',
    categories: [],
    notes: [],
    search_text: '',
    search_result: [],
  },
  getters: {
    isLoggedIn: state => state.token !== '',
    authStatus: state => state.status,
    username: state => state.username,
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
    },
    auth_error(state) {
      state.status = 'error';
      state.token = '';
    },
    auth_logout(state) {
      state.status = '';
      state.token = '';
    },
    get_categories(state, categories) {
      state.categories = categories;
    },
    add_category(state, category) {
      state.categories.push(category);
    },
    remove_category(state, index) {
      state.categories.splice(index, 1);
    },
    get_notes(state, notes) {
      state.notes = notes;
    },
    add_note(state, note) {
      state.notes.push(note);
    },
    remove_note(state, index) {
      state.notes.splice(index, 1);
    },
    clean_notes(state) {
      state.notes = [];
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
      state.search_result = result;
    },
  },
  actions: {
    getCategories({ commit }) {
      Vue.axios.get('/api/v1/noteapp/categories').then(response => response.data).then((json) => {
        // console.log(response.data.data);
        commit('get_categories', json.data);
      });
    },
    getNotes(store) {
      Vue.axios.get('/api/v1/noteapp/notes').then((response) => {
        store.commit('get_notes', response.data.data);
      });
    },
    addNote(store, data) {
      Vue.axios.post('/api/v1/noteapp/notes', data).then((response) => {
      });
    },
    getNote(store, data) {
      Vue.axios.get(`/api/v1/noteapp/notes/${data}`).then((response) => {
        store.commit('get_note', response.data.data);
      });
    },
    cleanNotes(store) {
      store.commit('clean_notes');
    },
    editNote(store, data) {
      // console.log(data);
      Vue.axios.put(`/api/v1/noteapp/notes/${data.id}`, data.data).then((response) => {
      });
    },
    deleteNote(store, data) {
      // console.log(data);
      Vue.axios.delete(`/api/v1/noteapp/notes/${data.id}`).then((response) => {
      });
    },
    login(store, data) {
      // console.log(data);
      store.commit('auth_request');
      return Vue.axios.post('/api/v1/login', data).then((response) => {
        const { token } = response.data;
        localStorage.setItem('token', token);
        Vue.axios.defaults.headers.common.Authorization = `Bearer ${token}`;
        store.commit('auth_success', token);
      }).catch((err) => {
        store.commit('auth_error');
        localStorage.removeItem('token');
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
