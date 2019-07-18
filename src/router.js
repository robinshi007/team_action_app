import Vue from 'vue';
import Router from 'vue-router';

import store from './store';

import DefaultLayout from './layouts/Default.vue';
import Home from './views/Home.vue';
import About from './views/About.vue';
import NotFound from './views/NotFound.vue';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: DefaultLayout,
      children: [
        {
          path: '',
          name: 'home',
          component: Home,
        },
        {
          path: '/about',
          name: 'about',
          component: About,
        },
        {
          path: '/*',
          name: 'not_found',
          component: NotFound,
        },
      ],
    },
  ],
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
