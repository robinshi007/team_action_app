<template>
  <q-page padding>
    <div class="q-pa-md" style="max-width:450px;margin-left:auto;margin-right:auto;">

    <q-toolbar class="q-px-none">
      <q-toolbar-title>
        Change Password
      </q-toolbar-title>
      <q-space />
    </q-toolbar>
      <q-form
        @submit="onChangePassword"
        class="q-gutter-md"
        >
        <q-input
          outlined
          type="password"
          v-model="password"
          label="New password"
          lazy-rules
          :rules="[ val => val && val.length > 0 || 'Please input password']"
          />

        <q-input
          outlined
          type="password"
          v-model="password2"
          label="New password again"
          lazy-rules
          :rules="[
          val => val && val.length > 0 || 'Please input password again',
          val => val === password || 'The passwords are not match, please input again.'
          ]"
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
  name: 'PageChangePassword',
  data() {
    return {
      password: '',
      password2: '',
    };
  },
  mounted() {
    this.$emit('stopAjaxBar');
  },
  methods: {
    onChangePassword() {
      const { password } = this;
      this.$store.dispatch('changePassword', { password }).then((response) => {
        if (response) {
          this.$router.push({ name: 'note.home' });
          this.$q.notify({ message: 'Change password successfully.' });
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
