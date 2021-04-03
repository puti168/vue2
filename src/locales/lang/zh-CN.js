import antd from 'ant-design-vue/es/locale-provider/zh_CN'
import momentCN from 'moment/locale/zh-cn'

const components = {
  antLocale: antd,
  momentName: 'zh-cn',
  momentLocale: momentCN
}

const locale = {
  'message': '-',
  'layouts.usermenu.dialog.title': '登出',
  'layouts.usermenu.dialog.content': '确定登出吗？',
  'menu.home': '主页',
  'menu.dashboard.analysis': '分析页',
  'menu.dashboard.monitor': '监控页',
  'menu.dashboard.workplace': '工作台',
  'menu.report.game': '游戏报表',
  'menu.report.game.overview': '总览',
  'menu.report.game.ty': '体育',
  'menu.report.game.zr': '真人',
  'menu.report.game.qp': '棋牌',
  'menu.report.game.dj': '电竞',
  'menu.report.game.cp': '彩票',
  'menu.report.game.dy': '电游',
}

export default {
  ...components,
  ...locale
}
