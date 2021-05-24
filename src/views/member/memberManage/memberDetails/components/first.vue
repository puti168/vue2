<template>
  <div id="basicInformation">
    <el-row>
      <el-col :span="4" class="backgroundTitelBox">基本信息</el-col>
      <el-col :span="2" class="refrestBox">
        <el-button type="primary" icon="el-icon-refresh" @click="refresh">刷新</el-button>
      </el-col>
      <el-col :span="2" class="editMsg">
        <i class="el-icon-edit-outline"></i><br />
        编辑信息
      </el-col>
      <!-- <el-col v-if="isshow" :span="16" class="btngroup">
        <el-button
          v-for="(item, index) in editMsgList"
          :key="index"
          disabled
          type="primary"
          >{{ item.label }}</el-button
        >
        <el-button disabled type="primary">账号备注</el-button>
      </el-col> -->
      <el-col :span="16" class="btngroup aaaaa">
        <el-button
          v-for="(item, index) in editMsgList"
          :key="index"
          type="primary"
          :disabled="item.applyStatus === '1'"
          @click="editFn(item.label)"
          >{{ item.label }}</el-button>
        <el-button type="primary" @click="editFn('账号备注')">账号备注</el-button>
      </el-col>
    </el-row>
    <div class="titelBox">概要信息</div>
    <el-row class="msgList">
      <el-col
:span="5"
>会员账号：<i v-if="activeL" class="el-icon-loading"></i>
        <span v-else>{{ outlineInfoList.userName }}</span>
      </el-col>
      <el-col :span="5">
        账号类型：<i v-if="activeL" class="el-icon-loading"></i>
        <span v-else>
          {{ typeFilter(outlineInfoList.accountType, "accountType") }}
        </span>
      </el-col>
      <el-col
:span="5"
>帐号状态：<i v-if="activeL" class="el-icon-loading"></i>
        <span v-else>{{
          typeFilter(outlineInfoList.accountStatus, "accountStatusType")
        }}</span>
        <!-- <div v-else style="width: 80%; display: inline-block">
          <p v-if="outlineInfoList.accountStatus === '1'">
            <span>
              {{ typeFilter(outlineInfoList.accountStatus, "accountStatusType") }}
            </span>
          </p>
          <p v-else class="yellowColor">
            <span>
              {{ typeFilter(outlineInfoList.accountStatus, "accountStatusType") }}
            </span>
            <span>审核中</span>
          </p>
        </div> -->
      </el-col>
      <el-col
:span="5"
>风控层级：<i v-if="activeL" class="el-icon-loading"></i>
        <span v-else>{{ outlineInfoList.windControlName }}</span>
      </el-col>
      <el-col
:span="5"
>首存时间：<i v-if="activeL" class="el-icon-loading"></i>
        <span v-else>
          {{ outlineInfoList.firstDepositTime }}
        </span>
      </el-col>
      <el-col
:span="5"
>首存金额：<i v-if="activeL" class="el-icon-loading"></i>
        <span v-else>
          {{ outlineInfoList.firstDepositAmount }}
        </span>
      </el-col>
      <el-col
:span="5"
>最后登录时间：<i v-if="activeL" class="el-icon-loading"></i>
        <span v-else>
          {{ outlineInfoList.lastLoginTime }}
        </span>
      </el-col>
      <el-col
:span="5"
>离线天数：<i v-if="activeL" class="el-icon-loading"></i>
        <span v-else> {{ outlineInfoList.leaveLineTime }}天 </span>
      </el-col>
      <el-col
:span="5"
>注册时间：<i v-if="activeL" class="el-icon-loading"></i>
        <span v-else>
          {{ outlineInfoList.createDt }}
        </span>
      </el-col>
      <el-col
:span="5"
>注册IP：<i v-if="activeL" class="el-icon-loading"></i>
        <span v-else>
          {{ outlineInfoList.registerIp }}
        </span>
      </el-col>
      <el-col
:span="5"
>注册端：<i v-if="activeL" class="el-icon-loading"></i>
        <span v-else>
          {{ typeFilter(outlineInfoList.deviceType, "deviceType") }}
        </span>
      </el-col>
      <el-col :span="5">上级代理：{{ outlineInfoList.parentProxyName }}</el-col>
      <el-col
:span="5"
>会员标签：
        <i v-if="activeL" class="el-icon-loading"></i>
        <span v-else-if="editMsgList[2].applyStatus === '1'" class="orangeColor">
          审核中 &nbsp; {{ outlineInfoList.labelName }}
        </span>
        <span v-else>
          {{ outlineInfoList.labelName }}
        </span>
      </el-col>
      <el-col
:span="5"
>转代次数：
        <i v-if="activeL" class="el-icon-loading"></i>
        <span v-else> {{ outlineInfoList.transforNum }}次 </span>
      </el-col>
    </el-row>
    <el-divider></el-divider>
    <div class="titelBox">个人资料</div>
    <el-row class="msgList">
      <el-col
:span="5"
>姓名：<i v-if="activeL" class="el-icon-loading"></i>
        <span v-else-if="editMsgList[5].applyStatus === '1'" class="orangeColor">
          审核中 &nbsp; {{ outlineInfoList.realName }}
        </span>
        <span v-else>
          {{ outlineInfoList.realName }}
        </span>
      </el-col>
      <el-col
:span="5"
>性别：<i v-if="activeL" class="el-icon-loading"></i>
        <span v-else-if="editMsgList[6].applyStatus === '1'" class="orangeColor">
          审核中 &nbsp; {{ typeFilter(outlineInfoList.gender, "genderType") }}
        </span>
        <span v-else>
          {{ typeFilter(outlineInfoList.gender, "genderType") }}
        </span>
      </el-col>
      <el-col
:span="5"
>出生日期：<i v-if="activeL" class="el-icon-loading"></i>
        <span v-else-if="editMsgList[3].applyStatus === '1'" class="orangeColor">
          审核中 &nbsp; {{ outlineInfoList.birth }}
        </span>
        <span v-else>
          {{ outlineInfoList.birth }}
        </span>
      </el-col>
      <el-col
:span="5"
>手机号码：<i v-if="activeL" class="el-icon-loading"></i>
        <span v-else-if="editMsgList[4].applyStatus === '1'" class="orangeColor">
          审核中 &nbsp; {{ outlineInfoList.mobile }}
        </span>
        <span v-else>
          {{ outlineInfoList.mobile }}
        </span>
      </el-col>
      <el-col
:span="5"
>邮箱：<i v-if="activeL" class="el-icon-loading"></i>
        <span v-else-if="editMsgList[7].applyStatus === '1'" class="orangeColor">
          审核中 &nbsp; {{ outlineInfoList.email }}
        </span>
        <span v-else>
          {{ outlineInfoList.email }}
        </span>
      </el-col>
    </el-row>
    <el-divider></el-divider>
    <el-row class="titelBox">
      <el-col :span="12">VIP信息</el-col>
      <el-col :span="12" class="borderL"></el-col>
    </el-row>
    <el-row class="msgList" style="min-height: 90px">
      <el-col :span="12" class="paddingBox">
        <el-row>
          <el-col :span="3">剩余</el-col>
          <el-col :span="7" class="textR">
            <i v-if="activeL" class="el-icon-loading"></i>
            <span v-else>
              {{ vipMsgList.depositAmountLave }}
            </span>
          </el-col>
          <el-col :span="7" class="textR">
            <i v-if="activeL" class="el-icon-loading"></i>
            <span v-else>
              {{ vipMsgList.validBetsLave }}
            </span>
          </el-col>
          <el-col :span="7" class="textR">
            <i v-if="activeL" class="el-icon-loading"></i>
            <span v-else>
              {{ vipMsgList.bjValidBetsLave }}
            </span>
          </el-col>
        </el-row>
        <el-row style="height: 14px">
          <el-col :span="3" style="color: #fff; height: 14px">进度条 </el-col>
          <el-col :span="7" class="">
            <el-progress :percentage="percentagea" :stroke-width="12" :show-text="false">
            </el-progress></el-col>
          <el-col :span="7" class="paddingL">
            <el-progress :percentage="percentageb" :stroke-width="12" :show-text="false">
            </el-progress></el-col>
          <el-col :span="7" class="paddingL">
            <el-progress :percentage="percentagec" :stroke-width="12" :show-text="false">
            </el-progress></el-col>
        </el-row>
        <el-row>
          <el-col :span="3">已完成</el-col>
          <el-col :span="7" class="textR">
            <i v-if="activeL" class="el-icon-loading"></i>
            <span v-else>
              {{ vipMsgList.depositAmountCurr }}/{{ vipMsgList.depositAmountTotal }}
            </span>
          </el-col>
          <el-col :span="7" class="textR">
            <i v-if="activeL" class="el-icon-loading"></i>
            <span v-else>
              {{ vipMsgList.validBetsCurr }}/{{ vipMsgList.validBetsTotal }}
            </span>
          </el-col>
          <el-col :span="7" class="textR">
            <i v-if="activeL" class="el-icon-loading"></i>
            <span v-else>
              {{ vipMsgList.bjValidBetsCurr }}/{{ vipMsgList.bjValidBetsTotal }}
            </span>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="3" style="color: #fff">描述</el-col>
          <el-col
:span="7"
class="textC"
>({{ vipMsgList.depositAmountStatus === 0 ? "升级" : "保级："
            }}{{ vipMsgList.depositAmountDate }} )存款金额</el-col>
          <el-col
:span="7"
class="textC"
>({{ vipMsgList.validBetsStatus === 0 ? "升级" : "保级："
            }}{{ vipMsgList.validBetsDate }})有效投注</el-col>
          <el-col
:span="7"
class="textC"
>({{ vipMsgList.bjValidBetsStatus === 0 ? "升级" : "保级："
            }}{{ vipMsgList.bjValidBetsDate }})有效投注</el-col>
        </el-row>
      </el-col>
      <el-col :span="10" class="paddingBox">
        <div>
          VIP等级：<i v-if="activeL" class="el-icon-loading"></i>
          <span v-else>
            {{ vipMsgList.grade }}
          </span>
        </div>
        <div>
          VIP经验：<i v-if="activeL" class="el-icon-loading"></i>
          <span v-else>
            {{ vipMsgList.experience }}
          </span>
        </div>
      </el-col>
    </el-row>
    <el-divider></el-divider>
    <div class="titelBox">备注信息</div>
    <div
      v-if="activeL"
      style="
        height: 100px;
        width: 300px;
        line-height: 100px;
        text-align: center;
        font-size: 24px;
      "
    >
      <i class="el-icon-loading"></i>
    </div>
    <div v-else style="width: 70%">
      <el-table
        border
        size="mini"
        class="small-size-table"
        :data="tableList"
        :header-row-style="{ height: '24px', lineHeight: '24px' }"
        style="margin-top: 10px; z-index: 0"
        :header-cell-style="getRowClass"
      >
        <el-table-column align="center" type="index" label="序号"></el-table-column>
        <el-table-column
          prop="createDt"
          align="center"
          width="200px"
          label="更新时间"
        ></el-table-column>
        <el-table-column prop="remark" align="center" label="备注信息"></el-table-column>
        <el-table-column
          prop="operator"
          align="center"
          width="150px"
          label="备注账号"
        ></el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination
        :current-page.sync="page"
        background
        layout="total, sizes,prev, pager, next, jumper"
        :page-size="size"
        :page-sizes="[3, 5, 10]"
        :total="total"
        :pager-count="5"
        style="float: right; padding-top: 10px"
        @current-change="handleCurrentChange"
        @size-change="handleSizeChange"
      ></el-pagination>
      <div class="clear"></div>
    </div>
    <el-dialog
      :title="moduleBox"
      center
      :visible.sync="editVisible"
      :before-close="closeFormDialog"
      width="520px"
    >
      <el-form
        ref="editForm"
        :rules="rules"
        :model="editData"
        label-width="95px"
        @submit.native.prevent="enterSearch"
      >
        <el-form-item v-if="moduleBox === '账号状态'" label="账号状态：" prop="code">
          <el-select
            v-model="editData.code"
            placeholder="请选择"
            @change="changeAccountStatus"
          >
            <el-option
              v-for="item in accountStatusList"
              :key="item.description"
              :label="item.description"
              :value="item.code"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          v-if="moduleBox === '风控层级'"
          label="风控层级："
          prop="windControlId"
        >
          <el-select
            v-model="editData.windControlId"
            placeholder="请选择"
            @change="changeWindControlId"
          >
            <el-option
              v-for="item in riskLevelList"
              :key="item.windControlName"
              :label="item.windControlName"
              :value="item.windControlId"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item v-if="moduleBox === '会员标签'" label="会员标签：" prop="labelId">
          <el-select
            v-model="editData.labelId"
            placeholder="请选择"
            @change="changeLabelId"
          >
            <el-option
              v-for="item in memberLabelList"
              :key="item.labelName"
              :label="item.labelName"
              :value="item.labelId"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item v-if="moduleBox === '出生日期'" label="出生日期：" prop="birth">
          <el-date-picker
            v-model="editData.birth"
            type="date"
            placeholder="选择日期"
            value-format="yyyy-MM-dd HH-mm-ss"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item v-if="moduleBox === '手机号码'" label="手机号码：" prop="mobile">
          <el-input
            v-model="editData.mobile"
            clearable
            size="medium"
            :maxlength="11"
            placeholder="请输入手机号码"
            :disabled="loading"
            @keyup.enter.native="enterSearch"
          ></el-input>
        </el-form-item>
        <el-form-item
          v-if="moduleBox === '姓名'"
          label="姓名："
          prop="realName"
          :maxlength="6"
        >
          <el-input
            v-model="editData.realName"
            clearable
            type="text"
            size="medium"
            :maxlength="6"
            placeholder="请输入姓名"
            :disabled="loading"
            @keyup.enter.native="enterSearch"
          ></el-input>
        </el-form-item>
        <el-form-item
          v-if="moduleBox === '邮箱'"
          label="邮箱："
          prop="email"
          :rules="[
            { required: true, message: '请输入邮箱地址', trigger: 'blur' },
            {
              type: 'email',
              message: '请输入正确的邮箱地址',
              trigger: 'blur',
            },
          ]"
        >
          <el-input
            v-model="editData.email"
            clearable
            type="email"
            size="medium"
            :maxlength="32"
            placeholder="请输入邮箱"
            :disabled="loading"
            @keyup.enter.native="enterSearch"
          ></el-input>
        </el-form-item>
        <el-form-item v-if="moduleBox === '性别'" label="性别：" prop="code">
          <el-select v-model="editData.code" placeholder="请选择" @change="changeGender">
            <el-option
              v-for="item in genderTypeList"
              :key="item.description"
              :label="item.description"
              :value="item.code"
            >
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item
          :label="titel"
          prop="remark"
          :rules="[
            { required: true, message: '请输入备注信息', trigger: 'blur' },
            { min: 2, max: 50, message: '长度在 2 到 50 个字符', trigger: 'blur' },
          ]"
        >
          <el-input
            v-model="editData.remark"
            :maxlength="50"
            type="textarea"
            placeholder="最多可输入50个字符"
          >
          </el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="submitEdit"> 确 定 </el-button>
      </div>
    </el-dialog>
    <el-divider></el-divider>
  </div>
</template>

<script>
import list from '@/mixins/list'
import { getDics } from '@/api/user'
// import dayjs from 'dayjs'
export default {
  mixins: [list],
  props: {
    parentData: { type: Object, default: () => ({}) },
    outlineInfo: { type: Object, default: () => ({}) },
    vipMsg: { type: Object, default: () => ({}) },
    remarksTableData: { type: Object, default: () => ({}) }
  },
  data() {
    const checkPhone = (rule, value, callback) => {
      const phoneReg = /^1[3|4|5|7|8][0-9]{9}$/
      if (!value) {
        return callback(new Error('电话号码不能为空'))
      }
      setTimeout(() => {
        // Number.isInteger是es6验证数字是否为整数的方法,实际输入的数字总是识别成字符串
        // 所以在前面加了一个+实现隐式转换

        if (!Number.isInteger(+value)) {
          callback(new Error('请输入数字值'))
        } else {
          if (phoneReg.test(value)) {
            callback()
          } else {
            callback(new Error('电话号码格式不正确'))
          }
        }
      }, 100)
    }

    return {
      loading: false,
      activeL: true,
      // 编辑信息按钮
      editMsgList: [
        { code: '6', label: '账号状态', applyStatus: '' },
        { code: '8', label: '风控层级', applyStatus: '' },
        { code: '9', label: '会员标签', applyStatus: '' },
        { code: '3', label: '出生日期', applyStatus: '' },
        { code: '4', label: '手机号码', applyStatus: '' },
        { code: '1', label: '姓名', applyStatus: '' },
        { code: '2', label: '性别', applyStatus: '' },
        { code: '5', label: '邮箱', applyStatus: '' }
      ],
      isshow: true,
      // 账号状态
      accountStatusList: [],
      // 风控层级
      riskLevelList: [],
      // 会员标签
      memberLabelList: [],
      // 性别
      genderTypeList: [],
      outlineInfoList: {}, // 基本信息
      vipMsgList: {}, // vip信息
      percentagea: 0,
      percentageb: 0,
      percentagec: 0,
      tableList: [],
      moduleBox: '',
      editVisible: false,
      editData: { code: '', windControlId: '', labelId: '' },
      page: 1,
      size: 3,
      rules: {
        mobile: [{ required: true, validator: checkPhone, trigger: 'blur' }]
      },
      titel: '审核备注：'
    }
  },
  computed: {
    allData() {
      return this.outlineInfo
    }
  },
  watch: {
    allData: {
      handler(newV, oldV) {
        this.outlineInfoList = { ...newV }
        if (newV.auditList && newV.auditList !== null) {
          this.isshow = false
          for (let i = 0; i < newV.auditList.length; i++) {
            const ele = newV.auditList[i]
            for (let j = 0; j < this.editMsgList.length; j++) {
              const val = this.editMsgList[j].code
              if (ele.applyName === val) {
                this.editMsgList[j].applyStatus = ele.applyStatus
              }
            }
          }
        } else {
          for (let i = 0; i < this.editMsgList.length; i++) {
            this.editMsgList[i].applyStatus = ''
          }
          this.isshow = false
        }
      },
      deep: true
    },
    vipMsg: {
      handler(newV) {
        this.vipMsgList = newV
        if (JSON.stringify(newV) !== '{}') {
          if (newV.depositAmountCurr > 0 && newV.depositAmountTotal > 0) {
            const p1 = (newV.depositAmountCurr / newV.depositAmountTotal) * 100
            p1 >= 100 ? (this.percentagea = 100) : (this.percentagea = p1)
          }
          if (newV.validBetsCurr > 0 && newV.validBetsTotal > 0) {
            const p2 = (newV.validBetsCurr / newV.validBetsTotal) * 100
            p2 >= 100 ? (this.percentageb = 100) : (this.percentageb = p2)
          }
          if (newV.bjValidBetsCurr > 0 && newV.bjValidBetsTotal > 0) {
            const p3 = (newV.bjValidBetsCurr / newV.bjValidBetsTotal) * 100
            p3 >= 100 ? (this.percentagec = 100) : (this.percentagec = p3)
          }
        } else {
          this.percentagea = 0
          this.percentageb = 0
          this.percentagec = 0
        }
      },
      deep: true
    },
    remarksTableData: {
      handler(newV) {
        if (newV.totalRecord) {
          this.total = newV.totalRecord
          this.tableList = newV.record
        } else {
          this.tableList = []
        }
      },
      deep: true
    }
  },
  created() {
    this.initGetDics()
  },
  mounted() {},
  methods: {
    initGetDics() {
      getDics().then((res) => {
        if (res.code === 200) {
          this.accountStatusList = res.data.accountStatusType
          this.genderTypeList = res.data.genderType
        }
      })
      this.$api.getMerchantDict().then((res) => {
        if (res.code === 200) {
          this.riskLevelList = res.data.windControl
          this.memberLabelList = res.data.userLabel
        }
      })
    },
    // 会员详情-基本信息-概要信息以及个人资料
    getOutlineInfo(val) {
      this.$api.getOutlineInfo({ userName: val.userName }).then((res) => {
        if (res.code === 200) {
          this.outlineInfoList = res.data
          if (res.data.auditList && res.data.auditList !== null) {
            this.isshow = false
            for (let i = 0; i < res.data.auditList.length; i++) {
              const ele = res.data.auditList[i]
              for (let j = 0; j < this.editMsgList.length; j++) {
                const val = this.editMsgList[j].code
                if (val === ele.applyName) {
                  this.editMsgList[j].applyStatus = ele.applyStatus
                }
              }
            }
          } else {
            for (let i = 0; i < this.editMsgList.length; i++) {
              this.editMsgList[i].applyStatus = ''
            }
            this.isshow = false
          }
          this.getVipInfo(res.data.id)
          const params = { userId: val.userId, pageNum: 1, pageSize: 3 }
          this.$api.getMemberRemarkList(params).then((res) => {
            if (res.code === 200) {
              this.tableList = res.data.record
            }
          })
          this.activeL = false
        }
      })
    },
    // vip信息
    getVipInfo(val) {
      this.$api.getVipInfo({ userId: val }).then((res) => {
        if (res.code === 200) {
          const newV = res.data
          if (JSON.stringify(newV) !== '{}') {
            if (newV.depositAmountCurr > 0 && newV.depositAmountTotal > 0) {
              const p1 = (newV.depositAmountCurr / newV.depositAmountTotal) * 100
              p1 >= 100 ? (this.percentagea = 100) : (this.percentagea = p1)
            }
            if (newV.validBetsCurr > 0 && newV.validBetsTotal > 0) {
              const p2 = (newV.validBetsCurr / newV.validBetsTotal) * 100
              p2 >= 100 ? (this.percentageb = 100) : (this.percentageb = p2)
            }
            if (newV.bjValidBetsCurr > 0 && newV.bjValidBetsTotal > 0) {
              const p3 = (newV.bjValidBetsCurr / newV.bjValidBetsTotal) * 100
              p3 >= 100 ? (this.percentagec = 100) : (this.percentagec = p3)
            }
          }
        }
      })
    },
    // 添加会员备注
    getMemberRemarkAdd(val) {
      this.$api.getMemberRemarkAdd(val).then((res) => {
        this.editData = { code: '', windControlId: '', labelId: '' }
        if (res.code === 200) {
          this.refresh()
          this.$message.success('添加成功')
        }
        this.editVisible = false
      })
    },
    // 编辑信息
    setMemberInfoEdit(val) {
      this.$api.setMemberInfoEdit(val).then((res) => {
        if (res.code === 200) {
          this.$message.success(res.msg)
          this.getOutlineInfo(this.parentData)
          this.editData = { code: '', windControlId: '', labelId: '' }
        }
        this.editVisible = false
      })
    },
    // 备注信息
    getMemberRemarkList(val) {
      const params = {
        userId: val,
        pageNum: this.page,
        pageSize: this.size
      }
      this.$api.getMemberRemarkList(params).then((res) => {
        if (res.code === 200) {
          this.tableList = res.data.record
        }
      })
    },
    refresh() {
      const val = this.parentData
      this.activeL = true
      for (let j = 0; j < this.editMsgList.length; j++) {
        this.editMsgList[j].applyStatus = ''
      }
      this.$nextTick(() => {
        this.getOutlineInfo(val)
      })
    },
    editFn(val) {
      this.moduleBox = val
      switch (val) {
        case '账号状态':
          this.titel = '备注信息：'
          this.editData.code =
            this.outlineInfoList.accountStatus === null
              ? ''
              : this.outlineInfoList.accountStatus
          break
        case '风控层级':
          this.titel = '备注信息：'
          this.editData.windControlId =
            this.outlineInfoList.windControlId === null
              ? ''
              : this.outlineInfoList.windControlId + ''
          for (let i = 0; i < this.riskLevelList.length; i++) {
            const ele = this.riskLevelList[i]
            if (val === ele.windControlId) {
              this.editData.windControlName = ele.windControlName
            }
          }
          break
        case '会员标签':
          this.editData.labelId =
            this.outlineInfoList.labelId === null
              ? ''
              : this.outlineInfoList.labelId + ''
          for (let i = 0; i < this.memberLabelList.length; i++) {
            const ele = this.memberLabelList[i]
            if (val === ele.labelId) {
              this.editData.labelName = ele.labelName
            }
          }
          break
        case '账号备注':
          this.titel = '备注信息：'
          break
        default:
          this.titel = '审核备注：'
          break
      }
      this.editVisible = true
    },
    changeAccountStatus(val) {
      this.editData.code = val
    },
    changeWindControlId(val) {
      this.editData.windControlId = val
      for (let i = 0; i < this.riskLevelList.length; i++) {
        const ele = this.riskLevelList[i]
        if (val === ele.windControlId) {
          this.editData.windControlName = ele.windControlName
        }
      }
    },
    changeLabelId(val) {
      this.editData.labelId = val
      for (let i = 0; i < this.memberLabelList.length; i++) {
        const ele = this.memberLabelList[i]
        if (val === ele.labelId) {
          this.editData.labelName = ele.labelName
        }
      }
    },
    changeGender(val) {
      this.editData.gender = val
    },
    cancel() {
      this.$refs.editForm.resetFields()
      this.editData = { code: '', windControlId: '', labelId: '' }
      this.editVisible = false
    },
    submitEdit() {
      const params = this.editData
      const data = {}
      data.userName = this.parentData.userName
      this.$refs.editForm.validate((valid) => {
        if (valid) {
          const loading = this.$loading({
            lock: true,
            text: 'Loading',
            spinner: 'el-icon-loading',
            background: 'rgba(0, 0, 0, 0.7)'
          })
          if (this.moduleBox === '账号状态') {
            params.accountStatus = params.code
            data.accountStatusAfter = params
            delete params.code
            delete params.labelId
            delete params.windControlId
            this.setMemberInfoEdit(data)
            loading.close()
          }
          if (this.moduleBox === '风控层级') {
            delete params.code
            delete params.labelId
            data.windControlAfter = params
            this.setMemberInfoEdit(data)
            loading.close()
          }
          if (this.moduleBox === '会员标签') {
            delete params.code
            delete params.windControlId
            data.labelAfter = params
            this.setMemberInfoEdit(data)
            loading.close()
          }
          if (this.moduleBox === '出生日期') {
            delete params.code
            delete params.labelId
            delete params.windControlId
            data.birthAfter = params
            this.setMemberInfoEdit(data)
            loading.close()
          }
          if (this.moduleBox === '手机号码') {
            delete params.code
            delete params.labelId
            delete params.windControlId
            data.mobileAfter = params
            this.setMemberInfoEdit(data)
            loading.close()
          }
          if (this.moduleBox === '姓名') {
            delete params.code
            delete params.labelId
            delete params.windControlId
            data.realNameAfter = params
            this.setMemberInfoEdit(data)
            loading.close()
          }
          if (this.moduleBox === '性别') {
            delete params.code
            delete params.labelId
            delete params.windControlId
            data.genderAfter = params
            this.setMemberInfoEdit(data)
            loading.close()
          }
          if (this.moduleBox === '邮箱') {
            delete params.code
            delete params.labelId
            delete params.windControlId
            data.emailAfter = params
            this.setMemberInfoEdit(data)
            loading.close()
          }
          if (this.moduleBox === '账号备注') {
            delete params.code
            delete params.labelId
            delete params.windControlId
            params.userName = this.parentData.userName
            params.userId = this.parentData.userId
            this.getMemberRemarkAdd(params)
            loading.close()
          }
        } else {
          return false
        }
      })
    },
    closeFormDialog() {
      this.$refs.editForm.resetFields()
      this.editData = { code: '', windControlId: '', labelId: '' }
      this.editVisible = false
    },
    handleCurrentChange(val) {
      this.page = val
      if (this.parentData.userId !== null) {
        this.getMemberRemarkList(this.parentData.userId)
      }
    },
    handleSizeChange(val) {
      this.size = val
      if (this.parentData.userId !== null) {
        this.getMemberRemarkList(this.parentData.userId)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
#basicInformation {
  font-size: 14px;
  line-height: 40px;
  padding-top: 10px;
  padding-bottom: 40px;
}
/deep/.el-dialog__header {
  text-align: center;
  color: #909399;
  font-weight: 700;
}
.titelBox {
  font-size: 16px;
  font-weight: bold;
  position: relative;
}
.backgroundTitelBox {
  width: 188px;
  height: 40px;
  text-align: center;
  background: #000;
  color: rgb(255, 255, 255);
}
.refrestBox {
  text-align: center;
  border-right: 1px solid #ccc;
}
.editMsg {
  text-align: center;
  line-height: 18px;
  i {
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 5px;
  }
}
.btngroup button {
  min-width: 40px;
  height: 20px;
  line-height: 18px;
  padding: 0 5px;
}
.msgList {
  line-height: 24px;
  margin-bottom: 10px;
}
.borderL {
  position: absolute;
  right: 0;
  height: 130px;
  border-left: 1px solid #ccc;
}
.textR {
  text-align: right;
}
.paddingBox {
  padding: 0 30px;
}
.paddingL {
  padding-left: 30px;
}
.textC {
  text-align: center;
}
.clear {
  clear: both;
  height: 0;
  line-height: 0;
  font-size: 0;
}
</style>
