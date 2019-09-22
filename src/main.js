import Vue from 'vue';

import './http';
import './registerServiceWorker';
import './quasar';
import router from './router';
import store from './store';

import App from './App.vue';

Vue.config.productionTip = false;

// router interceptors for redirect to login
router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  const { isLoggedIn } = store.getters;
  if (requiresAuth && (!isLoggedIn)) {
    next({ name: 'login', query: { redirect: to.path || '/' } });
  } else if (requiresAuth) {
    // check token set time
    let sessionAt;
    const timeNow = new Date();
    const { sessionTime } = store.getters;
    // time limit is 15 minute
    const timeLimit = 1000 * 60 * 15;
    try {
      sessionAt = Date.parse(sessionTime);
    } catch (e) {
      // improper session_time value
      next({ name: 'login', query: { redirect: to.path || '/' } });
    }
    if (timeNow - sessionAt > timeLimit) {
      // session_time expired
      store.dispatch('refreshToken').then(() => {
        next();
      }).catch(() => next({ name: 'login', query: { redirect: to.path || '/' } }));
    } else {
      next();
    }
  } else {
    next();
  }
});

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
