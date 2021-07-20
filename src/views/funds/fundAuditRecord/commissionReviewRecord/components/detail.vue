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
                {{ registerVo.createDt ? registerVo.createDt : "-" }}
              </template>
            </el-table-column>
            <el-table-column align="center" label="最后登录时间">
              <template>
                {{ registerVo.lastLoginTime ? registerVo.lastLoginTime : "-" }}
              </template>
            </el-table-column>
            <el-table-column align="center" label="注册端">
              <template>
                {{
                  registerVo.deviceType
                    ? typeFilter(registerVo.deviceType, "deviceType")
                    : "-"
                }}
              </template>
            </el-table-column>
            <el-table-column align="center" label="注册IP">
              <template>
                {{ registerVo.registerIp ? registerVo.registerIp : "-" }}
              </template>
            </el-table-column>
            <el-table-column align="center" label="注册端设备编号">
              <template>
                {{ registerVo.deviceNo ? registerVo.deviceNo : "-" }}
              </template>
            </el-table-column>
            <el-table-column align="center" label="账号类型">
              <template>
                {{
                  registerVo.accountType
                    ? typeFilter(registerVo.accountType, "accountType")
                    : "-"
                }}
              </template>
            </el-table-column>
            <el-table-column align="center" label="注册域名">
              <template>
                {{ registerVo.registerReference ? registerVo.registerReference : "-" }}
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
                {{ accountsVo.userName ? accountsVo.userName : "-" }}
              </template>
            </el-table-column>
            <el-table-column align="center" label="代理姓名">
              <template>
                {{ accountsVo.realName ? accountsVo.realName : "-" }}
              </template>
            </el-table-column>
            <el-table-column align="center" label="账号状态">
              <template>
                {{
                  accountsVo.accountStatus
                    ? typeFilter(accountsVo.accountStatus, "accountStatusType")
                    : "-"
                }}
              </template>
            </el-table-column>
            <el-table-column align="center" label="代理标签">
              <template>
                {{ accountsVo.labelId ? accountsVo.labelId : "-" }}
              </template>
            </el-table-column>
            <el-table-column align="center" label="代理等级">
              <template>
                {{ accountsVo.currentLevel ? accountsVo.currentLevel : "-" }}
              </template>
            </el-table-column>
            <el-table-column align="center" label="绑定银行卡数量">
              <template>
                {{ accountsVo.bankCount ? accountsVo.bankCount : "-" }}
              </template>
            </el-table-column>
            <el-table-column align="center" label="虚拟币账号数量">
              <template>
                {{ accountsVo.virtualCount ? accountsVo.virtualCount : "-" }}
              </template>
            </el-table-column>
            <el-table-column align="center" label="累计提款次数">
              <template>
                {{
                  accountsVo.commonWithdrawTimes ? accountsVo.commonWithdrawTimes : "-"
                }}
              </template>
            </el-table-column>
            <el-table-column align="center" label="累计提款总额（万元）">
              <template>
                {{ accountsVo.sumWithdrawAmount ? accountsVo.sumWithdrawAmount : "-" }}
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
                {{
                  proxyRiskControlLevelVo.riskyBankCard
                    ? proxyRiskControlLevelVo.riskyBankCard
                    : "-"
                }}
              </template>
            </el-table-column>
            <el-table-column align="center" label="风险虚拟币">
              <template>
                {{
                  proxyRiskControlLevelVo.riskyVirtualCurrency
                    ? proxyRiskControlLevelVo.riskyVirtualCurrency
                    : "-"
                }}
              </template>
            </el-table-column>
            <el-table-column align="center" label="风险IP">
              <template>
                {{
                  proxyRiskControlLevelVo.riskyIP ? proxyRiskControlLevelVo.riskyIP : "-"
                }}
              </template>
            </el-table-column>
            <el-table-column align="center" label="风险终端设备号">
              <template>
                {{
                  proxyRiskControlLevelVo.riskTerminalDeviceNumber
                    ? proxyRiskControlLevelVo.riskTerminalDeviceNumber
                    : "-"
                }}
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
                    commissionRecordVo.reportDate ? commissionRecordVo.reportDate : "-"
                  }}
                </td>
                <td class="td-title">佣金比例</td>
                <td>
                  {{
                    commissionRecordVo.commissionRate
                      ? commissionRecordVo.commissionRate
                      : "-"
                  }}
                </td>
                <td class="td-title">佣金金额</td>
                <td>
                  {{
                    commissionRecordVo.totalRebateAmount
                      ? commissionRecordVo.totalRebateAmount
                      : "-"
                  }}
                </td><td class="td-title">等级专享</td>
                <td>
                  {{
                    commissionRecordVo.totalRushAmount
                      ? commissionRecordVo.totalRushAmount
                      : "-"
                  }}
                </td>
              </tr>
              <tr>
                <td class="td-title">活跃下级</td>
                <td class="disColor" @click="active()">
                  {{
                    commissionRecordVo.activeSubordinate
                      ? commissionRecordVo.activeSubordinate
                      : "-"
                  }}
                </td>
                <td class="td-title">有效活跃下级</td>
                <td class="disColor" @click="effective()">
                  {{
                    commissionRecordVo.effectivelyActiveSubordinates
                      ? commissionRecordVo.effectivelyActiveSubordinates
                      : "-"
                  }}
                </td>
                <td class="td-title">新增活跃下级</td>
                <td class="disColor" @click="addactive()">
                  {{
                    commissionRecordVo.addActiveSubordinates
                      ? commissionRecordVo.addActiveSubordinates
                      : "-"
                  }}
                </td>
                <td class="td-title">新增有效活跃下级</td>
                <td class="disColor" @click="addSubordinate()">
                  {{
                    commissionRecordVo.addEffectiveActiveSubordinates
                      ? commissionRecordVo.addEffectiveActiveSubordinates
                      : "-"
                  }}
                </td>

              </tr>
              <tr>
                <td class="td-title">总输赢</td>
                <td class="disColor" @click="totalNet()">
                  {{
                    commissionRecordVo.totalNetAmount
                      ? commissionRecordVo.totalNetAmount
                      : "-"
                  }}
                </td>
                <td class="td-title">场馆费</td>
                <td class="disColor" @click="VenuefeeNet()">
                  {{
                    commissionRecordVo.totalPlatformAmount
                      ? commissionRecordVo.totalPlatformAmount
                      : "-"
                  }}
                </td>
                <td class="td-title">总优惠</td>
                <td class="disColor" @click="totalDiscount()">
                  {{
                    commissionRecordVo.totalActivityAmount
                      ? commissionRecordVo.totalActivityAmount
                      : "-"
                  }}
                </td>
                <td class="td-title">总返水</td>
                <td class="disColor" @click="totalBackwater()">
                  {{
                    commissionRecordVo.commissionAmount
                      ? commissionRecordVo.commissionAmount
                      : "-"
                  }}
                </td>
              </tr>
              <tr>
                <td class="td-title">补单输赢</td>
                <td>
                  {{
                    commissionRecordVo.totalPatchNetAmount
                      ? commissionRecordVo.totalPatchNetAmount
                      : "-"
                  }}
                </td>
                <td class="td-title">净输赢</td>
                <td>
                  {{
                    commissionRecordVo.totalPureAmount
                      ? commissionRecordVo.totalPureAmount
                      : "-"
                  }}
                </td>
                <td class="td-title">上月结余</td>
                <td class="disColor" @click="Balance()">
                  {{
                    commissionRecordVo.totalLastAmount
                      ? commissionRecordVo.totalLastAmount
                      : "-"
                  }}
                </td>
                <td class="td-title">冲正后净输赢</td>
                <td>
                  {{
                    commissionRecordVo.totalRushAmount
                      ? commissionRecordVo.totalRushAmount
                      : "-"
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
          <div>
            一审人:
            {{
              proxyCommissionDetaiVoList[0]
                ? proxyCommissionDetaiVoList[0].lockOperator
                : "-"
            }}
          </div>
          <div>
            一审时间:
            {{
              proxyCommissionDetaiVoList[0]
                ? proxyCommissionDetaiVoList[0].auditTime
                : "-"
            }}
          </div>
          <div>
            一审备注:
            {{
              proxyCommissionDetaiVoList[0]
                ? proxyCommissionDetaiVoList[0].auditDesc
                : "-"
            }}
          </div>
        </div>
        <div class="review-flex">
          <div>
            二审人:
            {{
              proxyCommissionDetaiVoList[1]
                ? proxyCommissionDetaiVoList[1].lockOperator
                : "-"
            }}
          </div>
          <div>
            二审时间:
            {{
              proxyCommissionDetaiVoList[1]
                ? proxyCommissionDetaiVoList[1].auditTime
                : "-"
            }}
          </div>
          <div>
            二审备注:
            {{
              proxyCommissionDetaiVoList[1]
                ? proxyCommissionDetaiVoList[1].auditDesc
                : "-"
            }}
          </div>
        </div>
      </div>
    </div>
    <!-- 活跃下级 -->
    <el-dialog
      :visible.sync="dialogVisible"
      :destroy-on-close="true"
      width="880px"
      class="rempadding"
    >
      <div class="contentBox">
        活跃下级<span class="disColor">{{ activeSubordinate }}人</span>
      </div>
      <el-table
        v-loading="loading"
        size="mini"
        class="small-size-table"
        :data="gameList"
        :header-cell-style="getRowClass"
      >
        <el-table-column prop="playerId" align="center" label="会员账号">
          <template slot-scope="scope">
            <Copy v-if="!!scope.row.playerId" :title="scope.row.playerId" :copy="copy">
              {{ scope.row.playerId }}
            </Copy>
          </template>
        </el-table-column>
        <el-table-column prop="playerName" align="center" label="姓名"></el-table-column>
        <el-table-column
          prop="depositAmount"
          align="center"
          label="存款金额"
        ></el-table-column>
        <el-table-column
          prop="validBetAmount"
          align="center"
          label="有效投注"
        ></el-table-column>
      </el-table>
      <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="dialogVisible = false">关闭</el-button>
      </div>
      <!-- 分页 -->
       <div slot="footer" class="dialog-footer">
      <el-pagination
        :current-page.sync="page"
        :total="total"
        background
        class="fenye"
        layout="total, sizes,prev, pager, next, jumper"
        :page-size="size"
        :page-sizes="[5, 10, 15]"
      ></el-pagination>
       </div>
    </el-dialog>
      <!-- 新增活跃下级 -->
    <el-dialog
      :visible.sync="dialogaddactive"
      :destroy-on-close="true"
      width="880px"
      class="rempadding"
    >
      <div class="contentBox">
        新增活跃下级<span class="disColor">{{ addActiveSubordinates }}人</span>
      </div>
      <el-table
        v-loading="loading"
        size="mini"
        class="small-size-table"
        :data="addactiveList"
        :header-cell-style="getRowClass"
      >
        <el-table-column prop="playerId" align="center" label="会员账号">
          <template slot-scope="scope">
            <Copy v-if="!!scope.row.playerId" :title="scope.row.playerId" :copy="copy">
              {{ scope.row.playerId }}
            </Copy>
          </template>
        </el-table-column>
        <el-table-column prop="playerName" align="center" label="姓名"></el-table-column>
        <el-table-column
          prop="depositAmount"
          align="center"
          label="存款金额"
        ></el-table-column>
        <el-table-column
          prop="validBetAmount"
          align="center"
          label="有效投注"
        ></el-table-column>
        <el-table-column
          prop="bindDate"
          align="center"
          label="绑定时间"
        ></el-table-column>
      </el-table>
      <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="dialogaddactive = false">关闭</el-button>
      </div>
      <!-- 分页 -->
       <div slot="footer" class="dialog-footer">
      <el-pagination
        :current-page.sync="page"
        background
        :total="total"
        class="fenye"
        layout="total, sizes,prev, pager, next, jumper"
        :page-size="size"
        :page-sizes="[5, 10, 15]"
      ></el-pagination>
       </div>
    </el-dialog>
      <!-- 总输赢 -->
    <el-dialog
      :visible.sync="diawinOrLoseList"
      :destroy-on-close="true"
      width="880px"
      class="rempadding"
    >
      <div class="contentBox">
        总输赢<span class="disColor">{{ totalNetAmount }}元</span>
      </div>
      <el-table
        v-loading="loading"
        size="mini"
        class="small-size-table"
        :data="winOrLoseList"
        :header-cell-style="getRowClass"
      >
        <el-table-column prop="venueName" align="center" label="场馆">
        </el-table-column>
        <el-table-column prop="netAmount" align="center" label="总输赢">
        </el-table-column>
        <el-table-column
          prop="validBetAmount"
          align="center"
          label="有效投注"
        ></el-table-column>
      </el-table>
      <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="diawinOrLoseList = false">关闭</el-button>
        </div>
      <!-- 分页 -->
       <div slot="footer" class="dialog-footer">
      <el-pagination
        :current-page.sync="page"
        background
        :total="total"
        class="fenye"
        layout="total, sizes,prev, pager, next, jumper"
        :page-size="size"
        :page-sizes="[5, 10, 15]"
      ></el-pagination>
      </div>
    </el-dialog>
      <!-- 场馆费-->
    <el-dialog
      :visible.sync="dialogVenuefee"
      :destroy-on-close="true"
      width="880px"
      class="rempadding"
    >
      <div class="contentBox">
        场馆费<span class="disColor">{{ totalPlatformAmount }}元</span>
      </div>
      <el-table
        v-loading="loading"
        size="mini"
        class="small-size-table"
        :data="venueFeeList"
        :header-cell-style="getRowClass"
      >
        <el-table-column prop="venueName" align="center" label="场馆">
        </el-table-column>
        <el-table-column prop="venueRate" align="center" label="场馆费率">
        </el-table-column>
        <el-table-column
          prop="amount"
          align="center"
          label="场馆费"
        ></el-table-column>
      </el-table>
      <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="dialogVenuefee = false">关闭</el-button>
        </div>
      <!-- 分页 -->
      <div slot="footer" class="dialog-footer">
      <el-pagination
        :current-page.sync="page"
        background
        :total="total"
        class="fenye"
        layout="total, sizes,prev, pager, next, jumper"
        :page-size="size"
        :page-sizes="[5, 10, 15]"
      ></el-pagination>
       </div>
    </el-dialog>
     <!-- 总优惠-->
    <el-dialog
      :visible.sync="dialogDiscount"
      :destroy-on-close="true"
      width="880px"
      class="rempadding"
    >
      <div class="contentBox">
        活动优惠<span class="disColor">{{ totalActivityAmount }}元</span>
      </div>
      <el-table
        v-loading="loading"
        size="mini"
        class="small-size-table"
        :data="discountList"
        :header-cell-style="getRowClass"
      >
        <el-table-column prop="provideName" align="center" label="优惠类型">
        </el-table-column>
        <el-table-column prop="userCount" align="center" label="人数">
        </el-table-column>
        <el-table-column
          prop="amount"
          align="center"
          label="金额"
        ></el-table-column>
      </el-table>
      <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="dialogDiscount = false">关闭</el-button>
        </div>
      <!-- 分页 -->
       <div slot="footer" class="dialog-footer">
      <el-pagination
        :current-page.sync="page"
        background
        class="fenye"
        :total="total"
        layout="total, sizes,prev, pager, next, jumper"
        :page-size="size"
        :page-sizes="[5, 10, 15]"
      ></el-pagination>
       </div>
    </el-dialog>
      <!-- 总返水-->
    <el-dialog
      :visible.sync="dialogBackwater"
      :destroy-on-close="true"
      width="880px"
      class="rempadding"
    >
      <div class="contentBox">
        返水<span class="disColor">{{ commissionAmount }}元</span>
      </div>
      <el-table
        v-loading="loading"
        size="mini"
        class="small-size-table"
        :data="backwaterList"
        :header-cell-style="getRowClass"
      >
        <el-table-column prop="venueName" align="center" label="返水项目">
        </el-table-column>
        <el-table-column prop="userCount" align="center" label="人数">
        </el-table-column>
        <el-table-column
          prop="rebateAmount"
          align="center"
          label="金额"
        ></el-table-column>
      </el-table>
      <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="dialogBackwater = false">关闭</el-button>
        </div>
      <!-- 分页 -->
       <div slot="footer" class="dialog-footer">
      <el-pagination
        :current-page.sync="page"
        background
        class="fenye"
        :total="total"
        layout="total, sizes,prev, pager, next, jumper"
        :page-size="size"
        :page-sizes="[5, 10, 15]"
      ></el-pagination>
       </div>
    </el-dialog>
     <!-- 有效活跃下级 -->
    <el-dialog
      :visible.sync="dialogEffVisible"
      :destroy-on-close="true"
      width="880px"
      class="rempadding"
    >
      <div class="contentBox">
        有效活跃下级<span class="disColor">{{ effectivelyActiveSubordinates }}人</span>
      </div>
      <el-table
        v-loading="loading"
        size="mini"
        class="small-size-table"
        :data="effectiveList"
        :header-cell-style="getRowClass"
      >
        <el-table-column prop="playerId" align="center" label="会员账号">
          <template slot-scope="scope">
            <Copy v-if="!!scope.row.playerId" :title="scope.row.playerId" :copy="copy">
              {{ scope.row.playerId }}
            </Copy>
          </template>
        </el-table-column>
        <el-table-column prop="playerName" align="center" label="姓名"></el-table-column>
        <el-table-column
          prop="depositAmount"
          align="center"
          label="存款金额"
        ></el-table-column>
        <el-table-column
          prop="validBetAmount"
          align="center"
          label="有效投注"
        ></el-table-column>
      </el-table>
      <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="dialogEffVisible = false">关闭</el-button>
      </div>
      <!-- 分页 -->
       <div slot="footer" class="dialog-footer">
      <el-pagination
        :current-page.sync="page"
        background
        :total="total"
        class="fenye"
        layout="total, sizes,prev, pager, next, jumper"
        :page-size="size"
        :page-sizes="[5, 10, 15]"
      ></el-pagination>
       </div>
    </el-dialog>
    <!-- 新增有效活跃下级 -->
    <el-dialog
      :visible.sync="dialogDinate"
      :destroy-on-close="true"
      width="880px"
      class="rempadding"
    >
      <div class="contentBox">
        新增有效活跃下级<span class="disColor">{{ addEffectiveActiveSubordinates }}人</span>
      </div>
      <el-table
        v-loading="loading"
        size="mini"
        class="small-size-table"
        :data="dinateList"
        :header-cell-style="getRowClass"
      >
        <el-table-column prop="playerId" align="center" label="会员账号">
          <template slot-scope="scope">
            <Copy v-if="!!scope.row.playerId" :title="scope.row.playerId" :copy="copy">
              {{ scope.row.playerId }}
            </Copy>
          </template>
        </el-table-column>
        <el-table-column prop="playerName" align="center" label="姓名"></el-table-column>
        <el-table-column
          prop="depositAmount"
          align="center"
          label="存款金额"
        ></el-table-column>
        <el-table-column
          prop="validBetAmount"
          align="center"
          label="有效投注"
        ></el-table-column>
        <el-table-column
          prop="bindDate"
          align="center"
          label="绑定时间"
        ></el-table-column>
      </el-table>
      <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="dialogDinate = false">关闭</el-button>
      </div>
      <!-- 分页 -->
       <div slot="footer" class="dialog-footer">
      <el-pagination
        :current-page.sync="page"
        background
        :total="total"
        class="fenye"
        layout="total, sizes,prev, pager, next, jumper"
        :page-size="size"
        :page-sizes="[5, 10, 15]"
      ></el-pagination>
       </div>
    </el-dialog>
      <!-- 上月结余 -->
    <el-dialog
      :visible.sync="dialogBalance"
      :destroy-on-close="true"
      width="880px"
      class="rempadding"
    >
      <div class="contentBox">
        上月结余<span class="disColor">{{ totalLastAmount }}元</span>
      </div>
      <el-table
        v-loading="loading"
        size="mini"
        class="small-size-table"
        :data="balanceList"
        :header-cell-style="getRowClass"
      >
        <el-table-column prop="reportDate" align="center" label="历史月份">
        </el-table-column>
        <el-table-column
          prop="totalPureAmount"
          align="center"
          label="净输赢"
        ></el-table-column>
        <el-table-column
          prop="totalLastAmount"
          align="center"
          label="结余金额"
        ></el-table-column>
      </el-table>
      <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="dialogBalance = false">关闭</el-button>
      </div>
      <!-- 分页 -->
       <div slot="footer" class="dialog-footer">
      <el-pagination
        :current-page.sync="page"
        background
        class="fenye"
        :total="total"
        layout="total, sizes,prev, pager, next, jumper"
        :page-size="size"
        :page-sizes="[5, 10, 15]"
      ></el-pagination>
       </div>
    </el-dialog>
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
      addactiveList: [],
      dinateList: [],
      balanceList: [],
      winOrLoseList: [],
      effectiveList: [],
      discountList: [],
      venueFeeList: [],
      backwaterList: [],
      gameList: [],
      accountsVo: {},
      commissionRecordVo: {},
      proxyRiskControlLevelVo: {},
      proxyCommissionDetaiVoList: {},
      dialogVisible: false,
      diawinOrLoseList: false,
      dialogTotal: false,
      dialogVenuefee: false,
      dialogaddactive: false,
      dialogEffVisible: false,
      dialogDinate: false,
      dialogDiscount: false,
      dialogBalance: false,
      createPage: false,
      dialogBackwater: false,
      activeSubordinate: '',
      totalPlatformAmount: '',
      totalActivityAmount: '',
      commissionAmount: '',
      addActiveSubordinates: '',
      addEffectiveActiveSubordinates: '',
      effectivelyActiveSubordinates: '',
      totalLastAmount: '',
      totalNetAmount: '',
      registerVo: {},
      reportMonth: '',
      proxyId: '',
      page: 1,
      size: 10,
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
        proxyId: this.rowData.proxyId,
        userId: this.rowData.proxyId
      }

      this.$api.proxyCommissionRecordQueryDetail(params).then((res) => {
        if (res.code === 200) {
          const response = res.data
          this.loading = false
          this.reportMonth = response.commissionRecordVo.reportDate
          this.accountsVo = response.accountsVo
          this.commissionRecordVo = response.commissionRecordVo
          this.proxyRiskControlLevelVo = response.proxyRiskControlLevelVo
          this.proxyCommissionDetaiVoList = response.proxyCommissionDetaiVoList
          this.activeSubordinate = response.commissionRecordVo.activeSubordinate
          this.totalNetAmount = response.commissionRecordVo.totalNetAmount
          this.totalPlatformAmount = response.commissionRecordVo.totalPlatformAmount
          this.totalActivityAmount = response.commissionRecordVo.totalActivityAmount
          this.commissionAmount = response.commissionRecordVo.commissionAmount
          this.addActiveSubordinates = response.commissionRecordVo.addActiveSubordinates
          this.effectivelyActiveSubordinates = response.commissionRecordVo.effectivelyActiveSubordinates
          this.addEffectiveActiveSubordinates = response.commissionRecordVo.addEffectiveActiveSubordinates
          this.totalLastAmount = response.commissionRecordVo.totalLastAmount

          console.log(response, '111123')
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
    // 活跃下级
    active() {
      const params = {
        ...this.gameList
      }
      params.reportMonth = this.reportMonth
      params.pageNum = this.page
      params.proxyId = this.rowData.proxyId
      params.pageSize = this.size
      this.dialogVisible = true
      this.$api.ProxyCommissionRecordSubordinate(params).then((res) => {
        if (res.code === 200) {
          this.total = res.data.totalRecord
          this.gameList = res.data.record
        }
      })
    },
    // 新增活跃下级
    addactive() {
     const params = {
        ...this.addactiveList
      }
      params.reportMonth = this.reportMonth
      params.pageNum = this.page
      params.proxyId = this.rowData.proxyId
      params.pageSize = this.size
      this.dialogaddactive = true
      this.$api.ProxyCommissionRecordAddSubordinate(params).then((res) => {
        if (res.code === 200) {
          this.total = res.data.totalRecord
          this.addactiveList = res.data.record
        }
      })
    },
    // 有效活跃下级
    effective() {
      const params = {
        ...this.effectiveList
      }
      params.reportMonth = this.reportMonth
      params.pageNum = this.page
      params.proxyId = this.rowData.proxyId
      params.pageSize = this.size
      this.dialogEffVisible = true
       this.$api.ProxyCommissionRecordValidSubordinate(params).then((res) => {
        if (res.code === 200) {
          this.total = res.data.totalRecord
          this.effectiveList = res.data.record
        }
      })
    },
    // 总输赢
    totalNet() {
       const params = {
        ...this.winOrLoseList
      }
      params.reportMonth = this.reportMonth
      params.pageNum = this.page
      params.proxyId = this.rowData.proxyId
      params.pageSize = this.size
       this.diawinOrLoseList = true
       this.$api.ProxyCommissionRecordTotalWinOrLose(params).then((res) => {
        if (res.code === 200) {
          this.total = res.data.totalRecord
          this.winOrLoseList = res.data.record
        }
      })
    },
     // 场馆费
    VenuefeeNet() {
      const params = {
        ...this.venueFeeList
      }
      params.reportMonth = this.reportMonth
      params.pageNum = this.page
      params.proxyId = this.rowData.proxyId
      params.pageSize = this.size
       this.dialogVenuefee = true
       this.$api.ProxyCommissionRecordVenueFee(params).then((res) => {
        if (res.code === 200) {
          this.total = res.data.totalRecord
          this.venueFeeList = res.data.record
        }
      })
    },
    // 总优惠
    totalDiscount() {
      const params = {
        ...this.discountList
      }
      params.reportMonth = this.reportMonth
      params.pageNum = this.page
      params.proxyId = this.rowData.proxyId
      params.pageSize = this.size
      this.dialogDiscount = true
      this.$api.ProxyCommissionRecordTotalDiscount(params).then((res) => {
        if (res.code === 200) {
          this.total = res.data.totalRecord
          this.discountList = res.data.record
        }
      })
    },
    // 总返水
    totalBackwater() {
      const params = {
        ...this.backwaterList
      }
      params.reportMonth = this.reportMonth
      params.pageNum = this.page
      params.proxyId = this.rowData.proxyId
      params.pageSize = this.size
      this.$api.ProxyCommissionRecordTotalRebate(params).then((res) => {
        if (res.code === 200) {
          this.total = res.data.totalRecord
          this.backwaterList = res.data.record
          this.dialogBackwater = true
        }
      })
    },
    // 新增有效活跃下级
    addSubordinate() {
      const params = {
        ...this.dinateList
      }
      params.reportMonth = this.reportMonth
      params.pageNum = this.page
      params.proxyId = this.rowData.proxyId
      params.pageSize = this.size
      this.$api.ProxyCommissionRecordValidAddSubordinate(params).then((res) => {
        if (res.code === 200) {
          this.total = res.data.totalRecord
          this.dinateList = res.data.record
          this.dialogDinate = true
        }
      })
    },
    // 上月结余
    Balance() {
      const params = {
        ...this.balanceList
      }
      params.reportMonth = this.reportMonth
      params.pageNum = this.page
      params.proxyId = this.rowData.proxyId
      params.pageSize = this.size
      this.$api.ProxyCommissionRecordLastMonthBalance(params).then((res) => {
        if (res.code === 200) {
          this.total = res.data.totalRecord
          this.balanceList = res.data.record
          this.dialogBalance = true
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.disColor {
  padding-left: 9px;
  color: rgb(75, 88, 211);
}
.contentBox {
  font-size: 20px;
  padding-block: 9px;
}
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
