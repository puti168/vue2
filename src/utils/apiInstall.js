import apis from '@/api'
const install = (Vue) => {
	if (install.installed) return
	install.installed = true

	Object.defineProperties(Vue.prototype, {
		// 注意哦，此处挂载在 Vue 原型的 $api 对象上
		$api: {
			get() {
				return apis
			}
		},
		$$: {
			get() {
				const optionalChaining = (obj, ...rest) => {
					let tmp = obj
					for (const key in rest) {
						const name = rest[key]
						tmp = tmp?.[name]
					}
				}
				return optionalChaining || ''
			}
		}
	})
}

export default install
