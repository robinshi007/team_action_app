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

        <div>Quasar v{{ $q.version }}</div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
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
        <q-item to="/product" exact>
          <q-item-section avatar>
            <q-icon name="dns" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Product</q-item-label>
          </q-item-section>
        </q-item>
        <q-item to="/note" exact>
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
export default {
  name: 'LayoutDefault',

  data() {
    return {
      leftDrawerOpen: this.$q.platform.is.desktop,
    };
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
</style>
