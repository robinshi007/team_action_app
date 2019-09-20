<template>
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
</template>

<script>
import { parseISO, formatDistanceToNow } from 'date-fns';

export default {
  props: {
    notes: Array,
    username: String,
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
