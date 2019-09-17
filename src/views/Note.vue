<template>
  <q-page padding>
    <q-toolbar>
      <q-space />
      <q-btn flat round dense icon="add"/>
    </q-toolbar>
    <transition
      enter-active-class="animated fadeIn"
      leave-active-class="animated fadeOut"
      mode="out-in"
      :duration="300"
      >
      <q-list v-show="isRequestDone" bordered separator>
      <q-item v-for="note in notes" :key="note.id" clickable v-ripple>
        <q-item-section>
          {{note.title}}
        </q-item-section>
        <q-item-section side>
          <q-badge color='green' :label="note.category.name" />
        </q-item-section>
      </q-item>
      </q-list>
    </transition>
  </q-page>
</template>

<script>

export default {
  name: 'PageAbout',
  data() {
    return {
      isLoading: false,
      isRequestDone: false,
      notes: [],
    };
  },
  mounted() {
    this.isLoading = true;
    this.axios.get('/api/v1/noteapp/notes')
      .then((response) => {
        this.notes = response.data.data;
        this.isLoading = false;
        this.isRequestDone = !this.isLoading;
      })
      .catch((error) => {
        console.log(error);
        this.isLoading = false;
        this.isRequestDone = !this.isLoading;
      });
  },
  methods: {
  },
};
</script>
