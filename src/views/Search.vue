<template>
  <q-page v-show="isDataLoaded" padding>
    <q-toolbar class="q-px-none">
      <q-toolbar-title>
        Search Result
      </q-toolbar-title>
    </q-toolbar>
    <q-list bordered separator>
      <q-item v-for="note in searchResult" :key="note.id" clickable v-ripple>
        <q-item-section>
          <router-link :to='{ name: "note_detail", params: { id: note.id }}'>{{note.title}}
          </router-link>
        </q-item-section>
        <q-item-section side>
          <q-badge v-show="note.category" color='green'
            :label="note.category && note.category.name" />
        </q-item-section>
      </q-item>
    </q-list>
  </q-page>
</template>

<script>
import { mapGetters } from 'vuex';

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
    ]),
  },
  mounted() {
    this.isDataLoaded = true;
    this.$emit('stopAjaxBar');
  },
  methods: {
  },
};
</script>
