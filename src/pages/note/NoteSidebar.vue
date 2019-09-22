<template>
  <q-list class='sidebar--right'>
    <q-item-label header dense>Categories</q-item-label>
    <q-item v-for="cate in categories" :key="cate.id" dense
            :to="{name: 'note.product_detail', params: { id: cate.id}}"
            >
            <q-item-section>
              <q-item-label>{{ cate.name }}</q-item-label>
            </q-item-section>
    </q-item>
  </q-list>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'LayoutSidebar',
  computed: {
    ...mapGetters([
      'categories',
    ]),
  },
  mounted() {
    this.$store.dispatch('getProducts');
  },

};
</script>
