// 空格正则
export const SPACE_PATTERN = /\s/
// 用户名正则，3到12位（数字或字母）
export const USERNAME_3_12 = /^[0-9A-Z-a-z]{3,12}$/
// 用户名正则，6到12位（数字）
export const USERNAME_N_PATTERN = /^[0-9]{6,12}$/
// 用户名正则，4到12位（字母，数字，下划线，减号）
export const USERNAME_PATTERN = /^[a-zA-Z0-9_-]{4,12}$/
// 用户名正则，6到12位（字母，数字）
export const USERNAME_NO_SPECIAL_PATTERN = /^[a-zA-Z0-9]{6,12}$/
// 密码强度正则，最少6位，包括至少1个大写字母，1个小写字母，1个数字，1个特殊字符
export const PASSWORD_PATTERN = /^.*(?=.{6,})(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*? ]).*$/
// 简单密码正则
export const PASSWORD_SIMPLE_PATTERN = /^[a-zA-Z0-9]{6,12}$/
// 超简单密码正则
export const PASSWORD_MORE_SIMPLE_PATTERN = /^[0-9]{6,12}$/
// 3-10 位数字或字母
export const PASSWORD_3_10 = /^[0-9A-Z-a-z]{3,10}$/
// 正整数正则
export const POS_INT_PATTERN = /^\d+$/
// 负整数正则
export const NEG_INT_PATTERN = /^-\d+$/
// 整数正则
export const INT_PATTERN = /^-?\d+$/
// 正数正则
export const POS_PATTERN = /^\d*\.?\d+$/
// 负数正则
export const NEG_PATTERN = /^-\d*\.?\d+$/
// 数字正则
export const NUM_PATTERN = /^-?\d*\.?\d+$/
// Email正则
export const EMAIL_PATTERN = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/
// 手机号正则
export const MOBILE_PATTERN = /^1[345789]\d{9}$/
// 身份证号正则
export const ID_PATTERN = /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/
// URL正则
export const URL_PATTERN = /^((https?|ftp|file):\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/
// IP地址正则
export const IP_PATTERN = /^((?:(?:25[0-5]|2[0-4]\d|(?:1\d{2}|[1-9]?\d))\.){3}(?:25[0-5]|2[0-4]\d|(?:1\d{2}|[1-9]?\d)))$/
// 十六进制颜色正则
export const COLOR_PATTERN = /^#?([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$/
// QQ号码正则
export const QQ_PATTERN = /^[1-9][0-9]{4,10}$/
// 微信号正则
export const WX_PATTERN = /^[a-zA-Z]([-_a-zA-Z0-9]{5,19})+$/
// 包含中文正则
export const CN_PATTERN = /[\u4e00-\u9fa5]/g
// 表情验证正则
export const EMOJI_PATTERN = /(?:[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff]|[\u0023-\u0039]\ufe0f?\u20e3|\u3299|\u3297|\u303d|\u3030|\u24c2|\ud83c[\udd70-\udd71]|\ud83c[\udd7e-\udd7f]|\ud83c\udd8e|\ud83c[\udd91-\udd9a]|\ud83c[\udde6-\uddff]|[\ud83c[\ude01-\ude02]|\ud83c\ude1a|\ud83c\ude2f|[\ud83c[\ude32-\ude3a]|[\ud83c[\ude50-\ude51]|\u203c|\u2049|[\u25aa-\u25ab]|\u25b6|\u25c0|[\u25fb-\u25fe]|\u00a9|\u00ae|\u2122|\u2139|\ud83c\udc04|[\u2600-\u26FF]|\u2b05|\u2b06|\u2b07|\u2b1b|\u2b1c|\u2b50|\u2b55|\u231a|\u231b|\u2328|\u23cf|[\u23e9-\u23f3]|[\u23f8-\u23fa]|\ud83c\udccf|\u2934|\u2935|[\u2190-\u21ff])/g
