import Vue from 'vue'
import { formatNumber } from '@/utils/util'
import { toName } from '@/utils/constant'
import moment from 'moment'
import 'moment/locale/zh-cn'

Vue.filter('formatNumber', formatNumber)

Vue.filter('moment', function (dataStr, pattern = 'YYYY-MM-DD HH:mm:ss') {
    if(!dataStr){
      return ''
    }
    return moment(dataStr).format(pattern)
})

Vue.filter('toName', toName)
