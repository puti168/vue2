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
		const { icon, title, activePath, path } = context.props
		const vnodes = []
		const active = activePath.includes(path)

		if (icon) {
			vnodes.push(
				<svg-icon
					icon-class={active ? `${icon}_pre` : icon}
					style='width: 18px;height: 18px;margin-right: 8px;margin-left: 8px'
				/>
			)
		}
		/* eslint-disable */
		if (title) {
			vnodes.push(<span slot="title">{title}</span>)
		}
		/* eslint-disable */
		return vnodes
	}
}
</script>
