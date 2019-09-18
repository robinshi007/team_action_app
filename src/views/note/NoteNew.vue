<template>
  <q-page padding>
    <div v-show="isDataLoaded" class="q-pa-md">
      <q-toolbar class="q-px-none">
        <q-toolbar-title>
          New Note
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
        ref="noteForm"
        >
        <q-input
          outlined
          v-model="title"
          label="title"
          hint="title"
          lazy-rules
          :rules="[ val => val && val.length > 0 || 'Please type something']"
          />
        <q-input
          outlined
          v-model="body"
          type="textarea"
          label="body content"
          lazy-rules
          :rules="[ val => val && val.length > 0 || 'Please type something']"
          />

          <q-select outlined v-model="category_id" :options="selectOptions" label="Product"
            emit-value map-options
            :rules="[ val => val && val.length > 0 || 'Please select something']"
            />
          <div>
            <q-btn label="Submit" type="submit" color="primary" />
            <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" />
          </div>
      </q-form>

  </div>
  </q-page>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'PageNoteNew',
  data() {
    return {
      title: '',
      body: '',
      category_id: '',
      isDataLoaded: false,
    };
  },
  computed: {
    ...mapState([
      'categories',
    ]),
    selectOptions() {
      return this.categories.map(opt => ({ label: opt.name, value: opt.id }));
    },
  },
  mounted() {
    this.$store.dispatch('getCategories');
    this.$emit('stopAjaxBar');
    this.isDataLoaded = true;
  },
  methods: {
    gotoBack() {
      this.$router.go(-1);
    },
    onSubmit() {
      this.$refs.noteForm.validate().then((success) => {
        if (success) {
          const data = {
            title: this.title,
            body: this.body,
            category_id: this.category_id,
          };
          this.$store.dispatch('addNote', data).then(() => {
            this.$q.notify({ message: 'Note has created successfully.' });
            this.$router.push('/note');
          });
        }
      });
    },
    onReset() {
      this.title = '';
      this.body = '';
      this.category_id = '';
    },
  },

};
</script>

<style>
</style>
