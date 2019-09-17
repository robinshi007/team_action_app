<template>
  <q-page padding>

    <div class='text-h4'>{{note.title}}</div>
    <div class='text-body1'>{{note.body}}</div>
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
