<template>
  <q-page v-show="isDataLoaded" padding>
    <q-toolbar class="q-px-none">
      <q-toolbar-title>
        List Notes
      </q-toolbar-title>
      <q-space />
      <q-btn flat round dense icon="add" @click="gotoNoteNew">
        <q-tooltip>
          Add Note
        </q-tooltip>
      </q-btn>
    </q-toolbar>
    <q-markup-table flat bordered>
      <thead>
        <tr>
          <th class="text-left">Name</th>
          <th class="text-right">Product</th>
          <th class="text-right">Update At</th>
          <th class="text-right">Update By</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="note in notes" :key="note.id" clickable>
          <td class="text-left">
            <router-link :to='{ name: "note_detail", params: { id: note.id }}'>{{note.title}}
            </router-link>
          </td>
          <td class="text-right">
            <q-badge v-show="note.category" color='green'
                     :label="note.category && note.category.name" />
          </td>
            <td class="text-right">{{ dateAgo(note.updated_at) }}</td>
            <td class="text-right">{{ username }}</td>
        </tr>
      </tbody>
    </q-markup-table>
  </q-page>
</template>

<script>
import { mapState } from 'vuex';
import { parseISO, formatDistanceToNow } from 'date-fns';

export default {
  name: 'PageNote',
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
    this.$store.dispatch('getNotes');
    this.isDataLoaded = true;
    this.$emit('stopAjaxBar');
  },
  methods: {
    gotoNoteNew() {
      return this.$router.push('/note_new');
    },
    dateAgo(dateStr) {
      return formatDistanceToNow(parseISO(dateStr), {
        includeSeconds: true,
      });
    },
  },
};
</script>
