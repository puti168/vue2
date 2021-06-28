<template>
  <div class="game-container report-container">
    <template v-if="!showDetail">
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
              :default-time="defaultTime"
            ></el-date-picker>
          </el-form-item>
          <el-form-item label="锁单状态:">
            <el-select
              v-model="queryData.lockStatus"
              style="width: 180px"
              :popper-append-to-body="false"
            >
              <el-option label="全部" value=""></el-option>
              <el-option
                v-for="item in lockOrderType"
                :key="item.code"
                :label="item.description"
                :value="Number(item.code)"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="订单号:">
            <el-input
              v-model="queryData.thirdOrderNo"
              clearable
              size="medium"
              :maxlength="50"
              style="width: 185px"
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
          <p class="danger data-refresh">数据更新时间： {{ now }}</p>
        </el-form>
      </div>
      <div class="view-container dealer-container">
        <div class="content">
          <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="待一审" name="0"></el-tab-pane>
            <el-tab-pane label="待二审" name="1"></el-tab-pane>
            <el-tab-pane label="待三审" name="2"></el-tab-pane>
            <el-tab-pane label="待出款" name="3"></el-tab-pane>
          </el-tabs>
          <el-table
            v-loading="loading"
            border
            size="mini"
            class="small-size-table"
            :data="dataList"
            style="width: 100%"
            :header-cell-style="getRowClass"
          >
            <el-table-column align="center" label="锁单" width="60">
              <template slot-scope="scope">
                <el-checkbox
                  v-if="
                    scope.row.lockAccount === name ||
                    !scope.row.lockAccount ||
                    scope.row.lockAccount === '无'
                  "
                  v-model="scope.row.lockOrder"
                  @change="lockChange(scope.row)"
                ></el-checkbox>
              </template>
            </el-table-column>
            <el-table-column align="center" label="操作" width="180">
              <template slot-scope="scope">
                <el-button
                  v-if="activeName !== '3'"
                  :class="
                    scope.row.lockAccount !== name || !scope.row.lockAccount ? 'dis' : ''
                  "
                  type="primary"
                  size="medium"
                  @click="goDetail(scope.row)"
                >
                  {{
                    activeName === "0"
                      ? "一审审核"
                      : activeName === "1"
                      ? "二审审核"
                      : "三审审核"
                  }}
                </el-button>
                <template v-else>
                  <el-button
                    type="success"
                    size="medium"
                    :disabled="scope.row.lockStatus === 0"
                    @click="confirm(scope.row, true)"
                  >
                    出款通过
                  </el-button>
                  <el-button
                    type="danger"
                    size="medium"
                    :disabled="scope.row.lockStatus === 0"
                    @click="confirm(scope.row, false)"
                  >
                    出款拒绝
                  </el-button>
                </template>
              </template>
            </el-table-column>
            <el-table-column
              prop="thirdOrderNo"
              align="center"
              label="审核订单号"
            ></el-table-column>
            <el-table-column
              prop="userName"
              align="center"
              label="会员账号"
            ></el-table-column>
            <el-table-column
              prop="realName"
              align="center"
              label="会员姓名"
            ></el-table-column>
            <el-table-column prop="isBig" align="center" label="是否为大额提款">
              <template slot-scope="scope">
                {{ Number(scope.row.isBig) === 1 ? "是" : "否" }}
              </template>
            </el-table-column>
            <el-table-column
              prop="orderAmount"
              align="center"
              label="提款金额"
            ></el-table-column>
            <el-table-column
              prop="orderRateAmount"
              align="center"
              label="提款手续费"
            ></el-table-column>
            <el-table-column
              prop="createdAt"
              align="center"
              label="申请时间"
            ></el-table-column>
            <el-table-column align="center" label="审核状态">
              <template slot-scope="scope">
                <span
                  :class="
                    Number(scope.row.orderStatus) === 11
                      ? 'normalRgba'
                      : '2467'.includes(Number(scope.row.orderStatus))
                      ? 'lockingRgba'
                      : 'disableRgba'
                  "
                >
                  {{ typeFilter(scope.row.orderStatus, "withdrawStatus") }}
                </span>
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
        title="提交确认"
        center
        :visible.sync="visible"
        width="610px"
        class="audit-confirm"
      >
        <el-form ref="form" :model="form" :rules="formRules">
          <el-form-item label="提交审核信息" prop="remark">
            <el-input
              v-model="form.remark"
              clearable
              type="textarea"
              :maxlength="50"
              show-word-limit
              :autosize="{ minRows: 4, maxRows: 4 }"
              style="width: 380px"
              placeholder="请输入"
            ></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="visible = false">取 消</el-button>
          <el-button type="primary" @click="auditOne"> 提交 </el-button>
        </div>
      </el-dialog>
    </template>
    <detail
      v-else
      :type="type"
      :rowData="rowData"
      :activeName="activeName"
      @goBack="goBack"
    ></detail>
  </div>
</template>

<script>
import list from '@/mixins/list'
import detail from './components/detail'
import dayjs from 'dayjs'
import { getUsername } from '@/utils/auth'
const end = dayjs().endOf('day').valueOf()
const start = dayjs().startOf('day').valueOf()
export default {
  name: 'MemberWithdrawalReview',
  components: { detail },
  mixins: [list],
  data() {
    return {
      queryData: {
        thirdOrderNo: '',
        lockStatus: ''
      },
      type: true,
      showDetail: false,
      visible: false,
      form: {
        remark: ''
      },
      formTime: {
        time: [start, end]
      },
      rowData: {},
      row: {},
      action: '',
      now: dayjs(new Date()).format('YYYY-MM-DD HH:mm:ss'),
      name: '',
      activeName: '',
      dataList: []
    }
  },
  computed: {
    lockOrderType() {
      return this.globalDics.lockOrderType
    },
    formRules() {
      return {
        remark: [{ required: true, message: '审核拒绝备注必填', trigger: 'blur' }]
      }
    }
  },
  mounted() {
    this.name = getUsername()
  },
  methods: {
    handleClick() {
      this.loadData()
    },
    loadData() {
      this.loading = true
      const [startTime, endTime] = this.formTime.time || []
      let params = {
        ...this.queryData,
        createdAtStart: startTime ? dayjs(startTime).format('YYYY-MM-DD HH:mm:ss') : '',
        createdAtEnd: endTime ? dayjs(endTime).format('YYYY-MM-DD HH:mm:ss') : ''
      }
      params = {
        ...this.getParams(params)
      }
      let type =
        this.activeName === '0'
          ? 'memberWithDrawProxyselectMemberWithDrawAuthEsPageOne'
          : 'memberWithDrawProxyselectMemberWithDrawAuthEsPageTwo'
      if (this.activeName === '2') {
        type = 'memberWithDrawProxyselectMemberWithDrawAuthEsPageThree'
      }
      if (this.activeName === '3') {
        type = 'memberWithDrawProxySelectMemberWithDrawAuthEsPagePay'
      }
      this.$api[type](params)
        .then((res) => {
          if (res.code === 200) {
            this.now = dayjs(new Date()).format('YYYY-MM-DD HH:mm:ss')
            const response = res.data
            this.loading = false
            this.dataList = response.record
            if (this.dataList.length > 0) {
              this.dataList.forEach((item) => {
                if (Number(item.lockStatus) === 1) {
                  item.lockOrder = true
                } else {
                  item.lockOrder = false
                }
              })
            }
            console.log(this.dataList, 11111)
            console.log(response, 22222)
            this.total = response.totalRecord
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
    goDetail(row) {
      this.type = row.lockAccount === this.name
      this.rowData = row
      this.showDetail = true
    },
    goBack() {
      this.showDetail = false
      this.loadData()
    },
    confirm(row, type) {
      this.row = row
      this.action = type
      this.$confirm(`您确认要执行该操作？`, {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.visible = true
        })
        .catch(() => {})
    },
    auditOne() {
      console.log(849646455646)
      this.$refs.form.validate((valid) => {
        if (valid) {
          const loading = this.$loading({
            lock: true,
            text: 'Loading',
            spinner: 'el-icon-loading',
            background: 'rgba(0, 0, 0, 0.7)'
          })
          const params = {
            thirdOrderNo: this.row.thirdOrderNo,
            createdAt: this.row.createdAt,
            auditDesc: this.form.remark,
            auditResult: this.action ? 1 : 2,
            orderStatus: 7
          }
          this.$api
            .memberWithDrawProxyUpdateWithdraw(params)
            .then((res) => {
              if (res.code === 200) {
                this.$message({
                  message: '操作成功',
                  type: 'success'
                })
                loading.close()
                this.loadData()
              }
            })
            .catch(() => {
              loading.close()
            })
        }
      })
    },
    reset() {
      this.queryData = {
        thirdOrderNo: '',
        lockStatus: ''
      }
      this.formTime = {
        time: [start, end]
      }
      this.loadData()
    },
    lockChange(val) {
      const loading = this.$loading({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
      this.$api
        .memberWithDrawProxyUpdateWithdrawLock({
          thirdOrderNo: val.thirdOrderNo,
          createdAt: val.createdAt,
          lockStatus: Number(val.lockStatus) === 1 ? 0 : 1
        })
        .then((res) => {
          if (res.code === 200) {
            loading.close()
            this.$message({
              type: 'success',
              message: '操作成功!'
            })
            setTimeout(() => {
              this.loadData()
              console.log(1111111)
            }, 1000)
            console.log(22222)
          } else {
            loading.close()
            this.$message({
              message: res.msg,
              type: 'error'
            })
          }
        })
        .catch(() => {
          loading.close()
        })
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
/deep/ .caret-wrapper {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
}
.data-refresh {
  margin-top: 0;
  padding-bottom: 20px;
}
</style>
