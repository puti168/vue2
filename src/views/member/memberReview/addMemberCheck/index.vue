<template>
	<div class="game-container report-container">
		<div class="params">
			<el-form ref="form" :inline="true" :model="queryData">
				<el-form-item label="申请时间:">
					<el-date-picker
						v-model="formTime.time"
						size="medium"
						:picker-options="pickerOptions"
						format="yyyy-MM-dd HH:mm:ss"
						type="datetimerange"
						range-separator="-"
						start-placeholder="开始日期"
						end-placeholder="结束日期"
						align="right"
						clearable
						:default-time="defaultTime"
					></el-date-picker>
				</el-form-item>
				<el-form-item label="一审完成时间:">
					<el-date-picker
						v-model="formTime.time"
						size="medium"
						:picker-options="pickerOptions"
						format="yyyy-MM-dd HH:mm:ss"
						type="datetimerange"
						range-separator="-"
						start-placeholder="开始日期"
						end-placeholder="结束日期"
						align="right"
						clearable
						:default-time="defaultTime"
					></el-date-picker>
				</el-form-item>
				<el-form-item label="审核状态:">
					<el-select
						v-model="queryData.status"
						style="width: 280px"
						:popper-append-to-body="false"
					>
						<el-option label="全部" value=""></el-option>
						<el-option label="启用" value="0"></el-option>
						<el-option label="停用" value="1"></el-option>
					</el-select>
				</el-form-item>

				<el-form-item label="锁单状态:">
					<el-select
						v-model="queryData.status"
						style="width: 280px"
						:popper-append-to-body="false"
					>
						<el-option label="全部" value=""></el-option>
						<el-option label="启用" value="0"></el-option>
						<el-option label="停用" value="1"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="审核操作:">
					<el-select
						v-model="queryData.status"
						style="width: 280px"
						:popper-append-to-body="false"
					>
						<el-option label="全部" value=""></el-option>
						<el-option label="启用" value="0"></el-option>
						<el-option label="停用" value="1"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="申请人:">
					<el-input
						v-model="queryData.createBy"
						clearable
						size="medium"
						style="width: 280px"
						placeholder="请输入"
						:disabled="loading"
						@keyup.enter.native="enterSearch"
					></el-input>
				</el-form-item>
				<el-form-item label="一审人:">
					<el-input
						v-model="queryData.updatedBy"
						clearable
						size="medium"
						style="width: 280px"
						placeholder="请输入"
						:disabled="loading"
						@keyup.enter.native="enterSearch"
					></el-input>
				</el-form-item>

				<el-form-item style="margin-left: 30px">
					<el-button
						type="primary"
						icon="el-icon-search"
						:disabled="loading"
						size="medium"
						@click="search"
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
				</el-form-item>
				<p class="danger data-refresh">数据更新时间： 2019-10-01 10:00:00</p>
			</el-form>
		</div>
		<div class="view-container dealer-container">
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
						prop="cardNo"
						align="center"
						label="锁单"
					>
					<template slot-scope="scope">
						<el-checkbox v-model="scope.row.cardNo"></el-checkbox>
					</template>
					</el-table-column>
					<el-table-column
						prop="createBy"
						align="center"
						label="操作"
					></el-table-column>
					<el-table-column
						prop="createDt"
						align="center"
						label="审核单号"
					></el-table-column>
					<el-table-column
						prop="remark"
						align="center"
						label="申请人"
					></el-table-column>
					<el-table-column
						prop="remark"
						align="center"
						label="申请时间"
					></el-table-column>
					<el-table-column
						prop="remark"
						align="center"
						label="申请信息"
					></el-table-column>
					<el-table-column
						prop="remark"
						align="center"
						label="审核状态"
					></el-table-column>
					<el-table-column
						align="center"
					></el-table-column>
					<el-table-column align="center">
						<template slot="header">
							<p>一审审核人</p>
							<p>一审完成时间</p>
						</template>
						<template slot-scope="scope">
							{{ scope.row.modifyBy }}
						</template>
					</el-table-column>
				</el-table>
				<!-- 分页 -->
				<el-pagination
					:current-page.sync="pageNum"
					class="pageValue"
					layout="total, sizes,prev, pager, next, jumper"
					:page-size="pageSize"
					:page-sizes="pageSizes"
					:total="total"
					@current-change="handleCurrentChange"
					@size-change="handleSizeChange"
				></el-pagination>
			</div>
		</div>
	</div>
</template>

<script>
import list from '@/mixins/list'
import dayjs from 'dayjs'
export default {
	name: '',
	components: {},
	mixins: [list],
	data() {
		return {
			queryData: {},
			formTime: {
				time: []
			},
			dataList: [],
			title: '',
			showForm: '',
			editVisible: false,
			editFormData: {}
		}
	},
	computed: {},
	mounted() {},
	methods: {
		loadData() {
			this.loading = true
			const [startTime, endTime] = this.formTime.time || []
			let params = {
				...this.queryData,
				pageNum: 1,
				startTime: startTime
					? dayjs(startTime).format('YYYY-MM-DD HH:mm:ss')
					: '',
				endTime: endTime ? dayjs(endTime).format('YYYY-MM-DD HH:mm:ss') : ''
			}
			params = {
				...this.getParams(params)
			}
			this.$api.blackList(params).then((res) => {
				if (res.code === 200) {
					const response = res.data
					this.loading = false
					this.dataList = response.records
					this.total = response.total
				} else {
					this.loading = false
					this.$message({
						message: res.msg,
						type: 'error'
					})
				}
			})
		},
		reset() {
			this.queryData = {}
			this.formTime.time = []
			this.loadData()
		},

		add() {
			this.title = '新增'
			this.editVisible = true
			this.editFormData = {}
		},
		deleteUp(val) {
			this.$confirm('确定删除此银行卡号吗?', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			}).then(() => {
				const loading = this.$loading({
					lock: true,
					text: 'Loading',
					spinner: 'el-icon-loading',
					background: 'rgba(0, 0, 0, 0.7)'
				})
				this.$api
					.delBlackList({
						id: val.id
					})
					.then(() => {
						loading.close()
						this.search()
						this.$message({
							type: 'success',
							message: '删除成功!'
						})
					})
					.catch(() => {
						loading.close()
					})
			})
		},
		editUp(val) {
			this.title = '编辑'
			this.editVisible = true
			this.editFormData = val
		},
		submit() {
			this.$refs.editForm.submit()
		},
		handleCurrentChange() {
			this.loadData()
		},
		closeFormDialog() {
			this.editVisible = false
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
.data-refresh {
	margin-top: 0;
	padding-bottom: 20px;
}
</style>
