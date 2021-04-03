import Vue from 'vue'

// base library
import {
  message,
  Input,
  Spin,
  Button,
  Icon,
  FormModel,
  Table,
} from 'ant-design-vue'

import ResonsePlugin from './plugins/response'
import './css/index.less'

Vue.use(Input)
Vue.use(Button)
Vue.use(Icon)
Vue.use(Spin)
Vue.use(FormModel)
Vue.use(Table)

Vue.use(ResonsePlugin)

Vue.prototype.$message = message

process.env.NODE_ENV !== 'production' && console.warn('[antd-pro] NOTICE: Antd use lazy-load.')
