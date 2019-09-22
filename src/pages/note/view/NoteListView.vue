<template>
    <q-markup-table flat bordered>
      <thead>
        <tr>
          <th class="text-left">Name</th>
          <th class="text-left" show-if="!$route.fullPath.startWith('/noteapp')">Product</th>
          <th class="text-left">Update At</th>
          <th class="text-left">Update By</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="note in notes" :key="note.id" clickable>
          <td class="text-left">
            <router-link :to='{ name: "note.note_detail", params: { id: note.id }}'>{{note.title}}
            </router-link>
          </td>
          <td class="text-left">
            <q-badge v-show="note.category" color='green' class='q-px-sm q-py-xs'
                     :label="note.category && note.category.name" />
          </td>
            <td class="text-left">{{ dateAgo(note.updated_at) }}</td>
            <td class="text-left">{{ username }}</td>
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
