<template>
  <q-page padding>
    <div class="q-pa-md">
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

          <q-select outlined v-model="category_id" :options="selectOptions" label="Category"
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
import Vue from 'vue';
import { mapState } from 'vuex';

export default {
  name: 'PageNoteNew',
  data() {
    return {
      nid: '',
      title: '',
      body: '',
      category_id: '',
    };
  },
  computed: {
    ...mapState({
      categories: state => state.noteStore.categories,
    }),
    selectOptions() {
      return this.categories.map(opt => ({ label: opt.name, value: opt.id }));
    },
  },
  mounted() {
    // this.$store.dispatch('getCategorys');
    this.$emit('startAjaxBar');
    Vue.axios.get('/api/v1/noteapp/categories/未分类/by_name').then((response) => {
      const { data } = response.data;
      this.category_id = data.id;
      this.$emit('stopAjaxBar');
    }).catch((err) => {
      this.$router.push({ name: 'error_internal_server' });
      this.$emit('stopAjaxBar');
    });
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
          this.$store.dispatch('createNote', data).then((d) => {
            if (d.data !== undefined) {
              this.nid = d.data.data;
              this.$q.notify({ message: 'Note has created successfully.' });
              console.log(this.nid);
              this.$router.push({ name: 'note.note_detail', id: this.nid });
            } else {
              this.$q.notify({
                color: 'purple',
                textColor: 'white',
                message: 'Note has created failed.',
              });
              this.$router.push({ name: 'note.note_list' });
            }
          }).catch(err => console.log(err));
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
