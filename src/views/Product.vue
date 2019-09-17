<template>
  <q-page padding>
    <q-toolbar>
      <q-space />
      <q-btn flat round dense icon="add"/>
    </q-toolbar>
    <transition
      enter-active-class="animated fadeIn"
      leave-active-class="animated fadeOut"
      mode="out-in"
      :duration="300"
      >
      <q-list v-show="isRequestDone"  bordered separator>
      <q-item v-for="cate in categories" :key="cate.id" clickable v-ripple>
        <q-item-section>
          {{cate.name}}
        </q-item-section>
      </q-item>
      </q-list>
    </transition>
  </q-page>
</template>

<script>

export default {
  name: 'PageProduct',
  data() {
    return {
      isRequestDone: false,
    };
  },
  computed: {
    categories() {
      return this.$store.state.categories;
    },
  },
  mounted() {
    this.$store.dispatch('getCategories');
  },
  methods: {
  },
};
</script>
