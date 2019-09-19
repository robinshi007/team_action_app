<template>
  <div id="app">
    <router-view v-on:startAjaxBar="onStartAjaxBar" v-on:stopAjaxBar="onStopAjaxBar" />
    <q-ajax-bar ref="bar" color="amber" size="2px" :delay="delay" :animate="false" />
  </div>
</template>

<script>
// ajax bar ref https://medium.com/@onur.kose/using-quasar-ajax-bar-within-every-component-b24165209313
// https://github.com/quasarframework/quasar/issues/1381

export default {
  name: 'App',
  data() {
    return {
      delay: 0,
    };
  },
  created() {
    this.axios.interceptors.response.use(resp => resp, err => new Promise((resolve, reject) => {
      console.log('err', err);
      if (err.response.status === 401) {
        this.$q.notify({ message: 'Login failed. Invalid username or password.' });
        this.$store.dispatch('logout').then(() => this.$router.replace({ name: 'login' }));
      }
      if (err.response && err.response.data) {
        return Promise.reject(err.response.data);
      }
      return Promise.reject(err);
    }));
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
  transition-duration: 0s;
}
</style>
