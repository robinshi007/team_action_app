<template>
  <q-layout view="lHh Lpr lFf">
    <!--<q-header elevated class="glossy">-->
    <q-header elevated class="">
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          @click="leftDrawerOpen = !leftDrawerOpen"
          aria-label="Menu"
          icon="menu"
        />

        <q-toolbar-title>
          Team Action
        </q-toolbar-title>

        <q-btn flat stretch>v{{ $q.version }}</q-btn>
        <q-btn flat stretch v-if="!isLoggedIn">
          <a @click.prevent="gotoLogin">
            Login
          </a>
        </q-btn>
        <q-btn-dropdown align='align' label='About' flat stretch auto-close v-if="isLoggedIn">
          <q-list dense padding>
            <q-item clickable>
              <q-item-section>
                <a @click.prevent="logout">
                  Logout
                </a>
              </q-item-section>
              </q-item>
          </q-list>
        </q-btn-dropdown>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      :width="240"
      bordered
      content-class="bg-grey-2"
    >
      <q-list>
        <q-item-label header>Navigation</q-item-label>
        <q-item to="/" exact>
          <q-item-section avatar>
            <q-icon name="home" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Home</q-item-label>
          </q-item-section>
        </q-item>

        <q-item-label header>App</q-item-label>
        <q-item to="/product">
          <q-item-section avatar>
            <q-icon name="dns" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Product</q-item-label>
          </q-item-section>
        </q-item>
        <q-item to="/note">
          <q-item-section avatar>
            <q-icon name="description" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Note</q-item-label>
          </q-item-section>
        </q-item>

      </q-list>
    </q-drawer>

    <q-page-container>
      <transition
      enter-active-class="animated fadeIn"
      leave-active-class="animated fadeOut"
      mode="out-in"
      :duration="150"
      @leave="resetScroll"
      >
        <router-view v-on:startAjaxBar="onStartAjaxBar" v-on:stopAjaxBar="onStopAjaxBar" />
      </transition>
    </q-page-container>
  </q-layout>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'LayoutDefault',

  data() {
    return {
      leftDrawerOpen: this.$q.platform.is.desktop,
    };
  },
  computed: {
    ...mapGetters([
      'isLoggedIn',
    ]),
  },
  mounted() {
    const self = this;
    this.$router.beforeEach((to, from, next) => {
      self.$emit('startAjaxBar');
      next();
    });
    this.$emit('stopAjaxBar');
  },
  methods: {
    onStartAjaxBar() {
      this.$emit('startAjaxBar');
    },
    onStopAjaxBar() {
      this.$emit('stopAjaxBar');
    },
    resetScroll(el, done) {
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
      done();
    },
    gotoLogin() {
      return this.$router.push('/login');
    },
    logout() {
      this.$store.dispatch('logout').then(() => {
        this.$q.notify({ message: 'Logout successfully.' });
        // reload the page
        window.location.reload(true);
      });
    },
  },
};
</script>

<style>
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: .15; }
}
.fadeIn {
  animation-name: fadeIn;
}
@keyframes fadeOut {
  from { opacity: .15; }
  to { opacity: 0; }
}
.fadeOut {
  animation-name: fadeOut;
}
.q-page {
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
}
</style>
