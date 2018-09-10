// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vant from 'vant';
import 'vant/lib/vant-css/index.css';
import api from '@/server'
import store from './store'
import iView from 'iview';
import 'iview/dist/styles/iview.css';
import VueLazyload from 'vue-lazyload'
Vue.use(api);
Vue.use(Vant);
Vue.use(iView);
Vue.use(VueLazyload, {
  loading: require('./assets/lazy.gif')
})
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  store
})
