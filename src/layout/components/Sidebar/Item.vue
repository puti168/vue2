<script>
export default {
	name: 'MenuItem',
	functional: true,
	props: {
		icon: {
			type: String,
			default: ''
		},
		title: {
			type: String,
			default: ''
		},
		path: {
			type: String,
			default: ''
		},
		activePath: {
			type: String,
			default: ''
		}
	},
	render(h, context) {
		const { icon, title } = context.props
		const vnodes = []
		if (icon) {
			vnodes.push(
				<svg-icon
					icon-class={icon}
					style='width: 0px;height: 25px;margin-right: 0px;display: none;'
				/>
			)
		} else {
			// icon-class="empty"解决控制台警告的抛出
			vnodes.push(
				<svg-icon
					icon-class=''
					style='width: 0px;height: 25px;margin-right: 0px;display: none;'
				/>
			)
		}

		if (title) {
			vnodes.push(<span slot='title'>{title}</span>)
		}
		return vnodes
	}
}
</script>
