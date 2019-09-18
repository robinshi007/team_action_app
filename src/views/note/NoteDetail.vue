<template>
  <q-page padding>
    <q-toolbar class="q-px-none">
      <q-toolbar-title>
        Note Detail
      </q-toolbar-title>
      <q-space />
      <q-btn flat round dense icon="edit" @click="gotoNoteEdit">
        <q-tooltip>
          Edit
        </q-tooltip>
      </q-btn>
        <q-btn flat round dense icon="delete" @click="confirm_dialog = true" v-if="isLoggedIn">
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
    <q-dialog v-model="confirm_dialog" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <q-avatar icon="warning" color="warning" text-color="white" />
            <span class="q-ml-sm">Do you really want to delete Note "{{note.title}}"?</span>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Cancel" color="primary" v-close-popup />
            <q-btn flat label="Confirm" color="negative" @click="deleteNote" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import Vue from 'vue';
import { mapGetters } from 'vuex';

export default {
  name: 'PageNoteDetail',
  data() {
    return {
      note: {
        id: '',
        title: '',
        body: '',
        category_id: '',
        category: {},
      },
      isDataLoaded: false,
      confirm_dialog: false,
    };
  },
  computed: {
    ...mapGetters([
      'isLoggedIn',
    ]),
  },
  mounted() {
    const { id } = this.$route.params;
    Vue.axios.get(`/api/v1/noteapp/notes/${id}`).then((response) => {
      const { data } = response.data;
      this.note.id = data.id;
      this.note.title = data.title;
      this.note.body = data.body;
      this.note.category_id = data.category.id;
      this.note.category = data.category;
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
