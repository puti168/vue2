<script>
export default {
	name: 'Copy',
	functional: true,
	props: {
		copy: [Function],
		title: {
			type: String,
			default: ''
		}
	},
	// eslint-disable-next-line vue/require-render-return
	render(h, context) {
		const { title, copy } = context.props
		if (title) {
			return (
				<p style='cursor: pointer' onClick={() => copy(title)}>
					{title}
					<i class='el-icon-document-copy' />
				</p>
			)
		}
	}
}
</script>
