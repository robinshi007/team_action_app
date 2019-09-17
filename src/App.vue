<template>
  <div id="app">
    <router-view v-on:startAjaxBar="onStartAjaxBar" v-on:stopAjaxBar="onStopAjaxBar" />
    <q-ajax-bar ref="bar" color="amber" size="2px" :delay="delay"/>
  </div>
</template>

<script>
// ajax bar ref https://medium.com/@onur.kose/using-quasar-ajax-bar-within-every-component-b24165209313
// https://github.com/quasarframework/quasar/issues/1381

// import { mapGetters } from 'vuex';

export default {
  name: 'App',
  data() {
    return {
      delay: 0,
    };
  },
  methods: {
    onStartAjaxBar() {
      // console.log('ajax bar started');
      this.$refs.bar.start();
    },
    onStopAjaxBar() {
      // console.log('ajax bar stopped');
      this.$refs.bar.stop();
    },
  },
};
</script>
<style>
#app > .q-loading-bar {
  transition: transform 0.10s cubic-bezier(.42, 0, 0.58, 1), opacity 0.10s;
}
</style>
