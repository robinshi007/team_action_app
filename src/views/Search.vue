<template>
  <q-page v-show="isDataLoaded" padding>
    <q-toolbar class="q-px-none">
      <q-toolbar-title>
        Search Result
      </q-toolbar-title>
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
        <tr v-for="note in searchResult" :key="note.id" clickable>
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
import { mapGetters } from 'vuex';
import { parseISO, formatDistanceToNow } from 'date-fns';

export default {
  name: 'PageSearchResult',
  data() {
    return {
      isDataLoaded: false,
    };
  },
  computed: {
    ...mapGetters([
      'searchText',
      'searchResult',
      'username',
    ]),
  },
  mounted() {
    this.isDataLoaded = true;
    this.$emit('stopAjaxBar');
  },
  methods: {
    dateAgo(dateStr) {
      return formatDistanceToNow(parseISO(dateStr), {
        includeSeconds: true,
      });
    },
  },
};
</script>
