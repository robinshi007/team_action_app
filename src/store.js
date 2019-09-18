import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isLoadingRoute: false,
    categories: [],
    notes: [],
  },
  getters: {
    getIsLoadingRoute: state => state.isLoadingRoute,
  },
  mutations: {
    setLoadingRoute(state, status) {
      state.isLoadingRoute = status;
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
  },
});
