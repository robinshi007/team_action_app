<template>
  <q-page padding>
    <q-toolbar>
      <q-space />
        <q-btn flat round dense icon="edit" @click="gotoNoteEdit">
          <q-tooltip>
            Edit
          </q-tooltip>
        </q-btn>
        <q-btn flat round dense icon="delete" @click="deleteNote">
          <q-tooltip>
            Delete
          </q-tooltip>
        </q-btn>
    </q-toolbar>
    <div v-show="isDataLoaded">
      <div class='text-h4 q-py-sm'>{{note.title}}</div>
      <q-badge color='green' :label="note.category ? note.category.name : '' " />
      <div class='text-body1 q-pt-md'>{{note.body}}</div>
    </div>
  </q-page>
</template>

<script>
import Vue from 'vue';

export default {
  name: 'PageNoteDetail',
  data() {
    return {
      note: {
        id: '',
        title: '',
        body: '',
        category_id: '',
      },
      isDataLoaded: false,
    };
  },
  computed: {
  },
  mounted() {
    const { id } = this.$route.params;
    Vue.axios.get(`/api/v1/noteapp/notes/${id}`).then((response) => {
      const { data } = response.data;
      this.note.id = data.id;
      this.note.title = data.title;
      this.note.body = data.body;
      this.note.category_id = data.category.id;
      this.isDataLoaded = true;
    });
    this.$emit('stopAjaxBar');
  },
  methods: {
    gotoNoteEdit() {
      return this.$router.push({ name: 'note_edit', params: { id: this.note.id } });
    },
    deleteNote() {
      this.$store.dispatch('deleteNote', { id: this.$route.params.id }).then(() => (this.$router.push({ name: 'note' })));
      this.$q.notify({ message: 'Note has deleted successfully.' });
    },
  },
};
</script>

<style>
</style>
