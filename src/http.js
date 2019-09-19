import Vue from 'vue';
import Axios from 'axios';

Vue.axios = Axios;

Object.defineProperties(Vue.prototype, {
  axios: {
    get() {
      return Axios;
    },
  },
  $http: {
    get() {
      return Axios;
    },
  },
});
