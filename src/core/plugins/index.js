import Vue from 'vue'

import PermissionHelper from './auth'
import ResonsePlugin from './response'


Vue.use(ResonsePlugin)
Vue.use(PermissionHelper)