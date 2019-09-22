<template>
  <q-page v-show="isDataLoaded" padding>
    <q-toolbar class="q-px-none">
      <q-toolbar-title>
        Product
        <q-badge color='green' class='q-px-sm q-py-xs' :label="current_category" />
      </q-toolbar-title>
      <q-space />
      <q-btn flat round dense icon="delete" @click="confirm_dialog = true" v-if="isAdmin()">
        <q-tooltip>
          Delete
        </q-tooltip>
      </q-btn>
    </q-toolbar>
    <NoteListView :notes="notes" :username="username" />
    <q-dialog v-model="confirm_dialog" persistent>
      <q-card class="q-px-sm">
        <q-card-section>
          <div class="text-h6">Delete</div>
        </q-card-section>

        <q-card-section class="row items-center">
          <q-icon name="warning" color="warning" text-color="white" size="md"/>
            <span class="q-ml-sm">Do you really want to delete Product "{{current_category.name}}"?</span>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Cancel" color="primary" v-close-popup />
            <q-btn flat label="Confirm" color="negative" @click="deleteProduct" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import { mapState } from 'vuex';

import NoteListView from './view/NoteListView.vue';

export default {
  name: 'PageNote',
  components: {
    NoteListView,
  },
  data() {
    return {
      isDataLoaded: false,
      confirm_dialog: false,
    };
  },
  computed: {
    ...mapState([
      'notes',
      'username',
      'current_category',
    ]),
  },
  mounted() {
    this.$emit('startAjaxBar');
    this.fetchData().then(() => {
      this.isDataLoaded = true;
      this.$emit('stopAjaxBar');
    }).catch((err) => {
      console.log(err);
      this.$router.push({ name: 'error_internal_server' });
      this.$emit('stopAjaxBar');
    });
  },
  methods: {
    isAdmin() {
      return (this.notes.length === 0) && (this.username === 'admin');
    },
    fetchData() {
      const { id } = this.$route.params;
      // return this.$store.dispatch('getProductNotes', { id })
      // .then(() => this.$store.dispatch('getProducts'));
      return this.$store.dispatch('getProductNotes', { id });
    },
    deleteProduct() {
      this.$store.dispatch('deleteProduct', { id: this.$route.params.id })
        .then(() => this.$store.dispatch('getProducts'))
        .then(() => this.$q.notify({ message: 'Product has deleted successfully.' }))
        .then(() => this.$router.push({ name: 'note.home' }));
    },
  },
};
</script>
