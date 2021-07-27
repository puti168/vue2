<template>
	<div class="game-container report-container">
		<div class="params">
			<el-form ref="form" :inline="true" :model="queryData">
				<el-form-item label="变更时间:">
					<el-date-picker
						v-model="searchTime"
						size="medium"
						:picker-options="pickerOptions"
						format="yyyy-MM-dd HH:mm:ss"
						type="datetimerange"
						range-separator="-"
						start-placeholder="开始日期"
						end-placeholder="结束日期"
						align="right"
						:clearable="false"
						:default-time="defaultTime"
					></el-date-picker>
				</el-form-item>
				<el-form-item label="变更类型:">
					<el-select
						v-model="queryData.operateField"
						size="medium"
						placeholder="默认选择全部"
						clearable
						style="width: 300px"
					>
						<el-option
							v-for="item in enumProxyMaterialImageOperateArr"
							:key="item.code"
							:label="item.description"
							:value="item.code"
						></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="操作人:">
					<el-input
						v-model="queryData.createdBy"
						clearable
						size="medium"
						:maxlength="12"
						style="width: 180px"
						placeholder="请输入"
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
					@sort-change="_changeTableSort"
				>
					<el-table-column
						prop="createdAt"
						align="center"
						label="操作时间"
						sortable="custom"
					></el-table-column>
					<el-table-column prop="operateField" align="center" label="变更类型">
						<template slot-scope="scope">
							<span v-if="!!(scope.row.operateField + '')">
								{{
									typeFilter(
										scope.row.operateField,
										'enumProxyMaterialImageOperate'
									)
								}}
							</span>
							<span v-else>-</span>
						</template>
					</el-table-column>
					<el-table-column align="center" label="变更前" prop="beforeModify">
						<template slot-scope="scope">
							<span v-if="scope.row.operateField === 1">
								{{ typeFilter(scope.row.beforeModify, 'materialPictureType') }}
							</span>
							<el-button
								v-else-if="scope.row.operateField === 3"
								:disabled="loading"
								type="success"
								size="medium"
								class="noicon"
								@click="preViewPictureBefore(scope.row)"
							>
								预览
							</el-button>
							<span v-else-if="!!(scope.row.beforeModify + '')">
								{{ scope.row.beforeModify }}
							</span>
							<span v-else>-</span>
						</template>
					</el-table-column>
					<el-table-column align="center" label="变更后" prop="afterModify">
						<template slot-scope="scope">
							<span v-if="scope.row.operateField === 1">
								{{ typeFilter(scope.row.afterModify, 'materialPictureType') }}
							</span>
							<el-button
								v-else-if="scope.row.operateField === 3"
								:disabled="loading"
								type="success"
								size="medium"
								class="noicon"
								@click="preViewPictureAfter(scope.row)"
							>
								预览
							</el-button>
							<span v-else-if="!!(scope.row.afterModify + '')">
								{{ scope.row.afterModify }}
							</span>
							<span v-else>-</span>
						</template>
					</el-table-column>
					<el-table-column
						prop="createdBy"
						align="center"
						width="120"
						label="操作人"
					>
						<template slot-scope="scope">
							<span v-if="!!(scope.row.createdBy + '')">
								{{ scope.row.createdBy }}
							</span>
							<span v-else>-</span>
						</template>
					</el-table-column>
					<el-table-column align="center" label="备注" prop="remark">
						<template slot-scope="scope">
							<span v-if="!!(scope.row.remark + '')">
								{{ scope.row.remark }}
							</span>
							<span v-else>-</span>
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
		<el-dialog
			title="图片"
			:visible.sync="dialogPictureVisible"
			:destroy-on-close="true"
			width="750px"
			class="imgCenter"
		>
			<div class="img-box">
				<img v-lazy="imageAddress" />
			</div>
		</el-dialog>
	</div>
</template>

<script>
import list from '@/mixins/list'
import dayjs from 'dayjs'
const end = dayjs()
	.endOf('day')
	.valueOf()
const start = dayjs()
	.startOf('day')
	.valueOf()
// 操作类型(0=代理等级配置变更,1=返佣等级变更 2=推广域名管理 3=推广图片管理)
const operateType = 3
export default {
	components: {},
	mixins: [list],
	data() {
		return {
			queryData: {
				operateType: operateType,
				orderType: undefined,
				operateField: undefined,
				createdBy: undefined
			},
			searchTime: [start, end],
			dataList: [],
			dialogPictureVisible: false,
			imageAddress: null
		}
	},
	computed: {
		enumProxyMaterialImageOperateArr() {
			return this.globalDics.enumProxyMaterialImageOperate
		}
	},
	mounted() {},
	methods: {
		loadData() {
			const [beginTime, endTime] = this.searchTime || []
			let params = {
				...this.queryData,
				beginTime: beginTime
					? dayjs(beginTime).format('YYYY-MM-DD HH:mm:ss')
					: '',
				endTime: endTime ? dayjs(endTime).format('YYYY-MM-DD HH:mm:ss') : ''
			}
			params = {
				...this.getParams(params)
			}
			delete params.time
			this.loading = true

			this.$api
				.proxyOperate(params)
				.then((res) => {
					this.loading = false
					const {
						code,
						data: { record, totalRecord },
						msg
					} = res
					if (code === 200) {
						this.dataList = record || []
						this.total = totalRecord || 0
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
		},
		preViewPictureBefore(val) {
			const { beforeModify } = val
			this.imageAddress = beforeModify
			this.dialogPictureVisible = true
		},
		preViewPictureAfter(val) {
			debugger
			const { afterModify } = val
			this.imageAddress = afterModify
			this.dialogPictureVisible = true
		},
		_changeTableSort({ column, prop, order }) {
			this.pageNum = 1
			if (order === 'ascending') {
				// 升序
				this.queryData.orderType = 'asc'
			} else if (column.order === 'descending') {
				// 降序
				this.queryData.orderType = 'desc'
			} else {
				delete this.queryData.orderKey
				delete this.queryData.orderType
			}
			this.loadData()
		},
		reset() {
			this.pageNum = 1
			this.queryData = {}
			this.searchTime = [start, end]
			this.loadData()
		}
	}
}
</script>

<style lang="scss" scoped>
.imgCenter {
	.img-box {
		height: 500px;
		img {
            margin:0;
			width: 100%;
			height: 100%;
		}
	}
}
</style>
