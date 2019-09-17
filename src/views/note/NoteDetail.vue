<template>
  <q-page padding>

    <div class='text-h4 q-py-sm'>{{note.title}}</div>
    <q-badge color='green' :label="note.category.name" />
    <div class='text-body1 q-pt-md'>{{note.body}}</div>
  </q-page>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'PageNoteDetail',
  computed: {
    ...mapState([
      'note',
    ]),
  },
  mounted() {
    const data = this.$route.params.id;
    this.$store.dispatch('getNote', data);
    this.$emit('stopAjaxBar');
  },
};
</script>

<style>
</style>
