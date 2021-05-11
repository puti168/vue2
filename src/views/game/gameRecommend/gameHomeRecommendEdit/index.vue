<template>
	<div class="game-container report-container">
		<!-- 体育,真人荷官模块，电竞，彩票，棋牌，电子，派奖排行 -->
		<div v-if="false" class="review-content">
			<div class="head">
				<span class="title">体育模块</span>
				<div class="right-btn">
					<el-button plain @click="goBack">取消</el-button>
					<el-button type="success" @click="confirm(true)">保存</el-button>
				</div>
			</div>
			<div class="main-content">
				<div class="review-content">
					<el-form ref="form" :model="form" label-width="auto" :rules="rules">
						<el-row>
							<el-col :span="12">
								<el-form-item label="主标题信息:" prop="gameName">
									<el-input
										v-model="form.gameName"
										size="medium"
										maxlength="20"
										clearable
										style="width: 365px"
									></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="12">
								<el-form-item label="副标题信息:" prop="gameName">
									<el-input
										v-model="form.gameName"
										size="medium"
										maxlength="20"
										clearable
										style="width: 365px"
									></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="12">
								<el-form-item label="滚屏数量限制:" prop="gameName">
									<el-input
										v-model="form.gameName"
										size="medium"
										maxlength="20"
										clearable
										style="width: 365px"
									></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="12">
								<el-form-item label="全部游戏数量:" prop="gameName">
									<el-input
										v-model="form.gameName"
										size="medium"
										maxlength="20"
										clearable
										style="width: 365px"
									></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="12">
								<el-form-item label="模块描述:">
									<el-input
										v-model="form.gameName"
										size="medium"
										maxlength="20"
										clearable
										style="width: 365px"
									></el-input>
								</el-form-item>
							</el-col>
						</el-row>
					</el-form>
					<!-- 棋牌 -->
					<template v-if="true">
						<el-divider></el-divider>
						<div class="img-title">客户端图片上传</div>
						<img
							v-for="item in 40"
							:key="item"
							:src="imageUrl"
							class="avatar"
						/>
					</template>
				</div>
			</div>
		</div>
		<!-- 直播，游戏专题 -->
		<div v-else-if="false" class="review-content">
			<div class="head">
				<span class="title">直播模块</span>
				<div class="right-btn">
					<el-button plain @click="goBack">取消</el-button>
					<el-button type="success" @click="confirm(true)">保存</el-button>
				</div>
			</div>
			<div class="main-content">
				<div class="review-content">
					<div class="content-part3">
						<div class="part-title">
							<el-button type="primary" @click="addRow">新增</el-button>
						</div>
						<div class="content">
							<el-table
								v-loading="loading"
								border
								size="mini"
								class="small-size-table"
								:data="dataList"
								style="width: 100%"
								:header-cell-style="getRowClass"
								row-key="id"
								:row-style="{ height: '45px' }"
								@sort-change="changeTableSort"
							>
								<el-table-column
									prop="userName"
									align="center"
									label="展示顺序"
									width="120px"
								>
									<template slot-scope="scope">
										<span v-if="!!scope.row.id">{{ scope.row.id }}</span>
										<span v-else>-</span>
									</template>
								</el-table-column>
								<el-table-column
									prop="accountType"
									align="center"
									label="搜索词条信息"
									width="220px"
								>
									<template slot-scope="scope">
										<span v-if="!!scope.row.bankName">
											<el-input
												v-model="scope.row.bankName"
												size="medium"
												maxlength="20"
												placeholder="请输入"
												clearable
												style="width: 180px"
											></el-input>
										</span>
										<span v-else>-</span>
									</template>
								</el-table-column>
								<el-table-column
									prop="cardNumber"
									align="center"
									label="创建人"
								>
									<template slot-scope="scope">
										<Copy
											v-if="!!scope.row.cardNumber"
											:title="scope.row.cardNumber"
											:copy="copy"
										/>
										<span v-else>-</span>
									</template>
								</el-table-column>
								<el-table-column
									prop="createDt"
									align="center"
									label="创建时间"
									width="180px"
									sortable="custom"
								>
									<template slot-scope="scope">
										<span v-if="!!scope.row.createDt">
											{{ scope.row.createDt }}
										</span>
										<span v-else>-</span>
									</template>
								</el-table-column>
								<el-table-column
									prop="cnName"
									align="center"
									label="最新操作人"
								>
									<template slot-scope="scope">
										<Copy
											v-if="!!scope.row.cnName"
											:title="scope.row.cnName"
											:copy="copy"
										/>
										<span v-else>-</span>
									</template>
								</el-table-column>
								<el-table-column
									prop="operateType"
									align="center"
									label="最新操作人"
								>
									<template slot-scope="scope">
										<span v-if="!!scope.row.operateType">
											{{ typeFilter(scope.row.operateType, 'bindType') }}
										</span>
										<span v-else>-</span>
									</template>
								</el-table-column>
								<el-table-column align="center" label="操作">
									<template slot-scope="scope">
										<el-button
											type="danger"
											icon="el-icon-edit"
											size="medium"
											@click="deleteRow(scope.row)"
										>
											删除
										</el-button>
									</template>
								</el-table-column>
							</el-table>
							<!-- 分页 -->
							<el-pagination
								v-show="!!total"
								:current-page.sync="pageNum"
								class="pageValue"
								background
								layout="total, sizes,prev, pager, next, jumper"
								:page-size="pageSize"
								:page-sizes="$store.getters.pageSizes"
								:total="total"
								@current-change="handleCurrentChange"
								@size-change="handleSizeChange"
							></el-pagination>
						</div>
					</div>
				</div>
			</div>
		</div>
		<!-- 最新游戏 -->
		<div v-else-if="true" class="review-content">
			<div class="head">
				<span class="title">最新模块</span>
				<div class="right-btn">
					<el-button plain @click="goBack">取消</el-button>
					<el-button type="success" @click="confirm(true)">保存</el-button>
				</div>
			</div>
			<div class="main-content">
				<div class="review-content">
					<el-form ref="form" :model="form" label-width="auto" :rules="rules">
						<el-row>
							<el-col :span="12">
								<el-form-item label="主标题信息:" prop="gameName">
									<el-input
										v-model="form.gameName"
										size="medium"
										maxlength="20"
										clearable
										style="width: 365px"
									></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="12">
								<el-form-item label="副标题信息:" prop="gameName">
									<el-input
										v-model="form.gameName"
										size="medium"
										maxlength="20"
										clearable
										style="width: 365px"
									></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="12">
								<el-form-item label="滚屏数量限制:" prop="gameName">
									<el-input
										v-model="form.gameName"
										size="medium"
										maxlength="20"
										clearable
										style="width: 365px"
									></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="12">
								<el-form-item label="全部游戏数量:" prop="gameName">
									<el-input
										v-model="form.gameName"
										size="medium"
										maxlength="20"
										clearable
										style="width: 365px"
									></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="12">
								<el-form-item label="模块描述:">
									<el-input
										v-model="form.gameName"
										size="medium"
										maxlength="20"
										clearable
										style="width: 365px"
									></el-input>
								</el-form-item>
							</el-col>
						</el-row>
					</el-form>
				</div>
			</div>
		</div>
		<el-dialog
			title="提交确认"
			center
			:visible.sync="visible"
			:before-close="closeFormDialog"
			width="610px"
		>
			<el-form ref="form" label-width="100px">
				<el-form-item label="提交审核信息">
					<el-input
						v-model="remark"
						clearable
						type="textarea"
						:max="50"
						:autosize="{ minRows: 4, maxRows: 4 }"
						size="medium"
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
import { routerNames } from '@/utils/consts'
import { getToken } from '@/utils/auth'
import Sortable from 'sortablejs'
// import dayjs from 'dayjs'
export default {
	name: routerNames.gameManagementEdit,
	components: {},
	mixins: [list],
	data() {
		return {
			list: {},
			form: {
				icon: '',
				gameName: ''
			},
			loading: false,
			queryData: {
				historyGameLimit: undefined,
				hotSearch: undefined
			},
			dataList: [],
			visible: false,
			remark: '',
			action: false,
			uploadUrl: process.env.VUE_APP_BASE_API + '/agents/uploadAgentLog',
			imageUrl: '',
			// 审核 true 仅返回 false
			type: true
		}
	},
	computed: {
		token() {
			return getToken()
		},
		accountType() {
			return this.globalDics.accountType
		},
		genderType() {
			return this.globalDics.genderType
		},
		rules() {
			return {
				icon: [{ required: true, message: '请选择支持终端', trigger: 'blur' }],
				image: [
					{
						required: true,
						message: '请选择图片上传',
						trigger: ['blur', 'change']
					}
				],
				gameName: [
					{
						required: true,
						message: '请输入游戏名称',
						trigger: 'blur'
					}
				]
			}
		}
	},
	created() {
		// 拖动排序
		document.body.ondrop = function(event) {
			event.preventDefault()
			event.stopPropagation()
		}
		for (let i = 0; i < 5; i++) {
			this.dataList[i] = {
				bankCode: '165416416464654',
				bankName: '中国银行',
				createDt: '2021-02-13 20:28:54',
				updateDt: '2021-02-13 20:28:54',
				vipSerialNum: '115',
				id: i + 100
			}
		}
		this.columnDrop()
	},
	mounted() {},
	updated() {
		console.log('新表格数据', this.dataList)
	},
	methods: {
		closeFormDialog() {
			this.visible = false
		},
		add() {
			this.loading = true
			const params = {
				...this.form
			}
			this.$refs['form'].validate((valid) => {
				console.log('valid', valid)
				if (valid) {
					this.$api
						.addMemberAPI(params)
						.then((res) => {
							this.loading = false
							const { code, data, msg } = res
							if (code === 200) {
								this.$confirm(`会员${data}资料提交成功`, {
									confirmButtonText: '确定',
									type: 'success',
									showCancelButton: false
								})
								this.reset()
							} else {
								this.$message({
									message: msg,
									type: 'error'
								})
							}
						})
						.catch(() => {
							this.loading = false
						})
				}
			})

			setTimeout(() => {
				this.loading = false
			}, 1000)
		},
		checkValue() {},
		addRow() {
			const lastRow = this.dataList[this.dataList.length - 1]
			const new_row = lastRow.id + 1
			this.dataList.push({ id: new_row })
		},
		deleteRow() {
			this.$confirm('确定删除此游戏吗?', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			})
				.then(() => {
					// const loading = this.$loading({
					// 	lock: true,
					// 	text: 'Loading',
					// 	spinner: 'el-icon-loading',
					// 	background: 'rgba(0, 0, 0, 0.7)'
					// })
					// this.$api
					// 	.setDeleteRole('', val.id)
					// 	.then((res) => {
					// 		loading.close()
					// 		this.$message({
					// 			type: 'success',
					// 			message: '删除成功!'
					// 		})
					// 		this.loadData()
					// 	})
					// 	.catch(() => {
					// 		loading.close()
					// 	})
				})
				.catch(() => {})
		},

		// 列拖动
		columnDrop() {
			console.log('旧数据', this.dataList)
			const wrapperTr = document.querySelector('.el-table__body-wrapper tbody')
			const _this = this
			this.sortable = Sortable.create(wrapperTr, {
				animation: 180,
				delay: 0,
				onEnd: ({ newIndex, oldIndex }) => {
					const currRow = _this.dataList.splice(oldIndex, 1)[0]
					_this.dataList.splice(newIndex, 0, currRow)
				}
			})
		},
		reset() {
			this.$refs['form'].resetFields()
			this.queryData = {
				historyGameLimit: undefined,
				hotSearch: undefined
			}
		},
		confirm(action) {
			this.remark = ''
			this.action = action
			this.visible = true
		},
		beforeAvatarUpload() {
			// const isPNG = file.type === 'image/png'
			// if (!isPNG) {
			// 	this.$message.error(this.$t('new_2771'))
			// }
			// const isSize = new Promise(function(resolve, reject) {
			// 	const _URL = window.URL || window.webkitURL
			// 	const image = new Image()
			// 	// image.src = file.url
			// 	image.onload = () => {
			// 		const valid = image.width === 240 && image.height === 72
			// 		valid ? resolve() : reject()
			// 	}
			// 	image.src = _URL.createObjectURL(file)
			// }).then(
			// 	() => {
			// 		return file
			// 	},
			// 	() => {
			// 		this.$message({
			// 			message: this.$t('new_2771'),
			// 			type: 'error'
			// 		})
			// 		return Promise.reject()
			// 	}
			// )
			// this.dataList = {
			// 	textType: 4,
			// 	agentId: row.agentId.split('_')[1]
			// }
			// return isPNG && isSize
		},
		handleAvatarSuccess() {
			// if (response.code !== 200) {
			// 	this.$message({
			// 		message: this.$i18n.t(`backstage_${response.code}`),
			// 		type: 'error'
			// 	})
			// } else {
			// 	row.blogo = response.data
			// 	this.$message({
			// 		message: this.$t(`new_1111`),
			// 		type: 'success'
			// 	})
			// }
		},
		auditOne() {
			const loading = this.$loading({
				lock: true,
				text: 'Loading',
				spinner: 'el-icon-loading',
				background: 'rgba(0, 0, 0, 0.7)'
			})
			const params = {
				id: this.$route.query.id,
				userId: this.$route.query.userId,
				remark: this.remark,
				auditStatus: this.action ? 2 : 3
			}

			this.$api
				.updateMemberAuditRecord(params)
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
		},
		goBack() {
			this.$router.go(-1)
		},
		getInfo() {
			const params = {
				id: this.$route.query.id
			}
			this.$api.memberAuditDetail(params).then((res) => {
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
			border: 1px solid rgba(192, 190, 190, 0.5);
			border-top: 0px;
			padding: 30px;
			.name {
				font-weight: 600;
			}
			.review-flex {
				position: relative;
				width: 100%;
				margin-top: 10px;
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
	.img-title {
		margin-top: 10px;
		font-size: 14px;
		font-weight: 600;
		margin-bottom: 10px;
		color: rgba(0, 0, 0, 0.847058823529412);
	}
	.avatar {
		width: 70px;
		height: 70px;
		display: inline-block;
		margin-left: 20px;
		margin-bottom: 20px;
	}
}
</style>
