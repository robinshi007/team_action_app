<template>
  <q-layout view="hHh Lpr fFf">
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
        <q-input dark dense standout v-model="searchText" input-class="text-right"
           class="q-mr-md site_search"
           @keyup.enter="onSearch">
          <template v-slot:append>
            <q-icon v-if="searchText === ''" name="search" />
              <q-icon v-else name="close" class="cursor-pointer" @click="searchText=''" />
          </template>
        </q-input>
        <q-btn flat stretch @click="aboutDialogOpen = true">About</q-btn>
        <q-btn flat stretch v-if="!isLoggedIn">
          <a @click.prevent="gotoLogin">
            Login
          </a>
        </q-btn>
        <q-btn-dropdown align='align' :label='username' flat stretch auto-close v-if="isLoggedIn">
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
        <q-item to="/noteapp">
          <q-item-section avatar>
            <q-icon name="description" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Note</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-drawer
      v-model="rightDrawerOpen"
      side="right"
      :width="240"
      >
      <router-view name="sidebar" />
    </q-drawer>

    <q-page-container>
      <transition
        enter-active-class="animated fadeIn"
        leave-active-class="animated fadeOut"
        mode="out-in"
        :duration="150"
        @leave="resetScroll"
        >
        <router-view v-on:startAjaxBar="onStartAjaxBar" v-on:stopAjaxBar="onStopAjaxBar"
                     :key="$route.fullPath"/>
      </transition>
    </q-page-container>

    <q-dialog v-model="aboutDialogOpen">
      <q-card style="width: 600px;">
        <q-card-section>
          <div class="text-h6">About Team Action</div>
        </q-card-section>

        <q-separator />

          <q-card-section style="max-height: 50vh;" class="scroll">
            <p class='text-h6'>FrontEnd:</p>
            <p>Vue v2.6.10</p>
            <p>Vue Router v3.0.3</p>
            <p>Vuex v3.0.1</p>
            <p>Quasar v{{ $q.version }}</p>
            <p class='text-h6'>BackEnd:</p>
            <p>Golang v1.13</p>
            <p>Gin v1.4.0</p>
            <p>Gorm v1.9.10</p>
          </q-card-section>

          <q-separator />

            <q-card-actions align="right">
              <q-btn flat label="Close" color="primary" v-close-popup />
            </q-card-actions>
      </q-card>
    </q-dialog>
  </q-layout>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'LayoutDefault',
  data() {
    return {
      leftDrawerOpen: this.$q.platform.is.desktop,
      rightDrawerOpen: true,
      aboutDialogOpen: false,
    };
  },
  computed: {
    ...mapGetters([
      'isLoggedIn',
      'username',
    ]),
    searchText: {
      get() { return this.$store.state.search_text; },
      set(val) { this.updateSearchText(val); },
    },
  },
  mounted() {
    // const self = this;
    // this.$router.beforeEach((to, from, next) => {
    //  self.$emit('startAjaxBar');
    //  next();
    // });
    // this.$emit('stopAjaxBar');
    this.$store.dispatch('getProducts');
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
      return this.$router.push({ name: 'login' });
    },
    logout() {
      this.$store.dispatch('logout').then(() => {
        this.$q.notify({ message: 'Logout successfully.' });
        // reload the page
        // window.location.reload(true);
        this.$router.push({ name: 'login' });
      });
    },
    onSearch() {
      if (this.searchText) {
        this.$store.dispatch('setSearchResult', this.searchText).then(() => {
          this.$router.push({ name: 'search_result' });
        });
      } else {
        this.$q.notify({ message: 'Search text is empty, please check.' });
      }
    },
    updateSearchText(val) {
      this.$store.dispatch('setSearchText', val);
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
  max-width: 560px;
  margin-left: auto;
  margin-right: auto;
}
.site_search {
  transition: all .2s ease-in-out;
}
.site_search:focus {
  background-color: #1976d2;
}
.sidebar--right .q-item.q-router-link--active {
  background-color: #e3f2ff;
}
.sidebar--right .q-item {
  border-radius: 16px 0 0 16px;
  margin-top: 1px;
  margin-bottom: 1px
}
</style>
