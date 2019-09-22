<template>
  <q-page class="flex flex-center">
    <img alt="Quasar logo" src="../assets/logo.png">
  </q-page>
</template>

<style>
</style>

<script>
export default {
  name: 'PageHome',
  mounted() {
    this.$emit('stopAjaxBar');
  },
};
</script>
