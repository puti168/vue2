<template>
  <div class="review-content">
    <div class="head">
      <span class="title">佣金审核详情</span>
      <el-button class="right-btn" plain @click="goBack">返回</el-button>
    </div>
    <div class="main-content">
      <div class="review-content">
        <p class="name">代理注册信息</p>
        <div class="review-flex">
          <el-table
            border
            size="mini"
            :data="[1]"
            style="width: 100%"
            :header-cell-style="getRowClass"
          >
            <el-table-column align="center" label="注册时间">
              <template>
                   {{ registerVo.createDt ? registerVo.createDt : '-' }}
              </template>
            </el-table-column>
            <el-table-column align="center" label="最后登录时间">
              <template>
               {{ registerVo.lastLoginTime ? registerVo.lastLoginTime : '-' }}
              </template>
            </el-table-column>
            <el-table-column align="center" label="注册端">
              <template>
                {{
									registerVo.deviceType
										? typeFilter(registerVo.deviceType, 'deviceType')
										: '-'
								}}
              </template>
            </el-table-column>
            <el-table-column align="center" label="注册IP">
              <template>
                {{ registerVo.registerIp ? registerVo.registerIp : '-' }}
              </template>
            </el-table-column>
            <el-table-column align="center" label="注册端设备编号">
              <template>
                {{ registerVo.deviceNo ? registerVo.deviceNo : '-' }}
              </template>
            </el-table-column>
            <el-table-column align="center" label="账号类型">
              <template>
               {{
									registerVo.accountType
										? typeFilter(registerVo.accountType, 'accountType')
										: '-'
								}}
              </template>
            </el-table-column>
            <el-table-column align="center" label="注册域名">
              <template>
               {{
									registerVo.registerReference
										? registerVo.registerReference
										: '-'
								}}
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
      <div class="review-content">
        <p class="name">代理账号信息</p>
        <div class="review-flex">
          <el-table
            border
            size="mini"
            :data="[1]"
            style="width: 100%"
            :header-cell-style="getRowClass"
          >
            <el-table-column align="center" label="代理账号">
              <template>
                {{ accountsVo.userName ? accountsVo.userName : '-' }}
              </template>
            </el-table-column>
            <el-table-column align="center" label="代理姓名">
              <template>
                  {{ accountsVo.realName ? accountsVo.realName : '-' }}
              </template>
            </el-table-column>
            <el-table-column align="center" label="账号状态">
               <template>
              {{
									accountsVo.accountStatus
										? typeFilter(accountsVo.accountStatus, 'accountStatusType')
										: '-'
								}}
              </template>
            </el-table-column>
            <el-table-column align="center" label="代理标签">
              <template>
                {{ accountsVo.labelId ? accountsVo.labelId : '-' }}
              </template>
            </el-table-column>
            <el-table-column align="center" label="代理等级">
              <template>
                 {{ accountsVo.currentLevel ? accountsVo.currentLevel : '-' }}
              </template>
            </el-table-column>
            <el-table-column align="center" label="绑定银行卡数量">
              <template>
                 {{ accountsVo.bankCount ? accountsVo.bankCount : '-' }}
              </template>
            </el-table-column>
            <el-table-column align="center" label="虚拟币账号数量">
              <template>
                  {{ accountsVo.virtualCount ? accountsVo.virtualCount : '-' }}
              </template>
            </el-table-column>
            <el-table-column align="center" label="累计提款次数">
              <template>
                {{
									accountsVo.commonWithdrawTimes
										? accountsVo.commonWithdrawTimes
										: '-'
								}}
              </template>
            </el-table-column>
            <el-table-column align="center" label="累计提款总额（万元）">
              <template>
               {{
									accountsVo.sumWithdrawAmount
										? accountsVo.sumWithdrawAmount
										: '-'
								}}
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
      <div class="review-content">
        <p class="name">账号风控层级</p>
        <div class="review-flex">
          <el-table
            border
            size="mini"
            :data="[1]"
            style="width: 100%"
            :header-cell-style="getRowClass"
          >
            <el-table-column align="center" label="风险代理">
              <template slot-scope="scope">
              <span v-if="!!scope.row.orderNo">
									{{ scope.row.orderNo }}
								</span>
								<span v-else>-</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="风险银行卡">
              <template>
               {{ proxyRiskControlLevelVo.riskyBankCard ? proxyRiskControlLevelVo.riskyBankCard : '-' }}
              </template>
            </el-table-column>
            <el-table-column align="center" label="风险虚拟币">
              <template>
              {{ proxyRiskControlLevelVo.riskyVirtualCurrency ? proxyRiskControlLevelVo.riskyVirtualCurrency : '-' }}

              </template>
            </el-table-column>
            <el-table-column align="center" label="风险IP">
              <template>
                {{ proxyRiskControlLevelVo.riskyIP ? proxyRiskControlLevelVo.riskyIP : '-' }}
              </template>
            </el-table-column>
            <el-table-column align="center" label="风险终端设备号">
              <template>
                {{ proxyRiskControlLevelVo.riskTerminalDeviceNumber ? proxyRiskControlLevelVo.riskTerminalDeviceNumber : '-' }}
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
      <div class="review-content">
        <p class="name">佣金账目审核</p>
        <div class="review-flex">
          <table class="review-table">
            <tbody>
              <tr>
                <td class="td-title">日期</td>
                <td>
                   {{
										commissionRecordVo.reportDate
											? commissionRecordVo.reportDate
											: '-'
									}}
                </td>
                <td class="td-title">佣金比例</td>
                <td>
                   {{
										commissionRecordVo.commissionRate
											? commissionRecordVo.commissionRate
											: '-'
									}}
                </td>
                <td class="td-title">佣金金额</td>
                <td>
                  {{
										commissionRecordVo.totalRebateAmount
											? commissionRecordVo.totalRebateAmount
											: '-'
									}}
                </td>
                <td class="td-title">等级专享</td>
                <td>
                  {{
										commissionRecordVo.rewardAmount
											? commissionRecordVo.rewardAmount
											: '-'
									}}
                </td>
              </tr>
              <tr>
                <td class="td-title">活跃下级</td>
                <td @click="active()">
                   {{
										commissionRecordVo.activeSubordinate
											? commissionRecordVo.activeSubordinate
											: '-'
									}}
                </td>
                <td class="td-title">有效活跃下级</td>
                <td>
                    {{
										commissionRecordVo.effectivelyActiveSubordinates
											? commissionRecordVo.effectivelyActiveSubordinates
											: '-'
									}}
                </td>
                <td class="td-title">新增活跃下级</td>
                <td>
                   {{
										commissionRecordVo.addActiveSubordinates
											? commissionRecordVo.addActiveSubordinates
											: '-'
									}}
                </td>
                <td class="td-title">新增有效活跃下级</td>
                <td>
                   {{
										commissionRecordVo.addEffectiveActiveSubordinates
											? commissionRecordVo.addEffectiveActiveSubordinates
											: '-'
									}}
                </td>
              </tr>
              <tr>
                <td class="td-title">总输赢</td>
                <td>
                   {{
										commissionRecordVo.totalNetAmount
											? commissionRecordVo.totalNetAmount
											: '-'
									}}
                </td>
                <td class="td-title">场馆费</td>
                <td>
                 {{
										commissionRecordVo.totalPlatformAmount
											? commissionRecordVo.totalPlatformAmount
											: '-'
									}}
                </td>
                <td class="td-title">总优惠</td>
                <td>
                  {{
										commissionRecordVo.totalActivityAmount
											? commissionRecordVo.totalActivityAmount
											: '-'
									}}
                </td>
                <td class="td-title">总返水</td>
                <td>
                {{
										commissionRecordVo.commissionAmount
											? commissionRecordVo.commissionAmount
											: '-'
									}}
                </td>
              </tr>
              <tr>
                <td class="td-title">补单输赢</td>
                <td>
                  {{
										commissionRecordVo.totalPatchNetAmount
											? commissionRecordVo.totalPatchNetAmount
											: '-'
									}}
                </td>
                <td class="td-title">净输赢</td>
                <td>
                  {{
										commissionRecordVo.totalPureAmount
											? commissionRecordVo.totalPureAmount
											: '-'
									}}
                </td>
                <td class="td-title">上月结余</td>
                <td>
                 {{
										commissionRecordVo.totalLastAmount
											? commissionRecordVo.totalLastAmount
											: '-'
									}}
                </td>
                <td class="td-title">冲正后净输赢</td>
                <td>
                 {{
										commissionRecordVo.totalRushAmount
											? commissionRecordVo.totalRushAmount
											: '-'
									}}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="review-content">
        <p class="name">审核信息</p>
        <div class="review-flex">
					<div>一审人: {{ proxyCommissionDetaiVoList[0] ? proxyCommissionDetaiVoList[0].lockOperator : '-' }}</div>
					<div>一审时间: {{ proxyCommissionDetaiVoList[0] ? proxyCommissionDetaiVoList[0].auditTime : '-' }}</div>
					<div>一审备注: {{ proxyCommissionDetaiVoList[0] ? proxyCommissionDetaiVoList[0].auditDesc : '-' }}</div>
				</div>
				<div class="review-flex">
					<div>二审人: {{ proxyCommissionDetaiVoList[1] ? proxyCommissionDetaiVoList[1].lockOperator : '-' }}</div>
					<div>二审时间: {{ proxyCommissionDetaiVoList[1] ? proxyCommissionDetaiVoList[1].auditTime : '-' }}</div>
					<div>二审备注: {{ proxyCommissionDetaiVoList[1] ? proxyCommissionDetaiVoList[1].auditDesc : '-' }}</div>
				</div>
      </div>
    </div>
  </div>
</template>

<script>
import list from '@/mixins/list'
export default {
  components: {},
  mixins: [list],
  props: {
    // 审核 true 仅返回 false
    type: Boolean,
    rowData: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      list: undefined,
      form: {
        remark: ''
      },
      userLabel: [],
      accountsVo: {},
      commissionRecordVo: {},
      proxyRiskControlLevelVo: {},
      proxyCommissionDetaiVoList: {},
      registerVo: {},
      visible: false,
      action: false
    }
  },
  computed: {},
  created() {
    this.getInfo()
  },
  mounted() {},
  methods: {
    goBack() {
      this.$emit('goBack')
    },
   getInfo() {
			const params = {
				id: this.rowData.id,
				proxyAccount: this.rowData.proxyAccount,
				userId: this.rowData.proxyId
			}
			this.$api.proxyCommissionRecordQueryDetail(params).then((res) => {
				if (res.code === 200) {
					const response = res.data
					this.loading = false
					console.log('respon')
					console.log(response)
					this.accountsVo = response.accountsVo
					this.commissionRecordVo = response.commissionRecordVo
					this.proxyRiskControlLevelVo = response.proxyRiskControlLevelVo
					this.proxyCommissionDetaiVoList = response.proxyCommissionDetaiVoList
					this.registerVo = response.registerVo
				} else {
					this.loading = false
					this.$message({
						message: res.msg,
						type: 'error'
					})
				}
			})
		},
    active() {
      console.log('12321')
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
.review-content {
  width: 100%;
  color: #666666;
  .review-table {
    width: 100%;
    text-align: center; /*文本居中*/
    border-collapse: collapse; /*表格的边框合并，如果相邻，则共用一个边框*/
    border-spacing: 0;
    border: 1px solid #bcbec2;
    td {
      border-right: 1px solid #bcbec2;
      border-bottom: 1px solid #bcbec2;
      height: 36px;
      line-height: 36px;
    }
    .td-title {
      background: #dfe1e4;
    }
  }
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
      min-height: 150px;
      border: 1px solid rgba(192, 190, 190, 0.5);
      border-top: 0px;
      padding: 30px;
      .name {
        font-weight: 600;
      }
      .review-flex {
        position: relative;
        width: 100%;
        margin-top: 15px;
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
}
</style>
