import Vue from 'vue'
import App from './App.vue'

import VuejsDialog from 'vuejs-dialog';
// import VuejsDialogMixin from 'vuejs-dialog/dist/vuejs-dialog-mixin.min.js';

import VueMathjax from 'vue-mathjax'

import BootstrapVue from 'bootstrap-vue'

import './registerServiceWorker'
import router from './router'
import store from './store'
import {rtdbPlugin} from 'vuefire'

import 'vuejs-dialog/dist/vuejs-dialog.min.css';

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(BootstrapVue)
Vue.use(VueMathjax)
Vue.use(VuejsDialog);
Vue.use(rtdbPlugin)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
