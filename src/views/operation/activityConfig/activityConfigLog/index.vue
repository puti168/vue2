<template>
	<div class="game-container report-container">
		<el-tabs v-model="activeName" @tab-click="handleClick">
			<el-tab-pane label="活动类型名称配置" name="0">
				<div class="params">
					<el-form ref="form" :inline="true" :model="queryData">
						<el-form-item label="操作时间:">
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
								:clearable="false"
								:default-time="defaultTime"
							></el-date-picker>
						</el-form-item>
						<el-form-item label="变更类型:">
							<el-select
								v-model="queryData.changeType"
								style="width: 300px"
								multiple
								placeholder="默认选择全部"
								:popper-append-to-body="false"
							>
								<el-option
									v-for="item in operateChangeTypeName"
									:key="item.code"
									:label="item.description"
									:value="item.code"
								></el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="操作人:">
							<el-input
								v-model="queryData.operatorBy"
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
								prop="operationPage"
								align="center"
								label="操作页面"
							>
								<template slot-scope="scope">
									<span v-if="!!scope.row.operationPage">
										{{ scope.row.operationPage }}
									</span>
									<span v-else>-</span>
								</template>
							</el-table-column>
							<el-table-column
								prop="changeType"
								align="center"
								label="变更类型"
							>
								<template slot-scope="scope">
									<span
										v-if="
											!!scope.row.changeType ||
												scope.row.changeType + '' === '0'
										"
									>
										{{
											typeFilter(scope.row.changeType, 'operateChangeTypeName')
										}}
									</span>
								</template>
							</el-table-column>
							<el-table-column prop="changeFront" align="center" label="变更前">
								<template slot-scope="scope">
									<span v-if="!!scope.row.changeFront">
										{{ scope.row.changeFront }}
									</span>
									<span v-else>-</span>
								</template>
							</el-table-column>
							<el-table-column prop="changeAfter" align="center" label="变更后">
								<template slot-scope="scope">
									<span v-if="!!scope.row.changeAfter">
										{{ scope.row.changeAfter }}
									</span>
									<span v-else>-</span>
								</template>
							</el-table-column>
							<el-table-column
								prop="operatorBy"
								align="center"
								width="120"
								label="操作人"
							>
								<template slot-scope="scope">
									<span v-if="!!scope.row.operatorBy">
										{{ scope.row.operatorBy }}
									</span>
									<span v-else>-</span>
								</template>
							</el-table-column>
							<el-table-column
								prop="operatorAt"
								align="center"
								width="210"
								sortable="custom"
								label="操作时间"
							>
								<template slot-scope="scope">
									<span v-if="!!scope.row.operatorAt">
										{{ scope.row.operatorAt }}
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
			</el-tab-pane>
			<el-tab-pane label="创建优惠类型页签" name="1">
				<div class="params">
					<el-form ref="form" :inline="true" :model="queryData">
						<el-form-item label="操作时间:">
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
								:clearable="false"
								:default-time="defaultTime"
							></el-date-picker>
						</el-form-item>

						<el-form-item label="活动页签:">
							<el-select
								v-model="queryData.tagIds"
								style="width: 300px"
								multiple
								placeholder="默认选择全部"
								:popper-append-to-body="false"
							>
								<el-option
									v-for="item in gameList"
									:key="item.id"
									:label="item.activityName"
									:value="item.id"
								></el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="变更类型:">
							<el-select
								v-model="queryData.changeType"
								style="width: 300px"
								multiple
								placeholder="默认选择全部"
								:popper-append-to-body="false"
							>
								<el-option
									v-for="item in operateChangeTypeTag"
									:key="item.code"
									:label="item.description"
									:value="item.code"
								></el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="操作人:">
							<el-input
								v-model="queryData.operatorBy"
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
								prop="operationPage"
								align="center"
								label="操作页面"
							>
								<template slot-scope="scope">
									<span v-if="!!scope.row.operationPage">
										{{ scope.row.operationPage }}
									</span>
									<span v-else>-</span>
								</template>
							</el-table-column>
							<el-table-column
								prop="operationPageName"
								align="center"
								label="活动页签名称"
							>
								<template slot-scope="scope">
									<span v-if="scope.row.operationPageName">
										{{ scope.row.operationPageName }}
									</span>
									<span v-else>-</span>
								</template>
							</el-table-column>
							<el-table-column
								prop="changeType"
								align="center"
								label="变更类型"
							>
								<template slot-scope="scope">
									<span
										v-if="
											!!scope.row.changeType ||
												scope.row.changeType + '' === '0'
										"
									>
										{{
											typeFilter(scope.row.changeType, 'operateChangeTypeTag')
										}}
									</span>
									<span v-else>-</span>
								</template>
							</el-table-column>
							<el-table-column prop="changeFront" align="center" label="变更前">
								<template slot-scope="scope">
									<span v-if="scope.row.changeFront">
										{{ scope.row.changeFront }}
									</span>
									<span v-else>-</span>
								</template>
							</el-table-column>
							<el-table-column prop="changeAfter" align="center" label="变更后">
								<template slot-scope="scope">
									<span v-if="scope.row.changeAfter">
										{{ scope.row.changeAfter }}
									</span>
									<span v-else>-</span>
								</template>
							</el-table-column>
							<el-table-column prop="remark" align="center" label="备注">
								<template slot-scope="scope">
									<span v-if="scope.row.remark">
										{{ scope.row.remark }}
									</span>
									<span v-else>-</span>
								</template>
							</el-table-column>
							<el-table-column
								prop="operatorBy"
								align="center"
								width="120"
								label="操作人"
							>
								<template slot-scope="scope">
									<span v-if="scope.row.operatorBy">
										{{ scope.row.operatorBy }}
									</span>
									<span v-else>-</span>
								</template>
							</el-table-column>
							<el-table-column
								prop="operatorAt"
								align="center"
								width="210"
								sortable="custom"
								label="操作时间"
							>
								<template slot-scope="scope">
									<span v-if="scope.row.operatorAt">
										{{ scope.row.operatorAt }}
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
			</el-tab-pane>
			<el-tab-pane label="优惠活动配置" name="2">
				<div class="params">
					<el-form ref="form" :inline="true" :model="queryData">
						<el-form-item label="操作时间:">
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
								:clearable="false"
								:default-time="defaultTime"
							></el-date-picker>
						</el-form-item>
						<el-form-item label="活动ID:">
							<el-input
								v-model="queryData.activityId"
								clearable
								size="medium"
								:maxlength="20"
								style="width: 210px"
								placeholder="请输入"
								@keyup.enter.native="enterSearch"
							></el-input>
						</el-form-item>
						<el-form-item label="变更类型:">
							<el-select
								v-model="queryData.changeType"
								style="width: 300px"
								multiple
								placeholder="默认选择全部"
								:popper-append-to-body="false"
							>
								<el-option
									v-for="item in operateChangeTypeDis"
									:key="item.code"
									:label="item.description"
									:value="item.code"
								></el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="操作人:">
							<el-input
								v-model="queryData.operatorBy"
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
								prop="operationPage"
								align="center"
								label="操作页面"
							>
								<template slot-scope="scope">
									<span v-if="scope.row.operationPage">
										{{ scope.row.operationPage }}
									</span>
									<span v-else>-</span>
								</template>
							</el-table-column>
							<el-table-column
								prop="activityType"
								align="center"
								label="活动类型"
							>
								<template slot-scope="scope">
									<span v-if="scope.row.activityType">
										{{ scope.row.activityType }}
									</span>
									<span v-else>-</span>
								</template>
							</el-table-column>
							<el-table-column prop="activityId" align="center" label="活动ID">
								<template slot-scope="scope">
									<span v-if="!!scope.row.activityId">
										{{ scope.row.activityId }}
									</span>
									<span v-else>-</span>
								</template>
							</el-table-column>
							<el-table-column
								prop="changeType"
								align="center"
								label="变更类型"
							>
								<template slot-scope="scope">
									<p>
										{{
											typeFilter(scope.row.changeType, 'operateChangeTypeDis')
										}}
									</p>
								</template>
							</el-table-column>
							<el-table-column prop="changeFront" align="center" label="变更前">
								<template slot-scope="scope">
									<span v-if="!!scope.row.changeFront">
										{{ scope.row.changeFront }}
									</span>
									<span v-else>-</span>
								</template>
							</el-table-column>
							<el-table-column prop="changeAfter" align="center" label="变更后">
								<template slot-scope="scope">
									<span v-if="!!scope.row.changeAfter">
										{{ scope.row.changeAfter }}
									</span>
									<span v-else>-</span>
								</template>
							</el-table-column>
							<el-table-column
								prop="operatorBy"
								align="center"
								width="120"
								label="操作人"
							>
								<template slot-scope="scope">
									<span v-if="!!scope.row.operatorBy">
										{{ scope.row.operatorBy }}
									</span>
									<span v-else>-</span>
								</template>
							</el-table-column>
							<el-table-column
								prop="operatorAt"
								align="center"
								width="210"
								sortable="custom"
								label="操作时间"
							>
								<template slot-scope="scope">
									<span v-if="!!scope.row.operatorAt">
										{{ scope.row.operatorAt }}
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
			</el-tab-pane>
			<el-tab-pane label="赞助/vip活动配置" name="3">
				<div class="params">
					<el-form ref="form" :inline="true" :model="queryData">
						<el-form-item label="操作时间:">
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
								:clearable="false"
								:default-time="defaultTime"
							></el-date-picker>
						</el-form-item>
						<el-form-item label="活动类型:">
							<el-select
								v-model="queryData.activityType"
								style="width: 300px"
								multiple
								placeholder="默认选择全部"
								:popper-append-to-body="false"
							>
								<el-option
									v-for="item in operateActivityType"
									:key="item.code"
									:label="item.description"
									:value="item.code"
								></el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="活动ID:">
							<el-input
								v-model="queryData.activityId"
								clearable
								size="medium"
								:maxlength="20"
								style="width: 210px"
								placeholder="请输入"
								@keyup.enter.native="enterSearch"
							></el-input>
						</el-form-item>
						<el-form-item label="变更类型:">
							<el-select
								v-model="queryData.changeType"
								style="width: 300px"
								multiple
                                collapse-tags
								placeholder="默认选择全部"
								:popper-append-to-body="false"
							>
								<el-option
									v-for="item in operateChangeTypeVip"
									:key="item.code"
									:label="item.description"
									:value="item.code"
								></el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="操作人:">
							<el-input
								v-model="queryData.operatorBy"
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
								prop="operationPage"
								align="center"
								label="操作页面"
							>
								<template slot-scope="scope">
									<span v-if="!!scope.row.operationPage">
										{{ scope.row.operationPage }}
									</span>
									<span v-else>-</span>
								</template>
							</el-table-column>
							<el-table-column
								prop="activityType"
								align="center"
								label="活动类型"
							>
								<template slot-scope="scope">
									<span
										v-if="
											scope.row.activityType ||
												scope.row.activityType + '' === '0'
										"
									>
										{{
											typeFilter(
												scope.row.activityType,
												'operateActivityType'
											)
										}}
									</span>
									<span v-else>-</span>
								</template>
							</el-table-column>
							<el-table-column prop="activityId" align="center" label="活动ID">
								<template slot-scope="scope">
									<span
										v-if="
											scope.row.activityId || scope.row.activityId + '' === '0'
										"
									>
										{{ scope.row.activityId }}
									</span>
									<span v-else>-</span>
								</template>
							</el-table-column>
							<el-table-column
								prop="changeType"
								align="center"
								label="变更类型"
							>
								<template slot-scope="scope">
									<span
										v-if="
											scope.row.changeType || scope.row.changeType + '' === '0'
										"
									>
										{{
											typeFilter(scope.row.changeType, 'operateChangeTypeVip')
										}}
									</span>
								</template>
							</el-table-column>
							<el-table-column prop="changeFront" align="center" label="变更前">
								<template slot-scope="scope">
									<span v-if="!!scope.row.changeFront">
										{{ scope.row.changeFront }}
									</span>
									<span v-else>-</span>
								</template>
							</el-table-column>
							<el-table-column prop="changeAfter" align="center" label="变更后">
								<template slot-scope="scope">
									<span v-if="!!scope.row.changeAfter">
										{{ scope.row.changeAfter }}
									</span>
									<span v-else>-</span>
								</template>
							</el-table-column>
							<el-table-column
								prop="operatorBy"
								align="center"
								width="120"
								label="操作人"
							>
								<template slot-scope="scope">
									<span v-if="!!scope.row.operatorBy">
										{{ scope.row.operatorBy }}
									</span>
									<span v-else>-</span>
								</template>
							</el-table-column>
							<el-table-column
								prop="operatorAt"
								align="center"
								width="210"
								sortable="custom"
								label="操作时间"
							>
								<template slot-scope="scope">
									<span v-if="!!scope.row.operatorAt">
										{{ scope.row.operatorAt }}
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
			</el-tab-pane>
		</el-tabs>
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

export default {
	name: 'MemberMsgChange',
	mixins: [list],
	data() {
		return {
			queryData: {
				operatorBy: undefined,
				changeType: [],
				activityType: [],
				tagIds: [],
				activityId: undefined,
				orderKey: undefined,
				orderType: undefined
			},
			formTime: {
				time: [start, end]
			},
			dataList: [],
			gameList: [],
			activeName: '0'
		}
	},
	computed: {
		operateChangeTypeName() {
			return this.globalDics.operateChangeTypeName
		},
		operateChangeTypeTag() {
			return this.globalDics.operateChangeTypeTag
		},
		operateChangeTypeDis() {
			return this.globalDics.operateChangeTypeDis
		},
		operateChangeTypeVip() {
			return this.globalDics.operateChangeTypeVip
		},
		operateActivityType() {
			return this.globalDics.operateActivityType
		}
	},
	mounted() {
		this.loadGame()
	},
	methods: {
		loadGame() {
			this.$api
				.configDiscountTagQueryNames()
				.then((res) => {
					const { code, data } = res
					if (code === 200) {
						this.gameList = data || []
					}
				})
				.catch(() => {})
		},
		handleClick() {
			this.reset()
		},
		loadData() {
			const [startTime, endTime] = this.formTime.time || []
			let params = {}
			this.loading = true
			this.dataList = []
			let type
			if (this.activeName === '0') {
				type = 'queryActivityTypeList'
				params = {
					changeType: this.queryData.changeType,
					operatorBy: this.queryData.operatorBy,
					orderKey: this.queryData.orderKey,
					orderType: this.queryData.orderType,
					startAt: startTime
						? dayjs(startTime).format('YYYY-MM-DD HH:mm:ss')
						: '',
					endAt: endTime ? dayjs(endTime).format('YYYY-MM-DD HH:mm:ss') : ''
				}
			} else if (this.activeName === '1') {
				type = 'queryDiscountTagList'
				params = {
					changeType: this.queryData.changeType,
					operatorBy: this.queryData.operatorBy,
					tagIds: this.queryData.tagIds,
					orderKey: this.queryData.orderKey,
					orderType: this.queryData.orderType,
					startAt: startTime
						? dayjs(startTime).format('YYYY-MM-DD HH:mm:ss')
						: '',
					endAt: endTime ? dayjs(endTime).format('YYYY-MM-DD HH:mm:ss') : ''
				}
			} else if (this.activeName === '2') {
				type = 'queryDiscountActivityList'
				params = {
					changeType: this.queryData.changeType,
					operatorBy: this.queryData.operatorBy,
					activityId: this.queryData.activityId,
					orderKey: this.queryData.orderKey,
					orderType: this.queryData.orderType,
					startAt: startTime
						? dayjs(startTime).format('YYYY-MM-DD HH:mm:ss')
						: '',
					endAt: endTime ? dayjs(endTime).format('YYYY-MM-DD HH:mm:ss') : ''
				}
			} else if (this.activeName === '3') {
				type = 'queryVipActivityList'
				params = {
					activityType: this.queryData.activityType,
					changeType: this.queryData.changeType,
					operatorBy: this.queryData.operatorBy,
					activityId: this.queryData.activityId,
					orderKey: this.queryData.orderKey,
					orderType: this.queryData.orderType,
					startAt: startTime
						? dayjs(startTime).format('YYYY-MM-DD HH:mm:ss')
						: '',
					endAt: endTime ? dayjs(endTime).format('YYYY-MM-DD HH:mm:ss') : ''
				}
			}
			params = {
				...this.getParams(params)
			}
			this.$api[type](params)
				.then((res) => {
					this.loading = false
					const { code, data, msg } = res
					if (code === 200) {
						this.dataList = data.records
						this.total = data.total
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
		_changeTableSort({ column, prop, order }) {
			this.pageNum = 1
			if (prop === 'operatorAt') {
				prop = 0
			}
			this.queryData.orderKey = prop
			if (order === 'ascending') {
				this.queryData.orderType = 'asc'
			} else if (order === 'descending') {
				this.queryData.orderType = 'desc'
			} else {
				delete this.queryData.orderKey
				delete this.queryData.orderType
			}
			this.loadData()
		},
		reset() {
			this.pageNum = 1
			this.queryData = {
				operatorBy: undefined,
				changeType: [],
				activityType: [],
				tagIds: [],
				activityId: undefined,
				orderKey: undefined,
				orderType: undefined
			}
			this.formTime.time = [start, end]
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
