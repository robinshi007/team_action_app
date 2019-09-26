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
    <NoteListView :columns="columns" :notes="notes" :username="username" />
  </q-page>
</template>

<script>
import { mapState } from 'vuex';
import { parseISO, formatDistanceToNow } from 'date-fns';

import NoteListView from './view/NoteListView.vue';
import columns from './view/columns';

export default {
  name: 'PageNote',
  components: {
    NoteListView,
  },
  data() {
    return {
      columns,
      isDataLoaded: false,
    };
  },
  computed: {
    ...mapState({
      notes: state => state.noteStore.notes,
      username: state => state.username,
    }),
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
    dateAgo(dateStr) {
      return formatDistanceToNow(parseISO(dateStr), {
        includeSeconds: true,
      });
    },
  },
};
</script>
