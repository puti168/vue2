<template>
	<div class="review-content">
		<div class="head">
			<span class="title">游戏专题模块</span>
			<div class="right-btn">
				<el-button plain @click="back">取消</el-button>
				<el-button type="success" @click="save(true)">保存</el-button>
			</div>
		</div>
		<div class="main-content">
			<div class="review-content">
				<div class="content-part3">
					<el-form ref="form" :model="form" label-width="auto">
						<el-row>
							<el-col :span="12">
								<el-form-item label="模块描述:">
									<el-input
										v-model="form.moduleDesc"
										size="medium"
										show-word-limit
										type="textarea"
										maxlength="100"
										placeholder="2~100字符"
										clearable
										style="width: 365px"
									></el-input>
								</el-form-item>
							</el-col>
						</el-row>
					</el-form>
					<el-divider></el-divider>
					<div class="part-title">
						<el-button type="primary" @click="addRow">新增</el-button>
					</div>
					<div class="content">
						<el-form ref="queryData" :model="queryData" :rules="rules">
							<el-table
								v-loading="loading"
								border
								size="mini"
								class="small-size-table"
								:data="queryData.dataList"
								style="width: 100%"
								:header-cell-style="getRowClass"
								row-key="displayOrder"
								:row-style="{ height: '45px' }"
								@sort-change="changeTableSort"
							>
								<el-table-column
									prop="displayOrder"
									align="center"
									label="展示顺序"
									width="120"
								>
									<template slot-scope="scope">
										<span v-if="!!scope.row.displayOrder">
											{{ scope.row.displayOrder }}
										</span>
										<span v-else>-</span>
									</template>
								</el-table-column>
								<el-table-column
									prop="status"
									align="center"
									label="状态"
									width="220px"
								>
									<template slot-scope="scope">
										<span
											:class="
												scope.row.status === 1 ? 'normalRgba' : 'disableRgba'
											"
										>
											{{ scope.row.status + '' === '1' ? '开启中' : '禁用中' }}
										</span>
									</template>
								</el-table-column>
								<el-table-column
									prop="assortId"
									align="center"
									label="分类名称"
									width="300"
								>
									<template slot-scope="scope">
										<el-form-item
											label=" "
											:prop="'dataList.' + scope.$index + '.assortId'"
											:rules="rules.assortId"
										>
											<el-select
												v-model="scope.row.assortId"
												size="medium"
												placeholder="请选择"
												style="width: 245px"
												@change="changeType($event)"
											>
												<el-option
													v-for="item in gameAssortDicList"
													:key="item.id"
													:label="item.assortName"
													:value="item.id"
												></el-option>
											</el-select>
										</el-form-item>
									</template>
								</el-table-column>
								<el-table-column
									prop="allGameNum"
									align="center"
									label="全部游戏数量上限"
									width="230"
								>
									<template slot-scope="scope">
										<el-form-item
											label=" "
											:prop="'dataList.' + scope.$index + '.allGameNum'"
											:rules="rules.allGameNum"
										>
											<el-input
												v-model="scope.row.allGameNum"
												size="medium"
												maxlength="3"
												placeholder="请输入数字"
												clearable
												style="width: 180px"
												@keyup.native="checkValue($event)"
											></el-input>
										</el-form-item>
									</template>
								</el-table-column>
								<el-table-column
									prop="mainTitleInfo"
									align="center"
									label="主标题信息"
									width="230"
								>
									<template slot-scope="scope">
										<el-form-item
											label=" "
											:prop="'dataList.' + scope.$index + '.mainTitleInfo'"
											:rules="rules.mainTitleInfo"
										>
											<el-input
												v-model="scope.row.mainTitleInfo"
												size="medium"
												maxlength="10"
												placeholder="请输入"
												clearable
												style="width: 180px"
											></el-input>
										</el-form-item>
									</template>
								</el-table-column>
								<el-table-column
									prop="subTitleInfo"
									align="center"
									label="副标题信息"
									width="230"
								>
									<template slot-scope="scope">
										<el-form-item
											label=" "
											:prop="'dataList.' + scope.$index + '.subTitleInfo'"
											:rules="rules.subTitleInfo"
										>
											<el-input
												v-model="scope.row.subTitleInfo"
												size="medium"
												maxlength="10"
												placeholder="请输入"
												clearable
												style="width: 180px"
											></el-input>
										</el-form-item>
									</template>
								</el-table-column>
								<el-table-column align="center" label="操作">
									<template slot-scope="scope">
										<el-button
											:disabled="scope.row.status === '0'"
											:type="scope.row.status === 1 ? 'danger' : 'success'"
											size="medium"
											class="noicon"
											@click="changeStatus(scope.row)"
										>
											{{ scope.row.status === 1 ? '禁用' : '开启' }}
										</el-button>
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
						</el-form>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import list from '@/mixins/list'
import Sortable from 'sortablejs'
import { getUsername } from '@/utils/auth'
import dayjs from 'dayjs'

export default {
	components: {},
	mixins: [list],
	props: { gameDetails: { type: Object, default: () => {} } },
	data() {
		return {
			loading: false,
			list: {},
			form: {
				moduleDesc: undefined
			},
			queryData: {
				dataList: []
			},
			idArray: [],
			gameAssortDicList: [],
			copyArr: []
		}
	},
	computed: {
		rules() {
			const assortId = [
				{ required: true, message: '请选择分类名称', trigger: 'change' }
			]
			const mainTitleInfo = [
				{
					required: true,
					message: '请输入主标题信息',
					trigger: 'blur'
				},
				{
					min: 2,
					max: 10,
					message: '长度在 2 到 10 个字符',
					trigger: 'blur'
				}
			]
			const subTitleInfo = [
				{
					required: true,
					message: '请输入副标题信息',
					trigger: 'blur'
				},
				{
					min: 2,
					max: 10,
					message: '长度在 2 到 10 个字符',
					trigger: 'blur'
				}
			]
			const allGameNum = [
				{
					required: true,
					message: '请输入数字',
					trigger: 'blur'
				}
			]
			return {
				assortId,
				mainTitleInfo,
				subTitleInfo,
				allGameNum
			}
		}
	},
	watch: {},
	created() {
		this.getDetails()
	},
	mounted() {
		// 拖动排序
		document.body.ondrop = function(event) {
			event.preventDefault()
			event.stopPropagation()
		}
		this.columnDrop()
		this.gameAssortList()
	},
	methods: {
		back() {
			this.$emit('back')
		},
		checkValue(e) {
			e.target.value = e.target.value.replace(/[^\d]/g, '')
		},
		getDetails(status) {
			this.queryData.dataList = []
			this.loading = true
			this.$api
				.gameSpecialDetailsAPI()
				.then((res) => {
					this.loading = false
					const {
						code,
						data: { gameTopicModuleMetaVos, moduleDesc, id },
						msg
					} = res
					if (code === 200) {
						this.queryData.dataList = gameTopicModuleMetaVos || []
						status &&
							this.$nextTick(() => {
								this.queryData.dataList = [
									...this.queryData.dataList,
									...this.copyArr
								]
							})
						this.form.moduleDesc = moduleDesc
						this.form.id = id
						this.idArray =
							gameTopicModuleMetaVos &&
							gameTopicModuleMetaVos.length &&
							gameTopicModuleMetaVos.map((item) => item.id)
					} else {
						this.loading = false
						this.$message({
							message: msg,
							type: 'error'
						})
					}
					console.log('res', res)
				})
				.catch(() => (this.loading = false))

			setTimeout(() => {
				this.loading = false
			}, 1500)
		},
		gameAssortList() {
			this.$api.gameAssortDicAPI().then((res) => {
				const { code, data } = res
				if (code === 200) {
					this.gameAssortDicList = data || []
				}
			})
		},
		changeType(evt) {
			// console.log('evt', evt)
			// this.queryData = {
			//     activityType: evt.description,
			//     activityCode: evt.code
			// }
		},
		deleteRow(val) {
			const { id } = val
			this.$confirm('确定删除此游戏吗?', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			})
				.then(() => {
					const loading = this.$loading({
						lock: true,
						text: 'Loading',
						spinner: 'el-icon-loading',
						background: 'rgba(0, 0, 0, 0.7)'
					})
					if (this.idArray.includes(id)) {
						this.$api
							.gameDelTopicModuleAPI({ id })
							.then((res) => {
								loading.close()
								const { code } = res
								if (code === 200) {
									this.$message({
										type: 'success',
										message: '删除成功!'
									})
								} else {
									this.$message({
										type: 'error',
										message: '删除失败!'
									})
								}
								this.getDetails()
							})
							.catch(() => {
								loading.close()
								this.$message({
									type: 'error',
									message: '删除失败!'
								})
							})
					} else {
						this.queryData.dataList = this.queryData.dataList.filter((item) => {
							return item.id !== id
						})
						// this.updateArr = this.updateArr.filter((item) => {
						// 	return item.id !== id
						// })
					}
					setTimeout(() => {
						loading.close()
					}, 1000)
				})
				.catch(() => {})
		},
		save() {
			this.loading = true
			const gameTopicModuleMetaVos =
				this.queryData.dataList.map((item) => {
					return {
						allGameNum: item.allGameNum * 1,
						assortId: item.assortId,
						createdAt: item.createdAt,
						createdBy: item.createdBy,
						displayOrder: item.displayOrder,
						id: item.id,
						mainTitleInfo: item.mainTitleInfo,
						moduleId: item.moduleId,
						status: Number(item.status),
						subTitleInfo: item.subTitleInfo
					}
				}) || []
			const { moduleDesc, id } = this.form
			const params = {
				gameTopicModuleMetaVos,
				moduleDesc,
				id
			}
			this.$refs['form'].validate((valid) => {
				if (valid) {
					this.$api
						.editGameTopicModuleAPI(params)
						.then((res) => {
							this.loading = false
							const { code, msg } = res
							if (code === 200) {
								this.$message({
									message: '保存成功',
									type: 'success'
								})
								this.copyArr = []
								this.$parent.back()
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
		addRow() {
			const lastRow = this.queryData.dataList.length
				? this.queryData.dataList[this.queryData.dataList.length - 1]
				: undefined
			// const new_row = lastRow ? lastRow.id + 1 : 1
			const displayOrder = lastRow ? lastRow.displayOrder + 1 : 1
			const arr = []
			arr.push({
				createdAt: dayjs(new Date()).format('YYYY-MM-DD HH:mm:ss'),
				createdBy: getUsername(),
				displayOrder,
				allGameNum: undefined,
				assortId: undefined,
				mainTitleInfo: undefined,
				moduleId: undefined,
				status: '0',
				subTitleInfo: undefined
			})
			this.queryData.dataList = [...this.queryData.dataList, ...arr]
			this.copyArr = [...arr]
		},

		// 列拖动
		columnDrop() {
			const wrapperTr = document.querySelector('.el-table__body-wrapper tbody')
			const _this = this
			this.sortable =
				wrapperTr &&
				Sortable.create(wrapperTr, {
					ghostClass: 'sortable-ghost',
					animation: 300,
					delay: 0,
					onEnd: ({ newIndex, oldIndex }) => {
						const currRow = _this.queryData.dataList.splice(oldIndex, 1)[0]
						_this.queryData.dataList.splice(newIndex, 0, currRow)
						if (newIndex !== oldIndex) {
							this.$nextTick(() => {
								_this.queryData.dataList.forEach((item, idx) => {
									item.displayOrder = idx + 1
								})
							})
						}
					}
				})
		},
		changeStatus(row) {
			const { id, status } = row
			this.$confirm(
				`<strong>是否对子游戏进行开启/禁用操作?</strong></br><span style='font-size:12px;color:#c1c1c1'>一旦操作将会立即生效</span>`,
				'确认提示',
				{
					dangerouslyUseHTMLString: true,
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}
			).then(() => {
				this.$api
					.gameEitTopicModuleAPI({
						id,
						moduleStatus: status === 1 ? 0 : 1
					})
					.then((res) => {
						const { code } = res
						if (code === 200) {
							this.$message({
								type: 'success',
								message: '操作成功!'
							})
						} else {
							this.$message({
								type: 'error',
								message: '操作失败!'
							})
						}
						this.getDetails(true)
					})
			})
		}
	}
}
</script>

<style lang="scss" scoped>
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

.sortable-ghost {
	background-color: #0b7dfa;
}
</style>
