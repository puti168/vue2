<template>
	<div class="game-container report-container">
		<div class="view-container dealer-container">
			<div class="params">
				<el-form ref="form" :inline="true" :model="queryData">
					<el-form-item label="统计日期:" prop="statisticsTime">
						<el-date-picker
							v-model="statisticsTime"
							type="daterange"
							range-separator="-"
							start-placeholder="开始日期"
							end-placeholder="结束日期"
							:picker-options="timeControl"
							@change="clearOutS"
						></el-date-picker>
					</el-form-item>
					<el-form-item label="注册日期:" prop="registerTime">
						<el-date-picker
							v-model="registerTime"
							type="daterange"
							range-separator="-"
							start-placeholder="开始日期"
							end-placeholder="结束日期"
							:picker-options="timeControl"
							@change="clearOutR"
						></el-date-picker>
					</el-form-item>
					<el-form-item label="会员账号:" prop="playerName">
						<el-input
							v-model="queryData.playerName"
							size="medium"
							placeholder="请输入"
							clearable
							style="width: 230px"
							maxlength="11"
						></el-input>
					</el-form-item>
					<el-form-item label="上级代理:" prop="parentProxyName">
						<el-input
							v-model="queryData.parentProxyName"
							size="medium"
							placeholder="请输入"
							clearable
							style="width: 230px"
							maxlength="11"
						></el-input>
					</el-form-item>
					<el-form-item label="账号类型:">
						<el-select
							v-model="queryData.accountTypeList"
							size="medium"
							placeholder="默认选择全部"
							clearable
							multiple
							style="width: 300px"
						>
							<el-option
								v-for="item in accountTypeArr"
								:key="item.code"
								:label="item.description"
								:value="item.code"
							></el-option>
						</el-select>
					</el-form-item>

					<el-form-item label="注单量:">
						<el-input
							v-model="queryData.betCountMin"
							size="medium"
							placeholder="最小数值"
							style="width: 116px"
							maxlength="10"
							name="betCountMin"
							oninput="value=value.replace(/[^\d]/g,'')"
							@blur="checkValue($event)"
						></el-input>
						-
						<el-input
							v-model="queryData.betCountMax"
							size="medium"
							placeholder="最大数值"
							style="width: 116px"
							maxlength="10"
							oninput="value=value.replace(/[^\d]/g,'')"
							name="betCountMax"
							@blur="checkValue($event)"
						></el-input>
					</el-form-item>
					<el-form-item label="投注金额:" class="numberBox">
						<el-input-number
							v-model="queryData.betAmountMin"
							size="medium"
							placeholder="最小数值"
							style="width: 108px"
							:min="0"
							:max="999999999999999"
							:precision="2"
							name="betAmountMin"
							@blur="checkValue($event)"
						></el-input-number>
						-
						<el-input-number
							v-model="queryData.betAmountMax"
							size="medium"
							placeholder="最大数值"
							style="width: 108px"
							:min="0"
							:max="999999999999999"
							:precision="2"
							name="betAmountMax"
							@blur="checkValue($event)"
						></el-input-number>
					</el-form-item>
					<el-form-item label="有效投注:" class="numberBox">
						<el-input-number
							v-model="queryData.validBetAmountMin"
							size="medium"
							placeholder="最小数值"
							style="width: 100px"
							:min="0"
							:max="999999999999999"
							:precision="2"
							name="validBetAmountMin"
							@blur="checkValue($event)"
						></el-input-number>
						-
						<el-input-number
							v-model="queryData.validBetAmountMax"
							size="medium"
							placeholder="最大数值"
							style="width: 100px"
							:min="0"
							:max="999999999999999"
							:precision="2"
							name="validBetAmountMax"
							@blur="checkValue($event)"
						></el-input-number>
					</el-form-item>
					<el-form-item label="投注盈亏:" class="numberBox">
						<el-input-number
							v-model="queryData.netAmountMin"
							size="medium"
							placeholder="最小数值"
							style="width: 100px"
							:min="-999999999999999"
							:max="999999999999999"
							:precision="2"
							name="netAmountMin"
							@blur="checkValue($event)"
						></el-input-number>
						-
						<el-input-number
							v-model="queryData.netAmountMax"
							size="medium"
							placeholder="最大数值"
							style="width: 100px"
							:min="-999999999999999"
							:max="999999999999999"
							:precision="2"
							name="netAmountMax"
							@blur="checkValue($event)"
						></el-input-number>
					</el-form-item>
					<el-form-item label="总存款:" class="numberBox">
						<el-input-number
							v-model="queryData.depositAmountMin"
							size="medium"
							placeholder="最小数值"
							style="width: 100px"
							:min="0"
							:max="999999999999999"
							:precision="2"
							name="depositAmountMin"
							@blur="checkValue($event)"
						></el-input-number>
						-
						<el-input-number
							v-model="queryData.depositAmountMax"
							size="medium"
							placeholder="最大数值"
							style="width: 100px"
							:min="0"
							:max="999999999999999"
							:precision="2"
							name="depositAmountMax"
							@blur="checkValue($event)"
						></el-input-number>
					</el-form-item>
					<el-form-item label="总取款:" class="numberBox">
						<el-input-number
							v-model="queryData.withdrawAmountMin"
							size="medium"
							placeholder="最小数值"
							style="width: 100px"
							:min="0"
							:max="999999999999999"
							:precision="2"
							name="withdrawAmountMin"
							@blur="checkValue($event)"
						></el-input-number>
						-
						<el-input-number
							v-model="queryData.withdrawAmountMax"
							size="medium"
							placeholder="最大数值"
							style="width: 100px"
							:min="0"
							:max="999999999999999"
							:precision="2"
							name="withdrawAmountMax"
							@blur="checkValue($event)"
						></el-input-number>
					</el-form-item>
					<el-form-item>
						<el-button
							type="primary"
							icon="el-icon-search"
							:disabled="flag"
							size="medium"
							@click="search"
						>
							{{ queryText }}
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
							v-if="hasPermission('349')"
							type="warning"
							icon="el-icon-folder-add"
							size="medium"
							:disabled="loading"
							@click="exportExcel"
						>
							导出
						</el-button>
						<el-button
							type="success"
							size="medium"
							:disabled="loading"
							@click="openSetting"
						>
							列设置
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
					show-summary
					:summary-method="getSummaries"
					:header-cell-style="getRowClass"
					@sort-change="_changeTableSort"
				>
					<el-table-column
						v-if="memberReport['会员账号']"
						prop="playerName"
						align="center"
						label="会员账号"
						width="120"
					>
						<template slot-scope="scope">
							<el-link
								class="lightBlueColor"
								type="primary"
								@click="dialogData(scope.row)"
							>
								{{ scope.row.playerName }}
							</el-link>
							<i
								class="el-icon-document-copy"
								@click="copy(scope.row.playerName)"
							/>
						</template>
					</el-table-column>
					<el-table-column
						v-if="memberReport['姓名']"
						prop="realName"
						align="center"
						label="姓名"
						width="110"
					>
						<template slot-scope="scope">
							<Copy
								v-if="!!scope.row.realName"
								:title="scope.row.realName"
								:copy="copy"
							>
								{{ scope.row.realName }}
							</Copy>
							<span v-else>-</span>
						</template>
					</el-table-column>
					<el-table-column
						v-if="memberReport['账号类型']"
						prop="accountType"
						align="center"
						label="账号类型"
						width="110"
					>
						<template slot-scope="scope">
							<span v-if="scope.row.accountType">
								{{ typeFilter(scope.row.accountType, 'accountType') }}
							</span>
							<span v-else>-</span>
						</template>
					</el-table-column>
					<el-table-column
						v-if="memberReport['上级代理']"
						prop="parentProxyName"
						align="center"
						label="上级代理"
						width="110"
					>
						<template slot-scope="scope">
							<Copy
								v-if="!!scope.row.parentProxyName"
								:title="scope.row.parentProxyName"
								:copy="copy"
							>
								{{ scope.row.parentProxyName }}
							</Copy>
							<span v-else>-</span>
						</template>
					</el-table-column>
					<el-table-column
						v-if="memberReport['VIP等级']"
						prop="vipSerialNum"
						align="center"
						label="VIP等级"
						sortable="custom"
						width="110"
					>
						<template slot-scope="scope">
							{{ scope.row.vipSerialNum }}
						</template>
					</el-table-column>
					<el-table-column
						v-if="memberReport['账号状态']"
						prop="accountStatus"
						align="center"
						label="账号状态"
						width="110"
					>
						<template slot-scope="scope">
							<span
								v-if="
									!!scope.row.accountStatus && scope.row.accountStatus * 1 === 2
								"
								class="yellowColor"
							>
								{{ typeFilter(scope.row.accountStatus, 'accountStatusType') }}
							</span>
							<span
								v-else-if="
									!!scope.row.accountStatus && scope.row.accountStatus * 1 === 4
								"
								class="disableColor"
							>
								{{ typeFilter(scope.row.accountStatus, 'accountStatusType') }}
							</span>
							<span v-else-if="!!scope.row.accountStatus">
								{{ typeFilter(scope.row.accountStatus, 'accountStatusType') }}
							</span>
							<span v-else>-</span>
						</template>
					</el-table-column>
					<el-table-column
						v-if="memberReport['会员标签']"
						prop="labelName"
						align="center"
						label="会员标签"
						width="100"
					>
						<template slot-scope="scope">
							<span v-if="!!scope.row.labelName">
								{{ scope.row.labelName }}
							</span>
							<span v-else>-</span>
						</template>
					</el-table-column>

					<el-table-column
						v-if="memberReport['风控层级']"
						prop="windControlName"
						align="center"
						label="风控层级"
						width="100"
					>
						<template slot-scope="scope">
							<span v-if="!!scope.row.windControlName">
								{{ scope.row.windControlName }}
							</span>
							<span v-else>-</span>
						</template>
					</el-table-column>
					<el-table-column
						v-if="memberReport['注册时间']"
						prop="registerAtStr"
						align="center"
						label="注册时间"
						sortable="custom"
						width="160"
					></el-table-column>
					<el-table-column
						v-if="memberReport['首存金额']"
						prop="firstDepositAmount"
						align="center"
						label="首存金额"
						sortable="custom"
						width="120"
					>
						<template slot-scope="scope">
							{{ scope.row.firstDepositAmount | filterDecimals }}
						</template>
					</el-table-column>
					<el-table-column
						v-if="memberReport['总存款']"
						prop="depositAmount"
						align="center"
						label="总存款"
						sortable="custom"
						width="160"
					>
						<template slot-scope="scope">
							{{ scope.row.depositAmount | filterDecimals }}
						</template>
					</el-table-column>
					<el-table-column
						v-if="memberReport['存款次数']"
						prop="depositTimes"
						align="center"
						label="存款次数"
						sortable="custom"
						width="100"
					>
						<template slot-scope="scope">
							{{ scope.row.depositTimes | filterDecimals }}
						</template>
					</el-table-column>
					<el-table-column
						v-if="memberReport['上级转入']"
						prop="proxyAssistDepositAmount"
						align="center"
						label="上级转入"
						sortable="custom"
						width="160"
					>
						<template slot="header">
							<span>上级转入</span>
							<el-tooltip class="item" effect="dark">
								<i
									class="el-icon-question"
									style="position: absolute; right: 10px"
								></i>
								<div slot="content">
									上级转入指代理额度代存和
									<br />
									佣金代存金额之和
								</div>
							</el-tooltip>
						</template>
						<template slot-scope="scope">
							{{ scope.row.proxyAssistDepositAmount | filterDecimals }}
						</template>
					</el-table-column>
					<el-table-column
						v-if="memberReport['转入次数']"
						prop="proxyAssistDepositTimes"
						align="center"
						label="转入次数"
						sortable="custom"
						width="100"
					></el-table-column>
					<el-table-column
						v-if="memberReport['转中心钱包']"
						prop="proxyTransferInnerAmount"
						align="center"
						label="转中心钱包"
						sortable="custom"
						width="160"
					>
						<template slot="header">
							<span>转中心钱包</span>
							<el-tooltip class="item" effect="dark">
								<i
									class="el-icon-question"
									style="position: absolute; right: 10px"
								></i>
								<div slot="content">
									转中心钱包指代理账号佣金
									<br />
									转回会员账号中心钱包金额之和
								</div>
							</el-tooltip>
						</template>
						<template slot-scope="scope">
							{{ scope.row.proxyTransferInnerAmount | filterDecimals }}
						</template>
					</el-table-column>
					<el-table-column
						v-if="memberReport['转回次数']"
						prop="proxyTransferInnerTimes"
						align="center"
						label="转回次数"
						sortable="custom"
						width="100"
					></el-table-column>
					<el-table-column
						v-if="memberReport['总取款']"
						prop="withdrawAmount"
						align="center"
						label="总取款"
						sortable="custom"
						width="160"
					>
						<template slot-scope="scope">
							{{ scope.row.withdrawAmount | filterDecimals }}
						</template>
					</el-table-column>
					<el-table-column
						v-if="memberReport['取款次数']"
						prop="withdrawTimes"
						align="center"
						label="取款次数"
						sortable="custom"
						width="100"
					></el-table-column>
					<el-table-column
						v-if="memberReport['大额取款次数']"
						prop="bigWithdrawTimes"
						align="center"
						label="大额取款次数"
						sortable="custom"
						width="120"
					></el-table-column>
					<el-table-column
						v-if="memberReport['存取差']"
						prop="depositWithdrawDifferAmount"
						align="center"
						label="存取差"
						sortable="custom"
						width="150"
					>
						<template slot-scope="scope">
							{{ scope.row.depositWithdrawDifferAmount | filterDecimals }}
						</template>
					</el-table-column>
					<el-table-column
						v-if="memberReport['总优惠']"
						prop="discountAmount"
						align="center"
						label="总优惠"
						sortable="custom"
						width="150"
					>
						<template slot-scope="scope">
							{{ scope.row.discountAmount | filterDecimals }}
						</template>
					</el-table-column>
					<el-table-column
						v-if="memberReport['总返水']"
						prop="returnWaterAmount"
						align="center"
						label="总返水"
						sortable="custom"
						width="150"
					>
						<template slot-scope="scope">
							{{ scope.row.returnWaterAmount | filterDecimals }}
						</template>
					</el-table-column>
					<el-table-column
						v-if="memberReport['其他调整']"
						prop="otherAdjustAmount"
						align="center"
						label="其他调整"
						sortable="custom"
						width="120"
					>
						<template slot-scope="scope">
							{{ scope.row.otherAdjustAmount | filterDecimals }}
						</template>
					</el-table-column>
					<el-table-column
						v-if="memberReport['注单量']"
						prop="betCount"
						align="center"
						label="注单量"
						sortable="custom"
						width="110"
					></el-table-column>
					<el-table-column
						v-if="memberReport['投注金额']"
						prop="betAmount"
						align="center"
						label="投注金额"
						sortable="custom"
						width="160"
					>
						<template slot-scope="scope">
							{{ scope.row.betAmount | filterDecimals }}
						</template>
					</el-table-column>
					<el-table-column
						v-if="memberReport['有效投注']"
						prop="validBetAmount"
						align="center"
						label="有效投注"
						sortable="custom"
						width="160"
					>
						<template slot-scope="scope">
							{{ scope.row.validBetAmount | filterDecimals }}
						</template>
					</el-table-column>
					<el-table-column
						v-if="memberReport['投注盈亏']"
						prop="netAmount"
						align="center"
						label="投注盈亏"
						sortable="custom"
						width="160"
					>
						<template slot="header">
							<span>投注盈亏</span>
							<el-tooltip class="item" effect="dark">
								<i
									class="el-icon-question"
									style="position: absolute; right: 10px"
								></i>
								<div slot="content">
									盈亏金额指游戏输赢金额
									<br />
									负数表示会员输
								</div>
							</el-tooltip>
						</template>
						<template slot-scope="scope">
							<span v-if="scope.row.netAmount > 0" class="enableColor">
								{{ scope.row.netAmount | filterDecimals }}
							</span>
							<span v-else-if="scope.row.netAmount < 0" class="redColor">
								{{ scope.row.netAmount | filterDecimals }}
							</span>
							<span v-else-if="scope.row.netAmount === 0">
								{{ scope.row.netAmount | filterDecimals }}
							</span>
							<span v-else>-</span>
						</template>
					</el-table-column>
					<el-table-column
						v-if="memberReport['转代次数']"
						prop="transferNum"
						align="center"
						label="转代次数"
						sortable="custom"
						width="100"
					></el-table-column>
					<el-table-column
						v-if="memberReport['中心钱包余额']"
						prop="centerWalletBalance"
						align="center"
						label="中心钱包余额"
						sortable="custom"
						width="160"
					>
						<template slot-scope="scope">
							{{ scope.row.centerWalletBalance | filterDecimals }}
						</template>
					</el-table-column>
					<el-table-column
						v-if="memberReport['钱包总余额']"
						prop="totalWalletBalance"
						align="center"
						label="钱包总余额"
						sortable="custom"
						width="160"
					>
						<template slot-scope="scope">
							{{ scope.row.totalWalletBalance | filterDecimals }}
						</template>
					</el-table-column>
				</el-table>
				<!-- 分页 -->
				<el-pagination
					v-show="!!total"
					class="pageValue"
					:current-page.sync="pageNum"
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
			:visible.sync="tableVisible"
			:destroy-on-close="true"
			class="rempadding"
		>
			<div slot="title" class="dialog-title">
				<span class="title-text" style="margin-right: 15px">
					会员账号:{{ playerName }}
				</span>
			</div>
			<el-table
				v-loading="loadingDialog"
				size="mini"
				border
				class="small-size-table"
				:data="memberDetails"
				style="margin-bottom: 15px"
				:header-cell-style="getRowClass"
				:span-method="objectSpanMethod"
			>
				<el-table-column
					prop="staticDate"
					align="center"
					label="日期"
				></el-table-column>
				<el-table-column
					prop="parentProxyName"
					align="center"
					label="上级代理"
				></el-table-column>
				<el-table-column prop="depositAmount" align="center" label="总存款">
					<template slot-scope="scope">
						{{ scope.row.depositAmount | filterDecimals }}
					</template>
				</el-table-column>
				<el-table-column prop="withdrawAmount" align="center" label="总取款">
					<template slot-scope="scope">
						{{ scope.row.withdrawAmount | filterDecimals }}
					</template>
				</el-table-column>
				<el-table-column prop="discountAmount" align="center" label="总优惠">
					<template slot-scope="scope">
						{{ scope.row.discountAmount | filterDecimals }}
					</template>
				</el-table-column>
				<el-table-column prop="returnWaterAmount" align="center" label="总返水">
					<template slot-scope="scope">
						{{ scope.row.returnWaterAmount | filterDecimals }}
					</template>
				</el-table-column>
				<el-table-column
					prop="otherAdjustAmount"
					align="center"
					label="其他调整"
				>
					<template slot-scope="scope">
						{{ scope.row.otherAdjustAmount | filterDecimals }}
					</template>
				</el-table-column>
				<el-table-column
					prop="betCount"
					align="center"
					label="注单量"
				></el-table-column>
				<el-table-column prop="betAmount" align="center" label="投注金额">
					<template slot-scope="scope">
						{{ scope.row.betAmount | filterDecimals }}
					</template>
				</el-table-column>
				<el-table-column prop="validBetAmount" align="center" label="有效投注">
					<template slot-scope="scope">
						{{ scope.row.validBetAmount | filterDecimals }}
					</template>
				</el-table-column>
				<el-table-column prop="netAmount" align="center" label="投注盈亏">
					<template slot-scope="scope">
						<span v-if="scope.row.netAmount > 0" class="enableColor">
							{{ scope.row.netAmount | filterDecimals }}
						</span>
						<span v-else-if="scope.row.netAmount < 0" class="redColor">
							{{ scope.row.netAmount | filterDecimals }}
						</span>
						<span v-else-if="scope.row.netAmount === 0">
							{{ scope.row.netAmount | filterDecimals }}
						</span>
						<span v-else>-</span>
					</template>
				</el-table-column>
			</el-table>
			<!-- 分页 -->
			<el-pagination
				:current-page.sync="pageR"
				background
				class="fenye"
				layout="total, sizes,prev, pager, next, jumper"
				:page-size="sizeR"
				:page-sizes="[10, 20, 50]"
				:total="dialogTotal"
				@current-change="handleCurrentChangeDialog"
				@size-change="handleSizeChangeDialog"
			></el-pagination>
			<div slot="footer" class="dialog-footer" style="text-align: center">
				<el-button @click="tableVisible = false">关闭</el-button>
			</div>
		</el-dialog>
		<el-dialog
			title="列设置"
			center
			:visible.sync="visible"
			width="500px"
			class="col-setting"
		>
			<div>
				<el-link type="primary" @click="clickDel">复原缺省</el-link>
			</div>
			<div
				v-for="(value, name) in memberReport"
				:key="name"
				class="setting-div"
			>
				<el-checkbox v-if="newList.length > 0" v-model="newList[0][name]">
					{{ name }}
				</el-checkbox>
			</div>
			<div slot="footer" class="dialog-footer">
				<el-button @click="visible = false">取 消</el-button>
				<el-button type="primary" @click="confirm">确定</el-button>
			</div>
		</el-dialog>
	</div>
</template>

<script>
import list from '@/mixins/list'
import dayjs from 'dayjs'
const startTime = new Date().getTime() - 3600 * 1000 * 24 * 30
const endTime = dayjs()
	.endOf('day')
	.valueOf()
export default {
	filters: {
		filterDecimals: function(val) {
			if (typeof val === 'number') {
				const newVal = (Math.floor(val * 1000) / 1000).toFixed(2)
				return newVal
			} else {
				return '-'
			}
		}
	},
	mixins: [list],
	data() {
		return {
			queryData: {},
			registerTime: [],
			statisticsTime: [startTime, endTime],
			day92: 91 * 24 * 3600 * 1000,
			// 日期使用
			timeControl: {
				onPick: ({ maxDate, minDate }) => {
					console.log(maxDate, minDate)
					if (maxDate - minDate > this.day92) {
						this.flag = true
						this.$message.warning('请缩小搜索范围至92天')
					}
					if (
						maxDate !== null &&
						minDate !== null &&
						maxDate - minDate <= this.day92 &&
						this.queryText === '查询'
					) {
						this.flag = false
					} else {
						this.flag = true
					}
				},
				disabledDate: (time) => {
					return time.getTime() > Date.now()
				}
			},
			memberReport: {
				会员账号: true,
				姓名: true,
				账号类型: true,
				上级代理: true,
				VIP等级: true,
				账号状态: true,
				会员标签: true,
				风控层级: true,
				注册时间: true,
				首存金额: true,
				总存款: true,
				存款次数: true,
				上级转入: true,
				转入次数: true,
				转中心钱包: true,
				转回次数: true,
				总取款: true,
				取款次数: true,
				大额取款次数: true,
				存取差: true,
				总优惠: true,
				总返水: true,
				其他调整: true,
				注单量: true,
				投注金额: true,
				有效投注: true,
				投注盈亏: true,
				转代次数: true,
				中心钱包余额: true,
				钱包总余额: true
			},
			queryText: '查询',
			flag: false,
			tableVisible: false,
			loadingDialog: false,
			visible: false,
			newList: [],
			playerName: '',
			dataList: [],
			userLabel: [],
			memberDetails: [],
			playerId: '',
			pageR: 1,
			sizeR: 10,
			dialogTotal: 0,
			summary: null,
			myName: '',
			spanArr: []
		}
	},
	computed: {
		accountTypeArr() {
			const arr = this.globalDics.accountType
			const newArr = []
			for (let i = 0; i < arr.length; i++) {
				const ele = arr[i]
				if (ele.code !== '1' && ele.code !== '4') {
					newArr.push(ele)
				}
			}
			return newArr
		}
	},
	created() {},
	mounted() {
		this.myName = localStorage.getItem('username')
		this.initDB()
	},
	methods: {
		clearOutS(val) {
			if (val === null) {
				this.flag = false
			}
		},
		clearOutR(val) {
			if (val === null) {
				this.flag = false
			}
		},
		// 列设置
		openSetting() {
			this.getList()
			this.visible = true
		},
		initDB() {
			const request = indexedDB.open('memberReport')
			request.onupgradeneeded = (event) => {
				const db = event.target.result
				this.db = db
				// 建表 名为person,主键为id
				db.createObjectStore('memberReport', {
					keyPath: 'id',
					autoIncrement: true
				})
			}

			request.onsuccess = (event) => {
				this.db = event.target.result
				console.log('数据库打开/创建成功', event)
				this.clickAdd()
				this.getList()
			}
		},
		clickAdd() {
			const request = this.db
				.transaction(['memberReport'], 'readwrite')
				.objectStore('memberReport')
				.add({
					id: this.myName,
					obj: this.memberReport
				})
			request.onsuccess = (event) => {
				this.getList()
			}
		},
		getList() {
			this.newList = []
			var transaction = this.db.transaction(['memberReport'])
			const objectStore = transaction.objectStore('memberReport')
			const list = []
			objectStore.openCursor().onsuccess = (event) => {
				const cursor = event.target.result
				if (cursor) {
					list.push(cursor.value)
					cursor.continue()
				} else {
					for (let i = 0; i < list.length; i++) {
						const ele = list[i]
						if (ele.id === this.myName) {
							this.newList.push(ele.obj)
							this.memberReport = { ...ele.obj }
						}
					}
				}
			}
		},
		confirm() {
			const request = this.db
				.transaction(['memberReport'], 'readwrite')
				.objectStore('memberReport')
				.put({
					id: this.myName,
					obj: this.newList[0]
				})
			request.onsuccess = (event) => {
				this.visible = false
				this.getList()
				console.log('数据更新成功')
			}

			request.onerror = (event) => {
				console.log('数据更新失败')
			}
		},
		clickDel(id) {
			this.newList = []
			this.newList.push({
				会员账号: true,
				姓名: true,
				账号类型: true,
				上级代理: true,
				VIP等级: true,
				账号状态: true,
				会员标签: true,
				风控层级: true,
				注册时间: true,
				首存金额: true,
				总存款: true,
				存款次数: true,
				上级转入: true,
				转入次数: true,
				转中心钱包: true,
				转回次数: true,
				总取款: true,
				取款次数: true,
				大额取款次数: true,
				存取差: true,
				总优惠: true,
				总返水: true,
				其他调整: true,
				注单量: true,
				投注金额: true,
				有效投注: true,
				投注盈亏: true,
				转代次数: true,
				中心钱包余额: true,
				钱包总余额: true
			})
		},
		loadData() {
			const register = this.registerTime || []
			const [start, end] = register
			const statistics = this.statisticsTime || []
			const [startTime, endTime] = statistics
			let params = {
				...this.queryData,
				registerStartTime: start
					? dayjs(start).format('YYYY-MM-DD')
					: undefined,
				registerEndTime: end ? dayjs(end).format('YYYY-MM-DD') : undefined,
				startTime: startTime
					? dayjs(startTime).format('YYYY-MM-DD')
					: undefined,
				endTime: endTime ? dayjs(endTime).format('YYYY-MM-DD') : undefined
			}
			params = {
				...this.getParams(params)
			}

			this.loading = true
			this.$api
				.getReportPlayerReportLlistPage(params)
				.then((res) => {
					if (res.code === 200 && res.data !== null) {
						this.loading = false
						this.dataList = res.data.record || []
						this.total = res.data.totalRecord
					} else {
						this.dataList = []
						this.total = 0
						this.loading = false
					}
				})
				.catch(() => (this.loading = false))
			this.$api
				.getReportPlayerReportSummary(params)
				.then((res) => {
					if (res.code === 200) {
						this.loading = false
						this.summary = res.data
						console.log(res)
					}
				})
				.catch(() => (this.loading = false))
		},
		search() {
			const register = this.registerTime || []
			const [start, end] = register
			const statistics = this.statisticsTime || []
			const [startTime, endTime] = statistics
			console.log(register)

			if (endTime - startTime > this.day92 || end - start > this.day92) {
				this.flag = true
				let text = '请缩小搜索范围至92天'
				if (endTime - startTime > this.day92) {
					text = '请缩小统计日期搜索范围至92天'
				} else if (end - start > this.day92) {
					text = '请缩小注册日期搜索范围至92天'
				}
				this.$message.warning(text)
			} else {
				this.flag = true
				let t = 10
				const timecount = setInterval(() => {
					t--
					this.queryText = t + 's'
					if (t < 0) {
						clearInterval(timecount)
						this.queryText = '查询'
						this.flag = false
					}
				}, 1000)
				this.loadData()
			}
		},

		dialogData(val) {
			this.playerName = val.playerName
			this.pageR = 1
			this.sizeR = 10
			this.playerId = val.playerId
			this.getReportPlayerReportDetailListPage(val.playerId)
			this.tableVisible = true
		},
		getReportPlayerReportDetailListPage(val) {
			this.loadingDialog = true
			const statistics = this.statisticsTime || []
			const [startTime, endTime] = statistics
			const params = {
				pageNum: this.pageR,
				pageSize: this.sizeR,
				playerId: val,
				startTime: startTime
					? dayjs(startTime).format('YYYY-MM-DD')
					: undefined,
				endTime: endTime ? dayjs(endTime).format('YYYY-MM-DD') : undefined
			}
			this.$api
				.getReportPlayerReportDetailListPage(params)
				.then((res) => {
					if (res.code === 200) {
						console.log(res)
						this.memberDetails = res.data.records
						this.dialogTotal = res.data.total

						this.setdates(this.memberDetails)
					}
					this.loadingDialog = false
				})
				.catch(() => {
					this.loadingDialog = false
				})
		},
		setdates(val) {
			const obj = {}
			let k = ''
			for (let i = 0; i < val.length; i++) {
				k = val[i].staticDate
				console.log(k)
				if (obj[k]) {
					obj[k]++
				} else {
					obj[k] = 1
				}
			}
			// 保存结果{el-'元素'，count-出现次数}
			for (const o in obj) {
				for (let i = 0; i < obj[o]; i++) {
					if (i === 0) {
						this.spanArr.push(obj[o])
					} else {
						this.spanArr.push(0)
					}
				}
			}
		},
		objectSpanMethod({ row, column, rowIndex, columnIndex }) {
			if (columnIndex === 0) {
				if (this.spanArr[rowIndex]) {
					return {
						rowspan: this.spanArr[rowIndex],
						colspan: 1
					}
				} else {
					return {
						rowspan: 0,
						colspan: 0
					}
				}
			}
		},
		filterDecimals: function(val) {
			if (typeof val === 'number') {
				const newVal = (Math.floor(val * 1000) / 1000).toFixed(2)
				return newVal
			} else {
				return '-'
			}
		},
		getSummaries(param) {
			const { columns, data } = param
			const sums = []
			columns.forEach((column, index) => {
				if (index === 0) {
					const el = (
						<div class='count_row'>
							<p>本页合计</p>
							<p>全部合计</p>
						</div>
					)
					sums[index] = el
					return
				} else if (index >= 9 && this.summary !== null) {
					const values = data.map((item) => Number(item[column.property]))
					if (!values.every((value) => isNaN(value))) {
						sums[index] = values.reduce((prev, curr) => {
							const value = Number(curr)
							if (!isNaN(value)) {
								return prev + curr
							} else {
								return prev
							}
						}, 0)
						const num = sums[index]
						switch (index) {
							case 9:
								sums[index] = (
									<div class='count_row'>
										<p>{this.filterDecimals(num)}</p>
										<p>
											{this.filterDecimals(this.summary.firstDepositAmount)}
										</p>
									</div>
								)
								break
							case 10:
								sums[index] = (
									<div class='count_row'>
										<p>{this.filterDecimals(num)}</p>
										<p>{this.filterDecimals(this.summary.depositAmount)}</p>
									</div>
								)
								break

							case 11:
								sums[index] = (
									<div class='count_row'>
										<p>{num}</p>
										<p>{this.summary.depositTimes}</p>
									</div>
								)
								break
							case 12:
								sums[index] = (
									<div class='count_row'>
										<p>{this.filterDecimals(num)}</p>
										<p>
											{this.filterDecimals(
												this.summary.proxyAssistDepositAmount
											)}
										</p>
									</div>
								)
								break
							case 13:
								sums[index] = (
									<div class='count_row'>
										<p>{num}</p>
										<p>{this.summary.proxyAssistDepositTimes}</p>
									</div>
								)
								break
							case 14:
								sums[index] = (
									<div class='count_row'>
										<p>{this.filterDecimals(num)}</p>
										<p>
											{this.filterDecimals(
												this.summary.proxyTransferInnerAmount
											)}
										</p>
									</div>
								)
								break
							case 15:
								sums[index] = (
									<div class='count_row'>
										<p>{num}</p>
										<p>{this.summary.proxyTransferInnerTimes}</p>
									</div>
								)
								break
							case 16:
								sums[index] = (
									<div class='count_row'>
										<p>{this.filterDecimals(num)}</p>
										<p>{this.filterDecimals(this.summary.withdrawAmount)}</p>
									</div>
								)
								break
							case 17:
								sums[index] = (
									<div class='count_row'>
										<p>{num}</p>
										<p>{this.summary.withdrawTimes}</p>
									</div>
								)
								break
							case 18:
								sums[index] = (
									<div class='count_row'>
										<p>{num}</p>
										<p>{this.summary.bigWithdrawTimes}</p>
									</div>
								)
								break
							case 19:
								sums[index] = (
									<div class='count_row'>
										<p>{this.filterDecimals(num)}</p>
										<p>
											{this.filterDecimals(
												this.summary.depositWithdrawDifferAmount
											)}
										</p>
									</div>
								)
								break
							case 20:
								sums[index] = (
									<div class='count_row'>
										<p>{this.filterDecimals(num)}</p>
										<p>{this.filterDecimals(this.summary.discountAmount)}</p>
									</div>
								)
								break
							case 21:
								sums[index] = (
									<div class='count_row'>
										<p>{this.filterDecimals(num)}</p>
										<p>{this.filterDecimals(this.summary.returnWaterAmount)}</p>
									</div>
								)
								break
							case 22:
								sums[index] = (
									<div class='count_row'>
										<p>{this.filterDecimals(num)}</p>
										<p>{this.filterDecimals(this.summary.otherAdjustAmount)}</p>
									</div>
								)
								break
							case 23:
								sums[index] = (
									<div class='count_row'>
										<p>{num}</p>
										<p>{this.summary.betCount}</p>
									</div>
								)
								break
							case 24:
								sums[index] = (
									<div class='count_row'>
										<p>{this.filterDecimals(num)}</p>
										<p>{this.filterDecimals(this.summary.betAmount)}</p>
									</div>
								)
								break
							case 25:
								sums[index] = (
									<div class='count_row'>
										<p>{this.filterDecimals(num)}</p>
										<p>{this.filterDecimals(this.summary.validBetAmount)}</p>
									</div>
								)
								break
							case 26:
								sums[index] = (
									<div class='count_row'>
										{num > 0 ? (
											<p class='enableColor'>{this.filterDecimals(num)}</p>
										) : num < 0 ? (
											<p class='redColor'>{this.filterDecimals(num)}</p>
										) : (
											<p>{this.filterDecimals(num)}</p>
										)}
										{this.summary.netAmount > 0 ? (
											<p class='enableColor'>
												{this.filterDecimals(this.summary.netAmount)}
											</p>
										) : this.summary.netAmount === 0 ? (
											<p>{this.filterDecimals(this.summary.netAmount)}</p>
										) : (
											<p class='redColor'>
												{this.filterDecimals(this.summary.netAmount)}
											</p>
										)}
									</div>
								)
								break
							case 27:
								sums[index] = (
									<div class='count_row'>
										<p>{num}</p>
										<p>{this.summary.transferNum}</p>
									</div>
								)
								break
							case 28:
								sums[index] = (
									<div class='count_row'>
										<p>{this.filterDecimals(num)}</p>
										<p>
											{this.filterDecimals(this.summary.centerWalletBalance)}
										</p>
									</div>
								)
								break
							case 29:
								sums[index] = (
									<div class='count_row'>
										<p>{this.filterDecimals(num)}</p>
										<p>
											{this.filterDecimals(this.summary.totalWalletBalance)}
										</p>
									</div>
								)
								break
						}
					} else {
						sums[index] = ''
					}
				}
			})

			return sums
		},
		reset() {
			this.pageNum = 1
			this.queryData = {}
			this.registerTime = []
			this.statisticsTime = [startTime, endTime]
			this.$refs['form'].resetFields()
			this.search()
		},
		_changeTableSort({ column, prop, order }) {
			const arr = {
				registerAtStr: 1,
				firstDepositAmount: 2,
				depositAmount: 3,
				depositTimes: 4,
				proxyAssistDepositAmount: 5,
				proxyAssistDepositTimes: 6,
				proxyTransferInnerAmount: 7,
				proxyTransferInnerTimes: 8,
				withdrawAmount: 9,
				withdrawTimes: 10,
				bigWithdrawTimes: 11,
				depositWithdrawDifferAmount: 12,
				discountAmount: 13,
				returnWaterAmount: 14,
				otherAdjustAmount: 15,
				betCount: 16,
				betAmount: 17,
				validBetAmount: 18,
				netAmount: 19,
				transferNum: 20
			}
			this.queryData.orderKey = arr[prop]
			// switch (prop) {
			// 	case 'betCount':
			// 		prop = 1
			// 		break
			// 	case 'betAmount':
			// 		prop = 2
			// 		break
			// 	case 'validBetAmount':
			// 		prop = 3
			// 		break
			// 	case 'netAmount':
			// 		prop = 4
			// 		break
			// 	case 'netAmount':
			// 		prop = 5
			// 		break
			// 	case 'netAmount':
			// 		prop = 6
			// 		break
			// 	case 'netAmount':
			// 		prop = 7
			// 		break
			// 	case 'netAmount':
			// 		prop = 8
			// 		break
			// 	case 'netAmount':
			// 		prop = 9
			// 		break
			// 	case 'netAmount':
			// 		prop = 10
			// 		break
			// 	case 'netAmount':
			// 		prop = 11
			// 		break
			// 	case 'netAmount':
			// 		prop = 12
			// 		break
			// 	case 'netAmount':
			// 		prop = 13
			// 		break
			// 	case 'netAmount':
			// 		prop = 14
			// 		break
			// 	case 'netAmount':
			// 		prop = 15
			// 		break
			// 	case 'netAmount':
			// 		prop = 16
			// 		break
			// 	case 'netAmount':
			// 		prop = 17
			// 		break
			// 	case 'netAmount':
			// 		prop = 18
			// 		break
			// 	case 'netAmount':
			// 		prop = 19
			// 		break
			// 	case 'netAmount':
			// 		prop = 20
			// 		break
			// }
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
		handleCurrentChangeDialog(val) {
			console.log(111, val)
			this.pageR = val
			this.getReportPlayerReportDetailListPage(this.playerId)
		},
		handleSizeChangeDialog(val) {
			console.log(222, val)
			this.sizeR = val
			this.getReportPlayerReportDetailListPage(this.playerId)
		},
		checkValue(e) {
			const { name, value } = e.target
			console.log(value)
			switch (name) {
				case 'betCountMin':
					if (
						!!this.queryData.betCountMax &&
						value &&
						value * 1 > this.queryData.betCountMax * 1
					) {
						this.$message({
							type: 'warning',
							message: `注单量最小值不能大于最大值`
						})
						this.queryData.betCountMin = ''
					} else {
						this.queryData.betCountMin = value
					}
					break
				case 'betCountMax':
					if (
						!!this.queryData.betCountMin &&
						value &&
						value * 1 < this.queryData.betCountMin * 1
					) {
						this.$message({
							type: 'warning',
							message: `注单量最大值不能小于最小值`
						})
						this.queryData.betCountMax = ''
					} else {
						this.queryData.betCountMax = value
					}
					break
				case 'betAmountMin':
					if (
						!!this.queryData.betAmountMax &&
						value &&
						value * 1 > this.queryData.betAmountMax * 1
					) {
						this.$message({
							type: 'warning',
							message: `投注金额最小值不能大于最大值`
						})
						this.queryData.betAmountMin = undefined
					} else if (value !== '' && value * 1 > 0) {
						console.log('6465456464', value * 1)
						this.queryData.betAmountMin = value
					} else {
						this.queryData.betAmountMin = undefined
					}
					break
				case 'betAmountMax':
					if (
						!!this.queryData.betAmountMin &&
						value &&
						value * 1 < this.queryData.betAmountMin * 1
					) {
						this.$message({
							type: 'warning',
							message: `投注金额最大值不能小于最小值`
						})
						this.queryData.betAmountMax = undefined
					} else if (value !== '' && value * 1 > 0) {
						this.queryData.betAmountMax = value
					} else {
						this.queryData.betAmountMax = undefined
					}
					break

				case 'validBetAmountMin':
					if (
						!!this.queryData.validBetAmountMax &&
						value &&
						value * 1 > this.queryData.validBetAmountMax * 1
					) {
						this.$message({
							type: 'warning',
							message: `有效投注最小值不能大于最大值`
						})
						this.queryData.validBetAmountMin = undefined
					} else if (value !== '' && value * 1 > 0) {
						this.queryData.validBetAmountMin = value
					} else {
						this.queryData.validBetAmountMin = undefined
					}
					break
				case 'validBetAmountMax':
					if (
						!!this.queryData.validBetAmountMin &&
						value &&
						value * 1 < this.queryData.validBetAmountMin * 1
					) {
						this.$message({
							type: 'warning',
							message: `有效投注最大值不能小于最小值`
						})
						this.queryData.validBetAmountMax = undefined
					} else if (value !== '' && value * 1 > 0) {
						this.queryData.validBetAmountMax = value
					} else {
						this.queryData.validBetAmountMax = undefined
					}
					break
				case 'netAmountMin':
					if (
						!!this.queryData.netAmountMax &&
						value &&
						value * 1 > this.queryData.netAmountMax * 1
					) {
						this.$message({
							type: 'warning',
							message: `投注盈亏最小值不能大于最大值`
						})
						this.queryData.netAmountMin = undefined
					} else if (value !== '') {
						this.queryData.netAmountMin = value
					} else {
						this.queryData.netAmountMin = undefined
					}
					break
				case 'netAmountMax':
					if (
						!!this.queryData.netAmountMin &&
						value &&
						value * 1 < this.queryData.netAmountMin * 1
					) {
						this.$message({
							type: 'warning',
							message: `投注盈亏最大值不能小于最小值`
						})
						this.queryData.netAmountMax = undefined
					} else if (value !== '') {
						this.queryData.netAmountMax = value
					} else {
						this.queryData.netAmountMax = undefined
					}
					break
				case 'depositAmountMin':
					if (
						!!this.queryData.depositAmountMax &&
						value &&
						value * 1 > this.queryData.depositAmountMax * 1
					) {
						this.$message({
							type: 'warning',
							message: `总存款最小值不能大于最大值`
						})
						this.queryData.depositAmountMin = undefined
					} else if (value !== '') {
						this.queryData.depositAmountMin = value
					} else {
						this.queryData.depositAmountMin = undefined
					}
					break
				case 'depositAmountMax':
					if (
						!!this.queryData.depositAmountMin &&
						value &&
						value * 1 < this.queryData.depositAmountMin * 1
					) {
						this.$message({
							type: 'warning',
							message: `总存款最大值不能小于最小值`
						})
						this.queryData.depositAmountMax = undefined
					} else if (value !== '') {
						this.queryData.depositAmountMax = value
					} else {
						this.queryData.depositAmountMax = undefined
					}
					break
				case 'withdrawAmountMin':
					if (
						!!this.queryData.withdrawAmountMax &&
						value &&
						value * 1 > this.queryData.withdrawAmountMax * 1
					) {
						this.$message({
							type: 'warning',
							message: `总取款最小值不能大于最大值`
						})
						this.queryData.withdrawAmountMin = undefined
					} else if (value !== '') {
						this.queryData.withdrawAmountMin = value
					} else {
						this.queryData.withdrawAmountMin = undefined
					}
					break
				case 'withdrawAmountMax':
					if (
						!!this.queryData.withdrawAmountMin &&
						value &&
						value * 1 < this.queryData.withdrawAmountMin * 1
					) {
						this.$message({
							type: 'warning',
							message: `总取款最大值不能小于最小值`
						})
						this.queryData.withdrawAmountMax = undefined
					} else if (value !== '') {
						this.queryData.withdrawAmountMax = value
					} else {
						this.queryData.withdrawAmountMax = undefined
					}
					break
			}
		},
		exportExcel() {
			this.loading = true
			//   const register = this.registerTime || []
			//   const [start, end] = register
			const statistics = this.statisticsTime || []
			const [startTime, endTime] = statistics
			let params = {
				...this.queryData,
				startTime: startTime ? dayjs(startTime).format('YYYY-MM-DD') : '',
				endTime: endTime ? dayjs(endTime).format('YYYY-MM-DD') : ''
			}
			params = {
				...this.getParams(params)
			}
			this.$confirm(
				`<strong>是否导出?</strong></br><span style='font-size:12px;color:#c1c1c1'>数据过大时，请耐心等待</span>`,
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
						.getGameRecordDownload(params)
						.then((res) => {
							this.loading = false
							const { data, status } = res
							if (res && status === 200) {
								const { type } = data
								if (type.includes('application/json')) {
									const reader = new FileReader()
									reader.onload = (evt) => {
										if (evt.target.readyState === 2) {
											const {
												target: { result }
											} = evt
											const ret = JSON.parse(result)
											if (ret.code !== 200) {
												this.$message({
													type: 'error',
													message: ret.msg,
													duration: 1500
												})
											}
										}
									}
									reader.readAsText(data)
								} else {
									const result = res.data
									const disposition = res.headers['content-disposition']
									const fileNames = disposition && disposition.split("''")
									let fileName = fileNames[1]
									fileName = decodeURIComponent(fileName)
									const blob = new Blob([result], {
										type: 'application/octet-stream'
									})
									if ('download' in document.createElement('a')) {
										const downloadLink = document.createElement('a')
										downloadLink.download = fileName || ''
										downloadLink.style.display = 'none'
										downloadLink.href = URL.createObjectURL(blob)
										document.body.appendChild(downloadLink)
										downloadLink.click()
										URL.revokeObjectURL(downloadLink.href)
										document.body.removeChild(downloadLink)
									} else {
										window.navigator.msSaveBlob(blob, fileName)
									}
									this.$message({
										type: 'success',
										message: '导出成功',
										duration: 1500
									})
								}
							}
						})
						.catch(() => {
							this.loading = false
							this.$message({
								type: 'error',
								message: '导出失败',
								duration: 1500
							})
						})
				})
				.catch(() => {})
		}
	}
}
</script>

<style lang="scss" scoped>
/deep/.el-dialog__header {
	color: #909399;
	font-weight: 700;
}
.numberBox /deep/.el-input-number__decrease,
.numberBox /deep/.el-input-number__increase {
	display: none;
}
.numberBox /deep/.el-input__inner {
	padding: 0 15px;
	text-align: left;
}
/deep/ .el-table__footer-wrapper .cell::after {
	border: 1px solid #ebeef5;
	content: '';
	position: absolute;
	top: 41px;
	left: 0;
	width: 100%;
}

/deep/ .el-table__fixed-footer-wrapper tr::after {
	border: 1px solid #ebeef5;
	content: '';
	position: absolute;
	top: 41px;
	left: 0;
	width: 100%;
}
.count_row {
	height: 80px;
	color: #5c5c5c;
	p {
		height: 40px;
		line-height: 40px;
		font-weight: 700;
		span {
			display: inline-block;
			width: 20px;
			height: 20px;
		}
	}
}
.fenye {
	text-align: center;
}
.setting-div {
	display: inline-block;
	min-width: 110px;
}
</style>
