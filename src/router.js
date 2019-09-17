import Vue from 'vue';
import Router from 'vue-router';

import store from './store';
import routes from './routes';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  routes,
});

router.beforeEach((to, from, next) => {
  // console.log(to, from);
  store.commit('setLoadingRoute', true);
  next();
});

router.afterEach((to, from) => {
  // console.log(to, from);
  store.commit('setLoadingRoute', false);
});

export default router;
