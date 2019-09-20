<template>
  <q-page padding>
      <q-toolbar class="q-px-none">
        <q-toolbar-title>
          Product List
        </q-toolbar-title>
      <q-space />
      <q-btn flat round dense icon="add" @click="gotoProductNew">
        <q-tooltip>
          Add
        </q-tooltip>
      </q-btn>
    </q-toolbar>
    <q-list separator bordered>
      <q-item v-for="cate in categories" :key="cate.id" clickable v-ripple>
        <q-item-section>
          {{cate.name}}
        </q-item-section>
        <q-item-section side>
          <q-btn flat round dense icon="edit" @click="gotoProductEdit(cate.id)">
            <q-tooltip>
             Edit
            </q-tooltip>
          </q-btn>
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
    this.$store.dispatch('getProducts');
    this.$emit('stopAjaxBar');
  },
  computed: {
    ...mapState([
      'categories',
    ]),
  },
  methods: {
    gotoProductNew() {
      this.$router.push({ name: 'product_new' });
    },
    gotoProductEdit(id) {
      console.log(id);
      return this.$router.push({ name: 'product_edit', params: { id } });
    },
  },
};
</script>
