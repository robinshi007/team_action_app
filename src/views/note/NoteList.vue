<template>
  <q-page padding>
    <q-toolbar>
      <q-space />
      <q-btn flat round dense icon="add" @click="gotoNoteNew"/>
    </q-toolbar>
    <q-list bordered separator>
      <q-item v-for="note in notes" :key="note.id" clickable v-ripple>
        <q-item-section>
          <router-link :to='{ name: "note_detail", params: { id: note.id }}'>{{note.title}}
          </router-link>
        </q-item-section>
        <q-item-section side>
          <q-badge color='green' :label="note.category.name" />
        </q-item-section>
      </q-item>
    </q-list>
  </q-page>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'PageNote',
  data() {
    return {
    };
  },
  computed: {
    ...mapState([
      'notes',
    ]),
  },
  mounted() {
    this.$store.dispatch('getNotes');
    this.$emit('stopAjaxBar');
  },
  methods: {
    gotoNoteNew() {
      return this.$router.push('/note_new');
    },
  },
};
</script>
