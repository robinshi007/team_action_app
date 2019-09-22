<template>
  <q-page v-show="isDataLoaded" padding>
    <q-toolbar class="q-px-none">
      <q-toolbar-title>
        Note List
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

import NoteListView from './view/NoteListView.vue';

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
    ]),
  },
  beforeCreate() {
    // this.$store.dispatch('cleanNotes');
  },
  mounted() {
    this.$emit('startAjaxBar');
    this.$store.dispatch('getNotes').then(() => {
      this.isDataLoaded = true;
      this.$emit('stopAjaxBar');
    });
  },
  methods: {
    gotoNoteNew() {
      return this.$router.push({ name: 'note.note_new' });
    },
  },
};
</script>
