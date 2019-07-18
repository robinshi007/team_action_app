<template>
  <div id="app">
    <router-view />
    <q-ajax-bar ref="bar" color="amber" size="2px" :delay="0"/>
  </div>
</template>

<script>
// ajax bar ref https://medium.com/@onur.kose/using-quasar-ajax-bar-within-every-component-b24165209313
// https://github.com/quasarframework/quasar/issues/1381

import { mapGetters } from 'vuex';

export default {
  name: 'App',
  computed: {
    ...mapGetters({
      isLoadingRoute: 'getIsLoadingRoute',
    }),
  },
  watch: {
    isLoadingRoute(status, oldStatus) {
      console.log(`status: updating from ${oldStatus} to ${status}`);
      if (status) {
        this.$refs.bar.start();
      } else {
        this.$refs.bar.stop();
      }
    },
  },
};
</script>

<style>
.fade-enter-active, .fade-leave-active {
  transition: opacity .9s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>
