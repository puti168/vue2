<template>
	<div class="game-container report-container">
		<div class="view-container dealer-container">
			<div class="params">
				<el-form ref="form" :inline="true" :model="form" label-width="100px">
					<el-form-item label="操作类型:">
						<el-select
							v-model="form.operateType"
							size="medium"
							placeholder="全部"
							clearable
							style="width: 150px"
						>
							<el-option label="全部" value></el-option>
							<el-option label="绑定" value="1"></el-option>
							<el-option label="解绑" value="2"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="操作时间:">
						<el-date-picker
							v-model="form.createDt"
							prop="registerTime"
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
							style="width: 388px"
							:default-time="defaultTime"
						></el-date-picker>
					</el-form-item>
					<el-form-item label="会员账号:" prop="userName">
						<el-input
							v-model="form.userName"
							size="medium"
							placeholder="请输入"
							clearable
							maxlength="11"
							style="width: 150px"
						></el-input>
					</el-form-item>
					<el-form-item label="持卡人姓名:">
						<el-input
							v-model="form.cnName"
							size="medium"
							placeholder="请输入"
							clearable
							style="width: 150px"
							maxlength="6"
						></el-input>
					</el-form-item>
					<el-form-item label="银行名称:">
						<el-input
							v-model="form.bankName"
							size="medium"
							placeholder="请输入"
							clearable
							style="width: 150px"
							maxlength="10"
						></el-input>
					</el-form-item>
					<el-form-item label="银行卡号:">
						<el-input
							v-model="form.cardNumber"
							size="medium"
							placeholder="请输入"
							clearable
							style="width: 150px"
							maxlength="25"
						></el-input>
					</el-form-item>
					<el-form-item label="上级代理:">
						<el-input
							v-model="form.parentProxyName"
							size="medium"
							placeholder="请输入"
							clearable
							style="width: 150px"
							maxlength="11"
						></el-input>
					</el-form-item>
					<el-form-item>
						<el-button
							type="primary"
							icon="el-icon-search"
							:disabled="loading"
							size="medium"
							@click="handleSearch"
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
						v-slot="scope"
						prop="userName"
						align="center"
						label="会员账号"
					>
						<Copy :title="scope.row.userName" :copy="copy" />
					</el-table-column>
					<el-table-column
						prop="accountType"
						align="center"
						label="账号类型"
					></el-table-column>
					<el-table-column
						v-slot="scope"
						prop="parentProxyName"
						align="center"
						label="上级代理"
					>
						<Copy :title="scope.row.parentProxyName" :copy="copy" />
					</el-table-column>
					<el-table-column
						v-slot="scope"
						prop="cardNumber"
						align="center"
						label="银行卡号"
					>
						<Copy :title="scope.row.cardNumber" :copy="copy" />
					</el-table-column>
					<el-table-column
						prop="bankName"
						align="center"
						label="银行名称银行支行"
					></el-table-column>
					<el-table-column
						v-slot="scope"
						prop="cnName"
						align="center"
						label="持卡人"
					>
						<Copy :title="scope.row.cnName" :copy="copy" />
					</el-table-column>
					<el-table-column
						prop="operateType"
						align="center"
						label="操作类型"
					></el-table-column>
					<el-table-column
						prop="createDt"
						align="center"
						label="操作时间"
						sortable="custom"
					></el-table-column>
				</el-table>
				<!-- 分页 -->
                <el-pagination
                    v-show="!!total"
                    :current-page.sync="pageNum"
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
</template>

<script>
import list from '@/mixins/list'
import dayjs from 'dayjs'
// import { notSpecial2, isHaveEmoji } from '@/utils/validate'
const start = dayjs()
	.startOf('day')
	.valueOf()
const end = dayjs()
	.endOf('day')
	.valueOf()
// import editForm from './components/editForm'
// import { UTable } from 'umy-ui'
export default {
	name: '',
	mixins: [list],
	data() {
		return {
			form: {
				operateType: '',
				createDt: [start, end],
				userName: '',
				cnName: '',
				bankName: '',
				cardNumber: '',
				parentProxyName: ''
			},
			pageIndex: 1,
			dataList: [],
			total: 0
		}
	},
	computed: {},
	mounted() {},
	methods: {
		loadData() {
			this.dataList = []
			const create = this.form.createDt || []
			const [startTime, endTime] = create
			const params = {
				...this.form,
				pageIndex: this.pageIndex,
				pageSize: this.pageSize,
				createDtStart: dayjs(startTime).format('YYYY-MM-DD HH:mm:ss') || '',
				createDtEnd: dayjs(endTime).format('YYYY-MM-DD HH:mm:ss') || ''
			}
			delete params.createDt
			this.$api.bankRecordListAPI(params).then((res) => {
				const {
					code,
					data: { record, totalRecord },
					msg
				} = res
				if (code === 200) {
					this.loading = false
					this.dataList = record || []
					this.total = totalRecord || 0
				} else {
					this.loading = false
					this.$message({
						message: msg,
						type: 'error'
					})
				}
			})
		},
		handleSearch() {
			this.loading = true
			this.pageIndex = 1
			this.loadData()
		},
		reset() {
			this.$refs['form'].resetFields()
			this.form = {
				operateType: '',
				createDt: [start, end],
				userName: '',
				cnName: '',
				bankName: '',
				cardNumber: '',
				parentProxyName: ''
			}
			this.loadData()
		},
		handleCurrentChange(val) {
            this.pageIndex = val
			this.loadData()
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
