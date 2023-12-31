<template>
	<div class="view-container dealer-container">
		<el-button
			v-show="!edit && hasPermission('291')"
			type="warning"
			icon="el-icon-folder"
			:disabled="loading"
			size="medium"
			class="fr"
			@click="addLevelConfig"
		>
			创建
		</el-button>
		<backCommissionEditForm
			v-if="edit && hasPermission('291')"
			:editRowData="editRowData"
			@back="back"
		/>
		<div v-else class="content">
			<el-table
				v-loading="loading"
				border
				size="mini"
				class="small-size-table"
				:data="backCommData"
				style="width: 100%"
				:header-cell-style="getRowClass"
				@sort-change="changeTableSort"
			>
				<el-table-column
					align="center"
					label="序号"
					prop="displayOrder"
					width="120"
				></el-table-column>
				<el-table-column
					prop="rebateLevel"
					align="center"
					label="佣金等级"
					width="150"
				>
					<template slot-scope="scope">
						<span>{{ scope.row.rebateLevel || '-' }}</span>
					</template>
				</el-table-column>
				<el-table-column
					prop="totalMinNetAmount"
					align="center"
					label="本月总输赢"
					width="200"
				>
					<template slot-scope="scope">
						{{ scope.row.totalMinNetAmount }} ~
						{{ scope.row.totalMaxNetAmount }}
					</template>
				</el-table-column>
				<el-table-column
					prop="monthActiveNum"
					align="center"
					label="本月活跃人数"
					width="120"
				>
					<template slot-scope="scope">
						≥ &nbsp;{{ scope.row.monthActiveNum }}
					</template>
				</el-table-column>
				<el-table-column
					prop="commissionRate"
					align="center"
					label="佣金比例"
					width="120"
				>
					<template slot-scope="scope">
						{{ scope.row.commissionRate }}%
					</template>
				</el-table-column>
				<el-table-column
					prop="createdBy"
					align="center"
					label="创建人"
					width="120"
				>
					<template slot-scope="scope">
						<span>{{ scope.row.createdBy || '-' }}</span>
					</template>
				</el-table-column>
				<el-table-column
					prop="createdAt"
					align="center"
					label="创建时间"
					width="200px"
					sortable="custom"
				>
					<template slot-scope="scope">
						<span>{{ scope.row.createdAt || '-' }}</span>
					</template>
				</el-table-column>
				<el-table-column
					prop="updatedBy"
					align="center"
					label="最近操作人"
					width="150"
				>
					<template slot-scope="scope">
						<span>{{ scope.row.updatedBy || '-' }}</span>
					</template>
				</el-table-column>
				<el-table-column
					prop="updatedAt"
					align="center"
					width="200px"
					label="最近操作时间"
					sortable="custom"
				>
					<template slot-scope="scope">
						<span>{{ scope.row.updatedAt || '-' }}</span>
					</template>
				</el-table-column>
				<el-table-column
					prop="operating"
					align="center"
					label="操作"
					min-width="150px"
				>
					<template slot-scope="scope">
						<el-button
							v-if="hasPermission('292')"
							type="primary"
							icon="el-icon-edit"
							:disabled="loading"
							size="medium"
							@click="openEdit(scope.row)"
						>
							编辑
						</el-button>
						<el-button
							v-if="hasPermission('293')"
							:disabled="loading"
							type="danger"
							size="medium"
							class="noicon"
							@click="confined(scope.row)"
						>
							删除
						</el-button>
					</template>
				</el-table-column>
			</el-table>
			<!-- 分页 -->
			<el-pagination
				:current-page.sync="pageNum"
				class="pageValue"
				background
				layout="total, sizes,prev, pager, next, jumper"
				:page-size="pageSize"
				:page-sizes="pageSizes"
				:total="total"
				@current-change="handleCurrentChange"
				@size-change="handleSizeChange"
			></el-pagination>
		</div>
	</div>
</template>

<script>
import list from '@/mixins/list'
import backCommissionEditForm from './backCommissionEditForm'

export default {
	components: { backCommissionEditForm },
	mixins: [list],
	data() {
		this.loadData = this.throttle(this.loadData, 1000)
		this.setProxyCommissionDelete = this.throttle(
			this.setProxyCommissionDelete,
			1000
		)
		return {
			queryData: {},
			edit: false,
			backCommData: [],
			editRowData: {}
		}
	},
	computed: {},
	mounted() {},
	methods: {
		loadData() {
			this.loading = true
			let params = {
				...this.queryData
			}
			params = {
				...this.getParams(params)
			}
			this.$api
				.getProxyCommissionSelect(params)
				.then((res) => {
					if (res.code === 200) {
						this.loading = false
						this.total = res.data.totalRecord
						this.backCommData = res.data.record
					} else {
						this.loading = false
						this.$message({
							message: res.msg,
							type: 'error'
						})
					}
				})
				.catch(() => {
					this.loading = false
				})
		},
		addLevelConfig() {
			this.editRowData = {}
			this.edit = true
		},
		openEdit(val) {
			const {
				id,
				rebateLevel,
				totalMinNetAmount,
				totalMaxNetAmount,
				monthActiveNum,
				commissionRate
			} = { ...val }
			this.editRowData = {
				id,
				rebateLevel,
				totalMinNetAmount,
				totalMaxNetAmount,
				monthActiveNum,
				commissionRate
			}
			this.edit = true
		},
		back() {
			this.loadData()
			this.edit = false
		},
		// 删除

		confined(val) {
			this.$confirm(
				`<strong>是否删除该条配置?</strong></br><span style='font-size:12px;color:#c1c1c1'>请谨慎操作</span>`,
				'确认提示',
				{
					dangerouslyUseHTMLString: true,
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}
			)
				.then(() => {
					this.setProxyCommissionDelete(val)
				})
				.catch(() => {})
		},
		setProxyCommissionDelete(val) {
			this.$api.setProxyCommissionDelete({ id: val.id }).then((res) => {
				if (res.code === 200) {
					this.$message.success('删除成功')
					this.loadData()
				}
			})
		},
		changeTableSort({ column, prop, order }) {
			if (prop === 'createdAt') {
				prop = 1
			}
			if (prop === 'updatedAt') {
				prop = 2
			}
			this.pageNum = 1
			this.queryData.orderKey = prop
			if (order === 'ascending') {
				// 升序
				this.queryData.orderType = 'asc'
			} else if (order === 'descending') {
				// 降序
				this.queryData.orderType = 'desc'
			} else {
				delete this.queryData.orderKey
				delete this.queryData.orderType
			}
			this.loadData()
		}
	}
}
</script>

<style lang="scss" scoped>
.fr {
	position: fixed;
	top: 126px;
	right: 20px;
}
</style>
