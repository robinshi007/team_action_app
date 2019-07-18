<template>
  <q-page padding>
    <p>This is an about page</p>
    <transition
      enter-active-class="animated fadeIn"
      leave-active-class="animated fadeOut"
      mode="out-in"
      :duration="300"
    >
      <q-card v-show="isRequestDone">
        <q-card-section>
            <div>
              <div class='text-h6'>User Agent Test:</div>
              <div>{{userAgent}}</div>
            </div>
        </q-card-section>
        <q-inner-loading :showing="isLoading">
          <q-spinner size="30px" color="primaery" />
        </q-inner-loading>
      </q-card>
    </transition>
  </q-page>
</template>

<script>
import axios from 'axios';

export default {
  name: 'PageAbout',
  data() {
    return {
      isLoading: false,
      isRequestDone: false,
      userAgent: '',
    };
  },
  mounted() {
    this.isLoading = true;
    axios.get('https://httpbin.org/user-agent')
      .then((response) => {
        this.userAgent = response.data['user-agent'];
        this.isLoading = false;
        this.isRequestDone = !this.isLoading;
      })
      .catch(error => {
        console.log(error);
        this.isLoading = false;
        this.isRequestDone = !this.isLoading;
      });
  },
  methods: {
  }
};
</script>
