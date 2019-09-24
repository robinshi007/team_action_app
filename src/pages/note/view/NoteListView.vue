<template>
  <div>
    <q-table flat :data="notes" :columns="columns" row-key="name"
            :rows-per-page-options="[5, 10]">
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td key="name" :props="props">
            <router-link :to='{ name: "note.note_detail", params: { id: props.row.id }}'>
              {{props.row.title}}
            </router-link>
          </q-td>
          <q-td key="category" :props="props">
            <q-badge color="green">
              {{ props.row.category && props.row.category.name }}
            </q-badge>
          </q-td>
          <q-td key="updated_at" :props="props">
            {{ dateAgo(props.row.updated_at) }}
          </q-td>
        </q-tr>
      </template>
    </q-table>
    <!--<q-markup-table flat bordered>
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
    </q-markup-table> -->
  </div>
</template>

<script>
import { parseISO, formatDistanceToNow } from 'date-fns';

export default {
  props: {
    columns: Array,
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
