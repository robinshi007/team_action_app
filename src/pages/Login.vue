<template>
  <q-page padding>
    <div class="q-pa-md" style="max-width:450px;margin-left:auto;margin-right:auto;">

    <q-toolbar class="q-px-none">
      <q-toolbar-title>
        Login
      </q-toolbar-title>
      <q-space />
    </q-toolbar>
      <q-form
        @submit="onLogin"
        class="q-gutter-md"
        >
        <q-input
          outlined
          v-model="username"
          label="User name"
          hint="User name"
          lazy-rules
          :rules="[ val => val && val.length > 0 || 'Please type user name']"
          />

        <q-input
          outlined
          type="password"
          v-model="password"
          label="Password"
          lazy-rules
          :rules="[ val => val && val.length > 0 || 'Please type password']"
          />

          <div>
            <q-btn label="Login" type="submit" color="primary"/>
          </div>
      </q-form>
    </div>
  </q-page>
</template>

<script>
export default {
  name: 'PageLogin',
  data() {
    return {
      username: '',
      password: '',
    };
  },
  mounted() {
    this.$emit('stopAjaxBar');
  },
  methods: {
    onLogin() {
      const { username } = this;
      const { password } = this;
      this.$store.dispatch('login', { username, password }).then(() => {
        this.$store.dispatch('setUsername').then(() => {
        });
        const { query } = this.$route;
        if (query && query.redirect) {
          this.$router.replace(query.redirect);
          this.$q.notify({ message: 'Login successfully.' });
        } else {
          this.$router.push({ name: 'note.home' });
          this.$q.notify({ message: 'Login successfully.' });
        }
      }).catch((err) => {
        console.log(err);
      });
    },
  },
};
</script>

<style>
</style>
