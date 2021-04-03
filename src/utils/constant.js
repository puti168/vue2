/**
 * 支持的游戏、游戏图表颜色
 */
export const GAME_ARRAY = ['ty', 'zr', 'qp', 'dj', 'cp', 'dy', 'lhj']

/**
 * 获取游戏名称
 * @param {*} code 
 */
export function getGameName(code) {
  return toName(code, 'gameType');
}

/**
 * 字典表
 */
export const DICTS_MAP = {
  //游戏类型
  gameType: {
    ty: "体育",
    cp: '彩票',
    dj: '电竞',
    qp: '棋牌',
    dy: '捕鱼',
    zr: '真人',
    lhj: '老虎机',
  },
  //回款状态
  payStatus: { 0: '未结清', 1: '已结清' },
  //账户类型
  isTester: { 0: '正式用户', 1: '测试用户' },
  //费率模式
  chargeType: { 1: '固定模式', 2: '阶梯模式' },
  //费率计算方式
  calcMethod: { 1: '固定计算', 2: '阶梯计算' },
  //商户类型
  merType:{1:'代理商',2:'包网',3:'平台'},
  //开关状态
  switchStatus:{1:'开启',0:'关闭'},
  //游戏盘面
  groupMode: { 1: "标准盘", 2: "双面盘", 3: "特色游戏" },
  //注单标记
  betFlag: { 0: "正常结算", 1: "跳局", 2: "取消局", 4: "已重算" },
  //设备类型
  deviceType: { 1: "pc", 2: "h5", 3: "ios", 4: "android", 5: "others" },
  //电竞注单状态
  betStatusList: { 0: '未结算', 2: '已取消', 3: '已中奖', 4: '未中奖', 14: '投注失败', 15: '撤销' },
  //投注模式
  betModel: { 1: '1元', 0.1: '1角', 0.01: '1分', 0.001: '1厘', 2: '2元', 0.2: '2角', 0.02: '2分', 0.002: '2厘' },
  //注单状态
  betStatus: { 0: "待开奖", 1: "已结算", 2: "取消", 3: "已中奖", 4: "未中奖", 13: "待确定", 14: "投注失败", 15: "撤销", 24: "挂起" },
  // 体育注单状态
  betResult: { 0: "无结果", 2: "走水", 3: "输", 4: "赢", 5: "赢一半", 6: "输一半", 7: "赛事取消", 8: "赛事延期", 11: "比赛延迟", 12: "比赛中断", 13: "未知", 15: "比赛放弃", 16: "异常盘口" },
  //转账类型
  transferType: {1:'转入OB钱包', 2:'转出OB钱包'},

}

/**
 * 字典值
 * @param {字典编码} val 
 * @param {字典名称} name 
 */
export function toName(val, name) {
  return DICTS_MAP[name] && DICTS_MAP[name][val] || ''
}