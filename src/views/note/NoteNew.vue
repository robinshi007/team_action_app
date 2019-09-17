<template>
  <q-page padding>
    <div class="q-pa-md" style="max-width: 600px">
      <q-form
        @submit="onSubmit"
        @reset="onReset"
        class="q-gutter-md"
        ref="noteForm"
        >
        <q-input
          filled
          v-model="title"
          label="title"
          hint="title"
          lazy-rules
          :rules="[ val => val && val.length > 0 || 'Please type something']"
          />
        <q-input
          filled
          v-model="body"
          type="textarea"
          label="body content"
          lazy-rules
          :rules="[ val => val && val.length > 0 || 'Please type something']"
          />

          <q-select filled v-model="category_id" :options="selectOptions" label="Product"
            emit-value map-options />
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
  },
  methods: {
    onSubmit() {
      this.$refs.noteForm.validate().then((success) => {
        if (success) {
          const data = {
            title: this.title,
            body: this.body,
            category_id: this.category_id,
          };
          this.$store.dispatch('addNote', data).then(() => {
            this.$router.push('/note');
          });
        }
      });
    },
    onReset() {
      console.log('reset');
    },
  },

};
</script>

<style>
</style>
