<template>
	<div class="game-container report-container">
		<div class="header flex-h flex-bc">
			<h2 class="h2-line">会员管理</h2>
			<div class="head flex-h-end">
				<el-button
					type="primary"
					icon="el-icon-search"
					:disabled="loading"
					size="medium"
					@click="query"
				>
					查询
				</el-button>
				<el-button
					icon="el-icon-refresh-left"
					:disabled="loading"
					size="medium"
					@click="reset"
				>
					重置
				</el-button>
				<el-button
					type="primary"
					icon="el-icon-folder-add"
					size="medium"
					@click="add"
				>
					新增
				</el-button>
			</div>
		</div>
		<div class="view-container dealer-container">
			<div class="params">
				<el-form
					ref="form"
					:inline="true"
					:model="queryData"
					label-width="100px"
				>
					<el-form-item label="注册时间">
						<el-date-picker
							v-model="form.registerTime"
							size="medium"
							:picker-options="pickerOptions"
							format="yyyy-MM-dd HH:mm:ss"
							type="datetimerange"
							range-separator="-"
							start-placeholder="开始日期"
							end-placeholder="结束日期"
							align="right"
							clearable
							value-format="timestamp"
							style="width: 385px"
						></el-date-picker>
					</el-form-item>
					<el-form-item label="会员账号">
						<el-input
							v-model="form.userName"
							size="medium"
							placeholder="会员账号"
							clearable
						></el-input>
					</el-form-item>
					<el-form-item label="会员姓名">
						<el-input
							v-model="form.nickName"
							size="medium"
							placeholder="会员姓名"
							clearable
						></el-input>
					</el-form-item>
					<el-form-item label="账号状态">
						<el-select
							v-model="form.status"
							size="medium"
							placeholder="全部"
							clearable
						>
							<el-option label="全部" value></el-option>
							<el-option label="启用" :value="1"></el-option>
							<el-option label="停用" :value="0"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="离线天数">
						<el-input
							v-model="form.levelDays"
							size="medium"
							placeholder="离线天数"
							clearable
						></el-input>
					</el-form-item>
					<el-form-item label="最后登录时间">
						<el-date-picker
							v-model="form.lastLoginTime"
							size="medium"
							:picker-options="pickerOptions"
							format="yyyy-MM-dd HH:mm:ss"
							type="datetimerange"
							range-separator="-"
							start-placeholder="开始日期"
							end-placeholder="结束日期"
							align="right"
							clearable
							value-format="timestamp"
							style="width: 385px"
						></el-date-picker>
					</el-form-item>
					<el-form-item label="VIP等级">
						<el-input
							v-model="form.vipRank"
							size="medium"
							placeholder="VIP等级"
							clearable
						></el-input>
					</el-form-item>
					<el-form-item label="会员类型">
						<el-select
							v-model="form.userType"
							size="medium"
							placeholder="全部"
							clearable
						>
							<el-option label="全部" value></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="会员标签">
						<el-select
							v-model="form.userLabel"
							size="medium"
							placeholder="全部"
							clearable
						>
							<el-option label="全部" value></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="注册终端">
						<el-select
							v-model="form.terminal"
							size="medium"
							placeholder="全部"
							clearable
						>
							<el-option label="全部" value></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="上级代理">
						<el-input
							v-model="form.supAgent"
							size="medium"
							placeholder="上级代理"
							clearable
						></el-input>
					</el-form-item>
                    <el-form-item label="最后下注时间">
                        <el-date-picker
                            v-model="form.lastBetTime"
                            size="medium"
                            :picker-options="pickerOptions"
                            format="yyyy-MM-dd HH:mm:ss"
                            type="datetimerange"
                            range-separator="-"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期"
                            align="right"
                            clearable
                            value-format="timestamp"
                            style="width: 385px"
                        ></el-date-picker>
                    </el-form-item>
                    <el-form-item label="首存时间">
                        <el-date-picker
                            v-model="form.firstSaveTime"
                            size="medium"
                            :picker-options="pickerOptions"
                            format="yyyy-MM-dd HH:mm:ss"
                            type="datetimerange"
                            range-separator="-"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期"
                            align="right"
                            clearable
                            value-format="timestamp"
                            style="width: 385px"
                        ></el-date-picker>
                    </el-form-item>
					<el-form-item label="首存金额">
						<el-input
							v-model="form.firstSaveMoney"
							clearable
							size="medium"
							placeholder="首存金额"
							:disabled="loading"
							@keyup.enter.native="enterSearch"
						></el-input>
					</el-form-item>
					<el-form-item label="中心钱包">
						<el-input
							v-model="form.wallet"
							clearable
							size="medium"
							placeholder="中心钱包"
							:disabled="loading"
							@keyup.enter.native="enterSearch"
						></el-input>
					</el-form-item>
				</el-form>
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
				>
					<el-table-column
						prop="bankCode"
						align="center"
						label="会员账号"
					></el-table-column>
					<el-table-column
						prop="bankName"
						align="center"
						label="会员姓名"
					></el-table-column>
					<el-table-column
						prop="createDt"
						align="center"
						label="代理上级"
					></el-table-column>
					<el-table-column
						prop="updateDt"
						align="center"
						label="会员类型"
					></el-table-column>
                    <el-table-column
                        prop="updateDt"
                        align="center"
                        label="会员标签"
                    ></el-table-column>
                    <el-table-column
                        prop="updateDt"
                        align="center"
                        label="风控层级"
                    ></el-table-column>
                    <el-table-column
                        prop="updateDt"
                        align="center"
                        label="账号状态"
                    ></el-table-column>
                    <el-table-column
                        prop="updateDt"
                        align="center"
                        label="VIP等级"
                    ></el-table-column>
                    <el-table-column
                        prop="updateDt"
                        align="center"
                        label="注册时间"
                    ></el-table-column>
                    <el-table-column
                        prop="updateDt"
                        align="center"
                        label="首存时间"
                    ></el-table-column>
                    <el-table-column
                        prop="updateDt"
                        align="center"
                        label="首存金额"
                    ></el-table-column>
                    <el-table-column
                        prop="updateDt"
                        align="center"
                        label="中心钱包"
                    ></el-table-column>
                    <el-table-column
                        prop="updateDt"
                        align="center"
                        label="最后登录时间"
                    ></el-table-column>
					<el-table-column align="center" label="操作">
						<template slot-scope="scope">
							<el-button
								type="danger"
								icon="el-icon-delete"
								size="medium"
								@click="deleteUp(scope.row)"
							>
								删除
							</el-button>
							<el-button
								type="warning"
								icon="el-icon-edit"
								size="medium"
								@click.stop="editUp(scope.row)"
							>
								修改
							</el-button>
						</template>
					</el-table-column>
				</el-table>
				<!-- 分页 -->
				<el-pagination
					v-show="dataList.length > 0"
					:current-page.sync="pageNum"
					layout="total, sizes,prev, pager, next, jumper"
					:page-size="pageSize"
					:page-sizes="$store.getters.pageSizes"
					:total="15"
					@current-change="handleCurrentChange"
					@size-change="handleSizeChange"
				></el-pagination>
				<el-dialog
					:title="moduleBox"
					center
					:visible.sync="editVisible"
					:before-close="closeFormDialog"
					width="410px"
				>
					<editForm v-if="moduleBox == '新增银行信息'" ref="addForm"></editForm>
					<editForm
						v-else
						ref="editForm"
						:editFormData="editFormData"
					></editForm>
					<div slot="footer" class="dialog-footer">
						<el-button @click="editVisible = false">取 消</el-button>
						<el-button
							v-if="moduleBox == '新增银行信息'"
							type="primary"
							@click="submitAdd"
						>
							确 定
						</el-button>
						<el-button v-else type="primary" @click="submitEdit">
							确 定
						</el-button>
					</div>
				</el-dialog>
			</div>
		</div>
	</div>
</template>

<script>
import list from '@/mixins/list'
import editForm from './components/editForm'
export default {
	name: '',
	components: {
		editForm
	},
	mixins: [list],
	data() {
		return {
			queryData: {},
			form: {
				registerTime: [],
				userName: '',
				nickName: '',
				status: '',
				levelDays: '',
				lastLoginTime: '',
				vipRank: '',
				userType: '',
				userLabel: '',
				terminal: '',
                supAgent: '',
                lastBetTime: '',
                firstSaveTime: '',
                firstSaveMoney: '',
                wallet: ''
			},
			dataList: [],
			moduleBox: '',
			showForm: '',
			editVisible: false,
			editFormData: {}
		}
	},
	computed: {},
	mounted() {
		for (let i = 0; i < 10; i++) {
			this.dataList[i] = {
				bankCode: '165416416464654',
				bankName: '中国银行',
				createDt: '2021-02-13 20:28:54',
				updateDt: '2021-02-13 20:28:54'
			}
		}
	},
	methods: {
		// loadData(params) {
		//   params = {
		//     ...this.getParams(params)
		//   }
		//   getQueryBank(params).then((res) => {
		//     console.log('res:', res)
		//     if (res.code === 200) {
		//       this.loading = false
		//       this.dataList = res.data
		//     } else {
		//       this.loading = false
		//       this.$message({
		//         message: res.msg,
		//         type: 'error'
		//       })
		//     }
		//   })
		// },
		query() {
			this.loading = true
			const create = this.formTime.time || []
			const [startTime, endTime] = create
			const params = {
				...this.queryData,
				pageNum: 1,
				startTime: startTime && startTime + '',
				endTime: endTime && endTime + ''
			}
			console.log(params)
			this.loadData(params)
		},
		reset() {
			this.queryData = {}
			this.formTime.time = []
			// this.loadData()
		},

		add() {
			this.moduleBox = '新增银行信息'
			this.editVisible = true
		},
		submitAdd() {
			console.log(this.$refs.addForm)
			//   setAddBank(this.queryData).then((res) => {
			//     console.log(res);
			//   });
		},
		deleteUp(val) {
			console.log(val)
			this.$confirm('确定删除此银行卡号吗?', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			})
				.then(() => {
					this.$message({
						type: 'success',
						message: '删除成功!'
					})
					// setDeleteBank(val).then((res) => {
					//   console.log(res);
					// });
				})
				.catch(() => {
					this.$message({
						type: 'info',
						message: '已取消删除'
					})
				})
		},
		editUp(val) {
			this.moduleBox = '修改银行信息'
			this.editVisible = true
			this.editFormData = val
		},
		submitEdit() {
			// setEidteBank().then((res) => {
			//   console.log(res);
			// });
		},
		handleCurrentChange() {
			this.loadData()
		},
		closeFormDialog() {
			this.editVisible = false
		},
		enterSubmit() {
			this.query()
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
</style>
