<template>
  <q-page v-show="isDataLoaded" padding>
    <q-toolbar class="q-px-none">
      <q-toolbar-title>
        Note List
      <q-badge color='green' class='q-pa-xs' :label="current_category" />
      </q-toolbar-title>
      <q-space />
      <q-btn flat round dense icon="add" @click="gotoNoteNew">
        <q-tooltip>
          Add
        </q-tooltip>
      </q-btn>
    </q-toolbar>
    <NoteListView :notes="notes" :username="username" />
  </q-page>
</template>

<script>
import { mapState } from 'vuex';

import NoteListView from './NoteListView.vue';

export default {
  name: 'PageNote',
  components: {
    NoteListView,
  },
  data() {
    return {
      isDataLoaded: false,
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
    this.fetchData().then(() => {
      this.isDataLoaded = true;
      this.$emit('stopAjaxBar');
    });
  },
  methods: {
    gotoNoteNew() {
      return this.$router.push({ name: 'note_new' });
    },
    fetchData() {
      const { id } = this.$route.params;
      return this.$store.dispatch('getProductNotes', { id }).then(() => this.$store.dispatch('getProducts'));
    },
  },
};
</script>
