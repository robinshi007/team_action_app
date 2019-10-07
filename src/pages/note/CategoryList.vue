<template>
  <q-page padding>
      <q-toolbar class="q-px-none">
        <q-toolbar-title>
          Category List
        </q-toolbar-title>
      <q-space />
      <q-btn flat round dense icon="add" @click="gotoCategoryNew">
        <q-tooltip>
          Add Category
        </q-tooltip>
      </q-btn>
    </q-toolbar>
    <q-list separator bordered>
      <q-item v-for="cate in categories" :key="cate.id" clickable v-ripple >
        <q-item-section >
          <router-link :to="{name: 'note.category_detail', params: { id: cate.id}}">
            {{ cate.name }}
          </router-link>
        </q-item-section>
        <q-item-section side>
          <q-btn flat round dense icon="edit" @click="gotoCategoryEdit(cate.id)">
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
  name: 'PageCategory',
  mounted() {
    this.$store.dispatch('getCategorys').then(() => this.$emit('stopAjaxBar'));
  },
  computed: {
    ...mapState({
      categories: store => store.noteStore.categories,
    }),
  },
  methods: {
    gotoCategoryNew() {
      this.$router.push({ name: 'note.category_new' });
    },
    gotoCategoryEdit(id) {
      return this.$router.push({ name: 'note.category_edit', params: { id } });
    },
  },
};
</script>
