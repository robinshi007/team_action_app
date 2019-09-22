<template>
  <q-page padding v-show="isDataLoaded">
    <q-toolbar class="q-px-none">
      <q-toolbar-title>
        Note
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
    <div>
      <div class='text-h4 q-py-sm'>{{note.title}}</div>
      <q-badge v-show="note.category" color='green' class='q-px-sm q-py-xs'
        :label="note.category && note.category.name" />
      <div class='text-body1 q-pt-md'>{{note.body}}</div>
    </div>
    <q-dialog v-model="confirm_dialog" persistent>
      <q-card class="q-px-sm">
        <q-card-section>
          <div class="text-h6">Delete</div>
        </q-card-section>

        <q-card-section class="row items-center">
          <q-icon name="warning" color="warning" text-color="white" size="md"/>
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
    this.$emit('startAjaxBar');
    Vue.axios.get(`/api/v1/noteapp/notes/${id}`).then((response) => {
      const { data } = response.data;
      this.note.id = data.id;
      this.note.title = data.title;
      this.note.body = data.body;
      this.note.category_id = data.category && data.category.id;
      this.note.category = data.category;

      this.isDataLoaded = true;
      this.$emit('stopAjaxBar');
    }).catch((err) => {
      this.$router.push({ name: 'error_internal_server' });
      this.$emit('stopAjaxBar');
    });
  },
  methods: {
    gotoNoteEdit() {
      return this.$router.push({ name: 'note.note_edit', params: { id: this.note.id } });
    },
    deleteNote() {
      this.$store.dispatch('deleteNote', { id: this.$route.params.id })
        .then(() => this.$router.push({ name: 'note.home' }));
      this.$q.notify({ message: 'Note has deleted successfully.' });
    },
  },
};
</script>

<style>
</style>
