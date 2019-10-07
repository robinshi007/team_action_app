<template>
  <q-page padding>
    <div class="q-pa-md">
      <q-toolbar class="q-px-none">
        <q-toolbar-title>
          New Category
        </q-toolbar-title>
        <q-space />
        <q-btn flat round dense icon="arrow_back" @click="gotoBack">
          <q-tooltip>
            Go back
          </q-tooltip>
        </q-btn>
      </q-toolbar>
      <q-form
        @submit="onSubmit"
        @reset="onReset"
        class="q-gutter-md"
        ref="categoryForm"
        >
        <q-input
          outlined
          v-model="name"
          label="name"
          hint="name"
          lazy-rules
          :rules="[ val => val && val.length > 0 || 'Please type something']"
        />
        <div>
          <q-btn label="Submit" type="submit" color="primary" />
            <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" />
        </div>
      </q-form>
    </div>
  </q-page> </template>

<script>
export default {
  name: 'PageCategoryNew',
  data() {
    return {
      name: '',
    };
  },
  mounted() {
  },
  methods: {
    gotoBack() {
      this.$router.go(-1);
    },
    onSubmit() {
      this.$refs.categoryForm.validate().then((success) => {
        if (success) {
          const data = {
            name: this.name,
          };
          this.$store.dispatch('createCategory', data).then(() => {
            this.$store.dispatch('getCategorys').then(() => {
              this.$q.notify({ message: 'Category has created successfully.' });
              this.$router.push({ name: 'note.category_list' });
            });
          }).catch(err => console.log(err));
        }
      });
    },
    onReset() {
      this.name = '';
    },
  },
};
</script>

<style>
</style>
