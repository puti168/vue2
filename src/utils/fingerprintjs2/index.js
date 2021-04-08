import fingerprintjs2 from 'fingerprintjs2'
const fingerName = 'finger'
export default {
	load() {
		fingerprintjs2.get(function(components) {
			const values = components.map(function(component) {
				return component.value
			})
			const murmur = fingerprintjs2.x64hash128(values.join(''), 31)
			localStorage.setItem(fingerName, murmur)
		})
	},
	get() {
		return localStorage.getItem(fingerName)
	}
}
