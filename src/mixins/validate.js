import * as T from '@/utils/test'
import * as P from '@/utils/pattern'

export default {
	methods: {
		// 验证账号 - 3-12位 字母或数字
		validateAcount(rule, value, callback) {
			const err = new Error(this.$t('message.validNumberEn312'))
			if (!value || value === '') {
				callback(err)
			} else if (!T.testXPName(value)) {
				callback(err)
			} else if (!T.testSpecial(value)) {
				callback(err)
			} else {
				callback()
			}
		},
		// 验证账号 - 3-12位 字母或数字
		validateXPAcount(rule, value, callback) {
			const err = new Error(this.$t('message.validNumberEn312'))
			if (!value || value === '') {
				callback(err)
			} else if (!T.testXPName(value)) {
				callback(err)
			} else if (!T.testSpecial(value)) {
				callback(err)
			} else {
				callback()
			}
		},
		// 验证用户名 - 10字符以内,不支持空格和特殊符号
		validateNickName(rule, value, callback) {
			const replaceValue = value ? value.replace(P.CN_PATTERN, 'xx') : value
			const err = new Error(this.$t('placeholder.nickName'))
			if (!replaceValue || replaceValue === '') {
				callback(err)
			} else if (/(^\s+)|(\s+$)|\s+/g.test(replaceValue)) {
				callback(err)
			} else if (!T.testStringLength(replaceValue, { min: 1, max: 10 })) {
				callback(err)
			} else if (!T.testSpecial(replaceValue)) {
				callback(err)
			} else {
				callback()
			}
		},
		// 验证简单密码 - 6-12位数字
		validateSimplePassword(rule, value, callback) {
			const err = new Error(this.$t('placeholder.simplePass'))
			if (!value || value === '') {
				callback(err)
			} else if (!T.testSimplePassword(value)) {
				callback(err)
			} else {
				this.$refs.form.validateField('checkPassword')
				callback()
			}
		},
		// 验证简单再次输入密码 - 6-12位数字
		validateSimpleCheckPassword(rule, value, callback) {
			const err = new Error(this.$t('placeholder.simplePass'))
			if (!value || value === '') {
				callback(err)
			} else if (!T.testSimplePassword(value)) {
				callback(err)
			} else if (value !== this.form.password) {
				callback(new Error(this.$t('placeholder.Passwordsnotmatch')))
			} else {
				callback()
			}
		},
		// 验证字母数字密码(账号创建,密码管理) - 3-10位,数字或字母
		validatePass(rule, value, callback) {
			const err = new Error(this.$t('message.validNumberEn310'))
			if (!value || value === '') {
				callback(err)
			} else if (!T.testPassword310(value)) {
				callback(err)
			} else if (!T.testSpecial(value)) {
				callback(err)
			} else {
				if (this.form.rePwd !== '') {
					this.$refs.form.validateField('rePwd')
				}
				callback()
			}
		},
		// 再次验证字母数字密码(账号创建,密码管理) - 3-10位,数字或字母
		validateRePass(rule, value, callback) {
			const err = new Error(this.$t('message.validNumberEn310'))
			if (!value || value === '') {
				callback(err)
			} else if (!T.testPassword310(value)) {
				callback(err)
			} else if (!T.testSpecial(value)) {
				callback(err)
			} else if (value !== this.form.pwd) {
				callback(new Error(this.$t('placeholder.Passwordsnotmatch')))
			} else {
				callback()
			}
		},
		// 验证原密码(密码管理) - 3-10位,数字或字母
		validateOriPwd(rule, value, callback) {
			const err = new Error(this.$t('message.validNumberEn310'))
			if (!value || value === '') {
				callback(err)
			} else if (!T.testPassword310(value)) {
				callback(err)
			} else if (!T.testSpecial(value)) {
				callback(err)
			} else {
				callback()
			}
		},
		// 请填写大于或等于0的整数
		isNaturalNum(rule, value, callback) {
			const err = new Error(this.$t('placeholder.integergreaterthanzero'))
			if (
				!Number.isInteger(+value) ||
				/\s|\./.test(value) ||
				value === '' ||
				+value < 0
			) {
				callback(err)
			} else {
				callback()
			}
		},
		// 验证输入的长度是否大于3
		isRightNum(rule, value, callback) {
			const err = new Error(this.$t('dealer_component_editmanagedealer_189'))
			if (value.length >= 3) {
				callback()
			} else {
				callback(err)
			}
		},
		// 荷官图片上传验证
		fileValidator(rule, value, callback) {
			const err = new Error(this.$t('dealer_component_editmanagedealer_188'))
			if (this.previewUrl || this.file) {
				callback()
			} else {
				callback(err)
			}
		},
		fileValidator2(rule, value, callback) {
			const err = new Error(this.$t('dealer_component_editdealer_148'))
			if (this.previewUrl2 || this.entertainFile) {
				callback()
			} else {
				callback(err)
			}
		},
		notSupportSpecial(rule, value, callback) {
			const isSpecial = !this.notSpecial(String(value))
			const err = new Error(
				this.$t('placeholder.notSupportSpaceAndSpecialCharacters')
			)
			if (isSpecial) {
				callback(err)
			} else {
				callback()
			}
		},
		notSpecial(str) {
			var specialKey =
				"[`+-~!#$^&*()=|{}':;',\\[\\].<>/?~！#￥……&*（）——|{}【】‘；：”“'。，、？]‘'　@ "
			for (var i = 0; i < str.length; i++) {
				if (specialKey.indexOf(str.substr(i, 1)) !== -1) {
					return false
				}
			}
			return true
		},
		isRightName(rule, value, callback) {
			const err = new Error(
				this.$t('placeholder.notSupportSpaceAndSpecialCharacters')
			)
			if (/^[0-9a-zA-Z]+$/.test(value) && !/\s/.test(value)) {
				callback()
			} else {
				callback(err)
			}
		},
		hasEnoughLength(rule, value, callback) {
			const err = new Error(this.$t('pleaseFillSix'))
			if (String(value).length < 6) {
				callback(err)
			} else {
				callback()
			}
		},
		isNaturalNum2(rule, value, callback) {
			const err = new Error(this.$t('cards_component_usedynamic_109'))
			if (
				!Number.isInteger(+value) ||
				/\s|\./.test(value) ||
				value === '' ||
				+value < 0
			) {
				callback(err)
			} else {
				callback()
			}
		},
		isInt(rule, value, callback) {
			const err = new Error(this.$t('placeholder.fileInInteger'))
			if (value === '') {
				callback()
			} else {
				if (!Number.isInteger(+value) || /\s/.test(value)) {
					callback(err)
				} else {
					callback()
				}
			}
		},
		isNullString(rule, value, callback) {
			const err = new Error(this.$t('placeholder.Inputtextisempty'))
			if (value === '' || value === ' ') {
				callback(err)
			} else {
				callback()
			}
		},
		validUsername(str) {
			const valid_map = str || ['admin', 'editor']
			return valid_map.indexOf(str.trim()) >= 0
		},
		hasSpace(rule, value, callback) {
			const err = new Error(
				this.$t('placeholder.notSupportSpaceAndSpecialCharacters')
			)
			console.log('err :', err)
			if (/\s/.test(value)) {
				callback(err)
			} else {
				callback()
			}
		}
	}
}
