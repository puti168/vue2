<template>
	<transition name="fade-transform" mode="out-in">
		<div v-if="!editPage" class="game-container report-container">
			<div class="view-container dealer-container">
				<div class="params">
					<el-form
						ref="form"
						:inline="true"
						:model="queryData"
						label-width="100px"
					>
						<el-form-item label="创建时间:">
							<el-date-picker
								v-model="queryData.createDt"
								size="medium"
								:picker-options="pickerOptions"
								format="yyyy-MM-dd HH:mm:ss"
								type="datetimerange"
								range-separator="-"
								start-placeholder="开始日期"
								end-placeholder="结束日期"
								align="right"
								:clearable="false"
								value-format="timestamp"
								style="width: 382px"
								:default-time="defaultTime"
							></el-date-picker>
						</el-form-item>
						<el-form-item label="创建人:">
							<el-input
								v-model="queryData.createdBy"
								size="medium"
								placeholder="请输入"
								clearable
								maxlength="12"
								style="width: 180px"
								@keyup.enter.native="enterSearch"
							></el-input>
						</el-form-item>
						<el-form-item label="图片标题:">
							<el-input
								v-model="queryData.imageName"
								size="medium"
								placeholder="请输入"
								clearable
								maxlength="50"
								style="width: 300px"
								@keyup.enter.native="enterSearch"
							></el-input>
						</el-form-item>
						<el-form-item label="图片类型:">
							<el-select
								v-model="queryData.imageType"
								size="medium"
								placeholder="默认选择全部"
								clearable
								style="width: 180px"
							>
								<el-option
									v-for="item in materialPictureTypeArr"
									:key="item.code"
									:label="item.description"
									:value="item.code"
								></el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="图片尺寸:">
							<el-select
								v-model="queryData.imageSize"
								size="medium"
								placeholder="默认选择全部"
								clearable
								style="width: 180px"
							>
								<el-option
									v-for="item in pictureSizeTypeArr"
									:key="item.code"
									:label="item.description"
									:value="item.code"
								></el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="最近操作时间:" label-width="120px">
							<el-date-picker
								v-model="queryData.updatedDt"
								size="medium"
								:picker-options="pickerOptions"
								format="yyyy-MM-dd HH:mm:ss"
								type="datetimerange"
								range-separator="-"
								start-placeholder="开始日期"
								end-placeholder="结束日期"
								align="right"
								:clearable="false"
								value-format="timestamp"
								style="width: 382px"
								:default-time="defaultTime"
							></el-date-picker>
						</el-form-item>
						<el-form-item label="最近操作人:">
							<el-input
								v-model="queryData.updatedBy"
								size="medium"
								placeholder="请输入"
								clearable
								style="width: 180px"
								maxlength="12"
								@keyup.enter.native="enterSearch"
							></el-input>
						</el-form-item>
						<el-form-item>
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
							<el-button
								type="warning"
								icon="el-icon-folder-add"
								size="medium"
								@click="openEdit('')"
							>
								创建
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
						@sort-change="changeTableSort"
					>
						<el-table-column prop="displayOrder" align="center" label="排序">
							<template slot-scope="scope">
								<span
									v-if="
										!!scope.row.displayOrder || scope.row.displayOrder === 0
									"
								>
									{{ scope.row.displayOrder }}
								</span>
								<span v-else>-</span>
							</template>
						</el-table-column>
						<el-table-column prop="imageName" align="center" label="图片标题">
							<template slot-scope="scope">
								<span v-if="!!scope.row.imageName">
									{{ scope.row.imageName }}
								</span>
								<span v-else>-</span>
							</template>
						</el-table-column>
						<el-table-column prop="imageType" align="center" label="图片类型">
							<template slot-scope="scope">
								<span v-if="!!scope.row.imageType">
									{{ typeFilter(scope.row.imageType, 'materialPictureType') }}
								</span>
								<span v-else>-</span>
							</template>
						</el-table-column>
						<el-table-column prop="imageSize" align="center" label="图片尺寸">
							<template slot-scope="scope">
								<span v-if="!!scope.row.imageSize">
									{{ typeFilter(scope.row.imageSize, 'pictureSizeType') }}
								</span>
								<span v-else>-</span>
							</template>
						</el-table-column>
						<el-table-column prop="createdBy" align="center" label="创建人">
							<template slot-scope="scope">
								<span v-if="!!scope.row.createdBy">
									{{ scope.row.createdBy }}
								</span>
								<span v-else>-</span>
							</template>
						</el-table-column>
						<el-table-column
							prop="createdAt"
							align="center"
							label="创建时间"
							sortable="custom"
						>
							<template slot-scope="scope">
								<span v-if="!!scope.row.createdAt">
									{{ scope.row.createdAt }}
								</span>
								<span v-else>-</span>
							</template>
						</el-table-column>
						<el-table-column prop="cnName" align="center" label="最近操作人">
							<template slot-scope="scope">
								<span v-if="!!scope.row.updatedBy">
									{{ scope.row.updatedBy }}
								</span>
								<span v-else>-</span>
							</template>
						</el-table-column>
						<el-table-column
							prop="updatedAt"
							align="center"
							label="最近操作时间"
							sortable="custom"
						>
							<template slot-scope="scope">
								<span v-if="!!scope.row.updatedAt">
									{{ scope.row.updatedAt }}
								</span>
								<span v-else>-</span>
							</template>
						</el-table-column>
						<el-table-column
							prop="operating"
							align="center"
							label="操作"
							width="240px"
						>
							<template slot-scope="scope">
								<el-button
									:disabled="loading"
									type="success"
									size="medium"
									class="noicon"
									@click="preViewPicture(scope.row)"
								>
									预览
								</el-button>
								<el-button
									type="primary"
									icon="el-icon-edit"
									:disabled="loading"
									size="medium"
									@click="openEdit(scope.row)"
								>
									编辑信息
								</el-button>
								<el-button
									:disabled="loading"
									type="danger"
									size="medium"
									class="noicon"
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
			<el-dialog
				title="图片"
				:visible.sync="dialogPictureVisible"
				:destroy-on-close="true"
				width="650px"
				class="imgCenter"
			>
				<img :src="imageAddress" />
			</el-dialog>
		</div>
		<editPage v-else :editData="editData" :lastSortId="lastSortId" @back="back"></editPage>
	</transition>
</template>

<script>
import list from '@/mixins/list'
import dayjs from 'dayjs'
import { routerNames } from '@/utils/consts'
// import { notSpecial2, isHaveEmoji } from '@/utils/validate'
const start = dayjs()
	.startOf('day')
	.valueOf()
const end = dayjs()
	.endOf('day')
	.valueOf()
import editPage from './components/editPage'
// import { UTable } from 'umy-ui'
export default {
	name: routerNames.pictureManagement,
	components: { editPage },
	mixins: [list],
	data() {
		return {
			queryData: {
				createDt: [start, end],
				createdBy: undefined,
				imageName: undefined,
				imageType: undefined,
				imageSize: undefined,
				updatedDt: [start, end],
				updatedBy: undefined,
				orderType: undefined
			},
			dataList: [],
			total: 0,
			dialogPictureVisible: false,
			imageAddress: null,
			editPage: false,
			editData: {},
			lastSortId: undefined
		}
	},
	computed: {
		materialPictureTypeArr() {
			return this.globalDics.materialPictureType
		},
		pictureSizeTypeArr() {
			return this.globalDics.pictureSizeType
		}
	},
	mounted() {},
	methods: {
		loadData() {
			this.dataList = []
			this.loading = true
			const create = this.queryData.createDt || []
			const updatedDt = this.queryData.updatedDt || []
			const [startTime, endTime] = create
			const [updateTimeStart, updateTimeEnd] = updatedDt
			let params = {
				...this.queryData,
				beginDate: startTime
					? dayjs(startTime).format('YYYY-MM-DD HH:mm:ss')
					: undefined,
				endDate: endTime
					? dayjs(endTime).format('YYYY-MM-DD HH:mm:ss')
					: undefined,
				beginUpdateDate: updateTimeStart
					? dayjs(updateTimeStart).format('YYYY-MM-DD HH:mm:ss')
					: undefined,
				endUpdateDate: updateTimeEnd
					? dayjs(updateTimeEnd).format('YYYY-MM-DD HH:mm:ss')
					: undefined
			}
			params = {
				...this.getParams(params)
			}
			delete params.createDt
			delete params.updatedDt
			this.$api
				.agentPictureListAPI(params)
				.then((res) => {
					const {
						code,
						data: { record, totalRecord },
						msg
					} = res
					if (code === 200) {
						this.loading = false
						this.dataList = record || []
						this.total = totalRecord || 0
						//    计算最后排序
						this.lastSortId =
							record && record.length && record[record.length - 1].displayOrder
					} else {
						this.loading = false
						this.$message({
							message: msg,
							type: 'error'
						})
					}
				})
				.catch(() => (this.loading = false))

			setTimeout(() => {
				this.loading = false
			}, 1000)
		},
		reset() {
			this.$refs['form'].resetFields()
			this.pageNum = 1
			this.queryData = {
				createDt: [start, end],
				createdBy: undefined,
				imageName: undefined,
				imageType: undefined,
				imageSize: undefined,
				updatedDt: [start, end],
				updatedBy: undefined,
				orderType: undefined
			}
			this.loadData()
		},
		openEdit(val) {
			val ? (this.editData = val) : (this.editData = {})
			this.editPage = true
		},
		back() {
			this.editPage = false
			this.editData = {}
			this.loadData()
		},
		preViewPicture(val) {
			const { imageAddress } = val
			this.imageAddress = imageAddress
			this.dialogPictureVisible = true
		},
		deleteRow(val) {
			const { id } = val
			const loading = this.$loading({
				lock: true,
				text: 'Loading',
				spinner: 'el-icon-loading',
				background: 'rgba(0, 0, 0, 0.7)'
			})
			this.$confirm(
				`<strong>是否删除该图片</strong></br><span style='font-size:12px;color:#c1c1c1'>请慎重操作</span>`,
				'确认提示',
				{
					dangerouslyUseHTMLString: true,
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}
			)
				.then(() => {
					this.$api
						.agentPictureListDeleteAPI({ id })
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
							this.loadData()
						})
						.catch(() => {
							loading.close()
						})
				})
				.catch(() => {
					loading.close()
				})

			setTimeout(() => {
				loading.close()
			}, 1000)
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
.imgCenter {
	img {
		width: 100%;
	}
}
</style>
