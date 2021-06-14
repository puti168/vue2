<template>
	<div class="set-ranges">
		<el-dialog
			:key="newOne"
			class="edit-drawer"
			:title="$t('title.setRanges')"
			:visible.sync="elDrawer"
			:close-on-click-modal="false"
			@close="handleClose"
		>
			<div class="auth">
				<div class="up">
					<div class="left">{{ $t('label.platformAuthorization') }}</div>
					<div class="right">
						<el-checkbox-group v-model="platformIds">
							<el-checkbox
								v-for="platform in platformList"
								:key="platform.id"
								:label="platform.id"
							>{{ platform.itemName }}</el-checkbox>
						</el-checkbox-group>
					</div>
				</div>
				<div class="down">
					<div class="left">{{ $t('label.applicationAuthorization') }}</div>
					<div class="right">
						<el-checkbox-group v-model="applicationIds">
							<el-checkbox
								v-for="application in applicationList"
								:key="application.id"
								:label="application.id"
							>{{ application.itemName }}</el-checkbox>
						</el-checkbox-group>
					</div>
				</div>
			</div>
			<span slot="footer" class="dialog-footer">
				<el-button type="primary" @click.native="handleSure">{{ $t('btn.confirm') }}</el-button>
				<el-button @click.native="handleClose">{{ $t('btn.close') }}</el-button>
			</span>
		</el-dialog>
	</div>
</template>

<script>
export default {
	name: 'SetRanges',
	props: {
		drawer: Boolean,
		id: {
			type: String,
			required: true
		}
	},
	data() {
		return {
			elDrawer: false,
			platformList: [],
			applicationList: [],
			platformIds: [],
			applicationIds: [],
			newOne: new Date().valueOf()
		}
	},
	watch: {
		drawer: {
			handler(val) {
				this.elDrawer = val
			},
			deep: true,
			immediate: true
		}
	},
	created() {
		const id = this.id
		this.getUserDict(id)
	},
	methods: {
		getUserDict(id) {
			this.$api
				.getSecurityDictList({ id })
				.then((res) => {
					this.list = res.data
					this.list.forEach((item) => {
						this[`${item.category}List`] = item.items
						item.items.forEach((it) => {
							if (it.selected) {
								this[`${item.category}Ids`].push(it.id)
							}
						})
					})
					console.log('getSecurityDictList', res)
				})
				.catch((err) => {
					console.log(err)
				})
		},
		handleSure() {
			const platformIds = this.platformIds
			const applicationIds = this.applicationIds
			const id = this.id
			const params = { platformIds, applicationIds, id }
			// console.log(params)
			this.$api.setUserSecurityDict(params).then(
				(res) => {
					// console.log(res)
					if (res.code === 200) {
						this.$message({
							message: this.$t('message.setRangesSuccessful'),
							type: 'success'
						})
						this.handleClose()
					}
				},
				(err) => {
					console.log(err)
				}
			)
		},
		/* eslint-disable */
		handleClose() {
			this.$emit('close')
			this.newOne = new Date().valueOf()
		}
	}
}
</script>

<style lang="scss" scoped>
.auth {
	width: 100%;

	.up,
	.down {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.up {
		height: 100px;
		border-bottom: 1px solid #000;
	}

	.down {
		height: 120px;
	}

	.left {
		height: 100%;
		width: 100px;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.right {
		height: 100%;
		flex: 1;
		padding: 10px;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
}

@media (max-width: 800px) {
	.edit-exp-drawer {
		.round {
			padding: 0;
		}
	}
}
/deep/.el-dialog {
	width: 35%;
	min-width: 580px;
	.el-dialog__body,
	.el-dialog__footer {
		display: flex;
		justify-content: center;
		.el-input {
			width: 300px !important;
		}
	}

	.el-dialog__body .down .right .el-checkbox {
		margin-right: 20px;
		margin-bottom: 10px;
		.el-checkbox__label {
			width: 105px;
		}
	}
}
</style>
