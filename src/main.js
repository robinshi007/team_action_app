import Vue from 'vue';

import App from './App.vue';
import router from './router';
import store from './store';
import './api';
import './registerServiceWorker';
import './quasar';

Vue.config.productionTip = false;

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  const { isLoggedIn } = store.getters;
  if (requiresAuth && (!isLoggedIn)) {
    // console.log('to', to);
    // console.log('from', from);
    next({ name: 'login', query: { redirect: to.path || '/' } });
  } else {
    next();
  }
});


new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
