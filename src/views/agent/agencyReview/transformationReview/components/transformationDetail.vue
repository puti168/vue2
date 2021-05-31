<template>
	<div class="review-content">
		<div class="head">
			<span class="title">会员转代审核详情</span>
			<div v-if="type" class="right-btn">
				<el-button plain @click="goBack">取消</el-button>
				<el-button type="success" @click="confirm(true)">一审通过</el-button>
				<el-button type="danger" @click="confirm(false)">一审拒绝</el-button>
			</div>
			<div v-else class="right-btn">
				<el-button plain @click="goBack">返回</el-button>
			</div>
		</div>
		<div class="main-content">
			<div class="review-content">
				<p class="name">转代会员信息</p>
				<div class="review-flex">
					<div>会员账号: {{ list.userName }}</div>
					<div>账号类型: {{ typeFilter(list.accountType, 'accountType') }}</div>
					<div>注册时间: {{ list.registerDt }}</div>
					<div>风控层级: {{ list.windControlName }}</div>
				</div>
				<div class="review-flex">
					<div>当前上级代理: {{ list.parentProxyName }}</div>
					<div>代理类型: {{ typeFilter(list.proxyType, 'accountType') }}</div>
					<div>绑定时间: {{ list.bindingDt }}</div>
				</div>
			</div>
			<div class="review-content">
				<p class="name">转入代理信息</p>
				<div class="review-flex">
					<div>代理账号: {{ list.transferProxyName }}</div>
					<div>代理类型: {{ typeFilter(list.transferProxyType, 'accountType') }}</div>
					<div>注册时间: {{ list.transferProxyRegisterDt }}</div>
					<div>风控层级: {{ list.transferWindControlName }}</div>
				</div>
			</div>
			<div class="review-content" style="height: 200px">
				<p class="name">申请信息</p>
				<div class="review-flex">
					<el-table
						border
						size="mini"
						:data="[1]"
						style="width: 100%"
						:header-cell-style="getRowClass"
					>
						<el-table-column align="center" label="修改前上级代理">
							<template>
								{{ list.currentProxyName }}
							</template>
						</el-table-column>
						<el-table-column align="center" label="修改后上级代理">
							<template>
								{{ list.transferProxyName }}
							</template>
						</el-table-column>
					</el-table>
				</div>
				<div class="review-flex">
					<div>申请人: {{ list.applyName }}</div>
					<div>申请时间: {{ list.applyTime }}</div>
					<div>申请信息: {{ list.applyInfo }}</div>
				</div>
			</div>
			<div class="review-content">
				<p class="name">审核信息</p>
				<div class="review-flex">
					<div>一审人: {{ list.auditName }}</div>
					<div>一审时间: {{ list.auditTime }}</div>
					<div>一审备注: {{ list.auditRemark }}</div>
				</div>
			</div>
		</div>
		<el-dialog
			title="提交确认"
			center
			:visible.sync="visible"
			:before-close="closeFormDialog"
			width="610px"
			class="audit-confirm"
		>
			<el-form ref="form" :model="form" :rules="formRules">
				<el-form-item v-if="action" label="提交审核信息">
					<el-input
						v-model="form.remark"
						clearable
						type="textarea"
						:maxlength="50"
						show-word-limit
						:autosize="{ minRows: 4, maxRows: 4 }"
						style="width: 380px"
						placeholder="请输入"
					></el-input>
				</el-form-item>
				<el-form-item v-else label="提交审核信息" prop="remark">
					<el-input
						v-model="form.remark"
						clearable
						type="textarea"
						:maxlength="50"
						show-word-limit
						:autosize="{ minRows: 4, maxRows: 4 }"
						style="width: 380px"
						placeholder="请输入"
					></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="visible = false">取 消</el-button>
				<el-button type="primary" @click="auditOne">
					提交
				</el-button>
			</div>
		</el-dialog>
	</div>
</template>

<script>
import list from '@/mixins/list'
// import dayjs from 'dayjs'
export default {
	components: {},
	mixins: [list],
	props: {
		// 审核 true 仅返回 false
		type: Boolean,
		rowData: {
			type: Object,
			default: () => {}
		}
	},
	data() {
		return {
			list: {},
			form: {
				remark: ''
			},
			visible: false,
			action: false
		}
	},
	computed: {
		formRules() {
			return {
				remark: [
					{ required: true, message: '审核拒绝备注必填', trigger: 'blur' }
				]
			}
		}
	},
	created() {
		this.getInfo()
	},
	mounted() {},
	methods: {
		closeFormDialog() {
			this.visible = false
		},
		confirm(action) {
			this.remark = ''
			this.action = action
			this.visible = true
		},
		auditOne() {
			if (this.action) {
				const loading = this.$loading({
					lock: true,
					text: 'Loading',
					spinner: 'el-icon-loading',
					background: 'rgba(0, 0, 0, 0.7)'
				})
				const params = {
					id: this.rowData.id,
					auditRemark: this.form.remark,
					auditStatus: this.action ? 2 : 3
				}

				this.$api
					.memberTransferAudit(params)
					.then((res) => {
						loading.close()
						if (res.code === 200) {
							this.$message({
								type: 'success',
								message: '操作成功!'
							})
							this.visible = false
							this.goBack()
						} else {
							this.$message({
								message: res.msg,
								type: 'error'
							})
						}
					})
					.catch(() => {
						loading.close()
					})
			} else {
				this.$refs.form.validate((valid) => {
					if (valid) {
						const loading = this.$loading({
							lock: true,
							text: 'Loading',
							spinner: 'el-icon-loading',
							background: 'rgba(0, 0, 0, 0.7)'
						})
						const params = {
							id: this.rowData.id,
							auditRemark: this.form.remark,
							auditStatus: this.action ? 2 : 3
						}

						this.$api
							.memberTransferAudit(params)
							.then((res) => {
								loading.close()
								if (res.code === 200) {
									this.$message({
										type: 'success',
										message: '操作成功!'
									})
									this.visible = false
									this.goBack()
								} else {
									this.$message({
										message: res.msg,
										type: 'error'
									})
								}
							})
							.catch(() => {
								loading.close()
							})
					}
				})
			}
		},
		goBack() {
			this.$emit('goBack')
		},
		getInfo() {
			const params = {
				id: this.rowData.id
			}
			this.$api.memberTransferDetail(params).then((res) => {
				if (res.code === 200) {
					const response = res.data
					this.loading = false
					this.list = response
				} else {
					this.loading = false
					this.$message({
						message: res.msg,
						type: 'error'
					})
				}
			})
		}
	}
}
</script>

<style lang="scss" scoped>
/deep/.el-dialog__header {
	text-align: center;
	color: #909399;
	font-weight: 700;
}
.review-content {
	width: 100%;
	.head {
		height: 70px;
		line-height: 70px;
		width: 100%;
		background: #000;
		border-radius: 2px;
		padding: 0 30px;
		.title {
			font-weight: 600;
			color: rgb(192, 190, 190);
		}
		.right-btn {
			float: right;
		}
	}
	.main-content {
		.review-content {
			min-height: 150px;
			border: 1px solid rgba(192, 190, 190, 0.5);
			border-top: 0px;
			padding: 30px;
			.name {
				font-weight: 600;
			}
			.review-flex {
				position: relative;
				width: 100%;
				margin-top: 15px;
				div {
					display: inline-block;
					width: 24%;
				}
			}
		}
		.more-height {
			height: 200px;
		}
	}
}
</style>
