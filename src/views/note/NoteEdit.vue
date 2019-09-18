<template>
  <q-page padding>
    <div v-show="isDataLoaded" class="q-pa-md">
    <q-toolbar>
      <q-space />
        <q-btn flat round dense icon="arrow_back" @click="gotoBack">
          <q-tooltip>
            Go back
          </q-tooltip>
        </q-btn>
    </q-toolbar>
      <q-form
        @submit="onSubmit"
        class="q-gutter-md"
        ref="noteForm"
        >
        <q-input
          filled
          v-model="note.title"
          label="title"
          hint="title"
          lazy-rules
          :rules="[ val => val && val.length > 0 || 'Please type something']"
          />
        <q-input
          filled
          v-model="note.body"
          type="textarea"
          label="body content"
          lazy-rules
          :rules="[ val => val && val.length > 0 || 'Please type something']"
          />

          <q-select
            filled
            v-model="note.category_id"
            :options="selectOptions"
            label="Product"
            emit-value map-options
            :rules="[ val => val && val.length > 0 || 'Please select something']"
            />
          <div>
            <q-btn label="Submit" type="submit" color="primary" />
          </div>
      </q-form>

  </div>
  </q-page>
</template>

<script>
import Vue from 'vue';
import { mapState } from 'vuex';

export default {
  name: 'PageNoteNew',
  data() {
    return {
      note: {
        id: '',
        title: '',
        body: '',
        category_id: '',
      },
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
    const { id } = this.$route.params;
    Vue.axios.get(`/api/v1/noteapp/notes/${id}`).then((response) => {
      const { data } = response.data;
      this.note.id = data.id;
      this.note.title = data.title;
      this.note.body = data.body;
      this.note.category_id = data.category.id;
      this.isDataLoaded = true;
    });
    this.$emit('stopAjaxBar');
  },
  methods: {
    gotoBack() {
      this.$router.go(-1);
    },
    onSubmit() {
      this.$refs.noteForm.validate().then((success) => {
        if (success) {
          const data = {
            title: this.note.title,
            body: this.note.body,
            category_id: this.note.category_id,
          };
          this.$store.dispatch('editNote', { id: this.$route.params.id, data }).then(() => {
            this.$q.notify({ message: 'Note has updated successfully.' });
            this.$router.push('/note');
          });
        }
      });
    },
  },

};
</script>

<style>
</style>
