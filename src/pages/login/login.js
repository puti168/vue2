// with polyfills
import 'core-js/stable'
import 'regenerator-runtime/runtime'

import Vue from 'vue'
import Login from './index.vue'
import store from '@/store'
import bootstrap from '@/core/bootstrap'
import '@/core/simple_use'
// mock
// WARNING: `mockjs` NOT SUPPORT `IE` PLEASE DO NOT USE IN `production` ENV.

Vue.config.productionTip = false

new Vue({
  store,
  created: bootstrap,
  render: h => h(Login)
}).$mount('#app')
