<template>
  <q-page padding>
    <q-toolbar>
      <q-space />
      <q-btn flat round dense icon="add"/>
    </q-toolbar>
    <q-list bordered separator>
      <q-item v-for="cate in categories" :key="cate.id" clickable v-ripple>
        <q-item-section>
          {{cate.name}}
        </q-item-section>
      </q-item>
    </q-list>
  </q-page>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'PageProduct',
  mounted() {
    this.$store.dispatch('getCategories');
    this.$emit('stopAjaxBar');
  },
  computed: {
    ...mapState([
      'categories',
    ]),
  },
  methods: {
  },
};
</script>
