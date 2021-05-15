<template>
	<div class="review-content">
		<div class="head">
			<span class="title">游戏专题模块</span>
			<div class="right-btn">
				<el-button plain @click="goBack">取消</el-button>
				<el-button type="success" @click="confirm(true)">保存</el-button>
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
										v-model="form.gameName"
										size="medium"
										maxlength="100"
                    minlength="2"
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
								label="状态"
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
								prop="accountType"
								align="center"
								label="分类名称"
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
								prop="accountType"
								align="center"
								label="全部游戏数量上限"
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
								prop="accountType"
								align="center"
								label="主标题信息"
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
								prop="accountType"
								align="center"
								label="副标题信息"
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
							<el-table-column align="center" label="操作">
								<template slot-scope="scope">
									<el-button
										:disabled="loading"
										type="danger"
										size="medium"
										class="noicon"
										@click="deleteRow(scope.row)"
									>
										禁用
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
</template>

<script>
import list from '@/mixins/list'
import Sortable from 'sortablejs'

export default {
	components: {},
	mixins: [list],
	props: { editFormData: { type: Object, default: () => ({}) } },
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
			dataList: []
		}
	},
	computed: {},
	watch: {
		editFormData(val) {
			this.editData = { ...val }
		}
	},
	created() {
		// 拖动排序
		document.body.ondrop = function(event) {
			event.preventDefault()
			event.stopPropagation()
		}
		this.columnDrop()
	},
	mounted() {},
	methods: {
		goBack() {
			this.$router.go(-1)
		},
		confirm() {},
		deleteRow(row) {
			console.log(row)
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
		changeStatus(row) {
			console.log(row)
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
</style>
