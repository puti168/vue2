import Vue from 'vue'

// base library
import {
  message,
  notification,
  Row,
  Col,
  Spin, 
  Input,
  InputNumber,
  Button,
  Icon,
  FormModel,
  Card,
  Modal,
  Divider,
  Space,
  Avatar,
  Popconfirm,
} from 'ant-design-vue'

Vue.use(Row)
Vue.use(Col)
Vue.use(Input)
Vue.use(InputNumber)
Vue.use(Button)
Vue.use(Icon)
Vue.use(Card)
Vue.use(Spin)
Vue.use(FormModel)
Vue.use(Divider)
Vue.use(Space)
Vue.use(Avatar)
Vue.use(Popconfirm)

Vue.prototype.$confirm = Modal.confirm
Vue.prototype.$message = message
Vue.prototype.$notification = notification
Vue.prototype.$info = Modal.info
Vue.prototype.$success = Modal.success
Vue.prototype.$error = Modal.error
Vue.prototype.$warning = Modal.warning

process.env.NODE_ENV !== 'production' && console.warn('[antd-pro] NOTICE: Antd use lazy-load.')
