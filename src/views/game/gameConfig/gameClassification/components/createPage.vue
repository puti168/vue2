<template>
	<div>页面创建</div>
</template>

<script>
import list from '@/mixins/list'
import { setEidteBank } from '@/api/bankController'
export default {
    name: 'CreatePage',
	components: {},
	mixins: [list],
	props: { editFormData: { type: Object, default: () => ({}) } },
	data() {
		return {
			editData: {},
			formTime: {
				time: []
			}
		}
	},
	computed: {},
	watch: {
		editFormData(val) {
			this.editData = { ...val }
		}
	},
	created() {},
	mounted() {},
	methods: {
		enterSubmit() {
			console.log(222222222)
			setEidteBank().then((res) => {
				console.log(res)
			})
		}
	}
}
</script>

<style lang="scss" scoped></style>
