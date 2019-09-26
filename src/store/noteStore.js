import Vue from 'vue';

export default {
  state: {
    categories: [],
    notes: [],
    current_category: '',
  },
  getters: {
    categories: state => state.categories,
    currentCategory: state => state.current_category,
  },
  mutations: {
    set_categories(state, categories) {
      Vue.set(state, 'categories', [...categories]);
    },
    set_current_category(state, category) {
      state.current_category = category;
    },
    add_category(state, category) {
      state.categories.push(category);
    },
    remove_category(state, index) {
      state.categories.splice(index, 1);
    },
    set_notes(state, notes) {
      Vue.set(state, 'notes', [...notes]);
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
    getProducts({ commit }) {
      return Vue.axios.get('/api/v1/noteapp/categories').then(response => response.data).then((json) => {
        // console.log(response.data.data);
        commit('set_categories', json.data);
      });
    },
    createProduct(store, data) {
      return Vue.axios.post('/api/v1/noteapp/categories', data).then((response) => {
      });
    },
    updateProduct(store, data) {
      // console.log(data);
      return Vue.axios.put(`/api/v1/noteapp/categories/${data.id}`, data.data).then((response) => {
      });
    },
    getProductNotes(store, data) {
      return Vue.axios.get(`/api/v1/noteapp/categories/${data.id}`).then((response) => {
        const product = response.data.data.name;
        const notes = response.data.data.notes || [];
        store.commit('set_notes', notes);
        store.commit('set_current_category', product);
      });
    },
    getNotes(store) {
      return Vue.axios.get('/api/v1/noteapp/notes').then((response) => {
        store.commit('set_notes', response.data.data);
      });
    },
    createNote(store, data) {
      return Vue.axios.post('/api/v1/noteapp/notes', data).then((response) => {
      });
    },
    getNote(store, data) {
      return Vue.axios.get(`/api/v1/noteapp/notes/${data}`).then((response) => {
        store.commit('get_note', response.data.data);
      });
    },
    cleanNotes(store) {
      store.commit('clean_notes');
    },
    updateNote(store, data) {
      // console.log(data);
      return Vue.axios.put(`/api/v1/noteapp/notes/${data.id}`, data.data).then((response) => {
      });
    },
    deleteNote(store, data) {
      // console.log(data);
      return Vue.axios.delete(`/api/v1/noteapp/notes/${data.id}`).then((response) => {
      });
    },
    deleteProduct(store, data) {
      // console.log(data);
      return Vue.axios.delete(`/api/v1/noteapp/categories/${data.id}`).then((response) => {
      });
    },

  },
};
