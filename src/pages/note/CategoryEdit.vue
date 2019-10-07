<template>
  <q-page padding>
    <div v-show="isDataLoaded" class="q-pa-md">
      <q-toolbar class="q-px-none">
        <q-toolbar-title>
          Edit Category
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
        class="q-gutter-md"
        ref="categoryForm"
        >
        <q-input
          outlined
          v-model="category.name"
          label="name"
          hint="name"
          lazy-rules
          :rules="[ val => val && val.length > 0 || 'Please type something']"
        />
        <div>
          <q-btn label="Submit" type="submit" color="primary" />
        </div>
      </q-form>
    </div>
  </q-page>
</template>

<script>
export default {
  name: 'PageCategoryEdit',
  data() {
    return {
      category: {
        id: '',
        name: '',
      },
      isDataLoaded: false,
    };
  },
  mounted() {
    const { id } = this.$route.params;
    this.$emit('startAjaxBar');
    this.axios.get(`/api/v1/noteapp/categories/${id}`).then((response) => {
      const { data } = response.data;
      this.category.id = data.id;
      this.category.name = data.name;
    }).then(() => {
      this.isDataLoaded = true;
      this.$emit('stopAjaxBar');
    });
  },
  methods: {
    gotoBack() {
      this.$router.go(-1);
    },
    onSubmit() {
      this.$refs.categoryForm.validate().then((success) => {
        if (success) {
          const data = {
            name: this.category.name,
          };
          this.$store.dispatch('updateCategory', { id: this.category.id, data }).then(() => {
            this.$store.dispatch('getCategorys').then(() => {
              this.$q.notify({ message: 'Category has updated successfully.' });
              this.$router.push({ name: 'note.category_list' });
            });
          }).catch(err => console.log(err));
        }
      });
    },
  },
};
</script>

<style>
</style>
