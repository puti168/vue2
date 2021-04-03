// with polyfills
import 'core-js/stable'
import 'regenerator-runtime/runtime'

import Vue from 'vue'
import App from './index.vue'
import router from './router'
import './router/hook'
import store from './store'
import i18n from '@/locales'

// mock
// WARNING: `mockjs` NOT SUPPORT `IE` PLEASE DO NOT USE IN `production` ENV.
import '@/mock'

import 'default-passive-events'
import bootstrap from '@/core/bootstrap'
import '@/core/lazy_use' // use lazy load components
import './common/request-interceptor'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  i18n,
  // init localstorage, vuex
  created: bootstrap,
  render: h => h(App)
}).$mount('#app')
