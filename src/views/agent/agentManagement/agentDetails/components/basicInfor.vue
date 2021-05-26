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
      <el-col :span="16" class="btngroup aaaaa">
        <el-button
          v-for="(item, index) in editMsgList"
          :key="index"
          type="primary"
          :disabled="item.applyStatus === '1'"
          @click="editFn(item.label)"
          >{{ item.label }}</el-button>
        <!-- <el-button type="primary" @click="editFn('账号备注')">账号备注</el-button> -->
      </el-col>
    </el-row>
    <div class="titelBox">概要信息</div>
    <el-row class="msgList">
      <el-col
:span="5"
>代理账号：<i v-if="activeL" class="el-icon-loading"></i>
        <span v-else>{{ outlineInfoList.userName }}</span>
      </el-col>
      <el-col :span="5">
        代理类型：<i v-if="activeL" class="el-icon-loading"></i>
        <span v-else>
          {{ typeFilter(outlineInfoList.accountType, "accountType") }}
        </span>
      </el-col>
      <el-col
:span="5"
>帐号状态：<i v-if="activeL" class="el-icon-loading"></i>
        <span v-else>
          {{ typeFilter(outlineInfoList.accountStatus, "accountStatusType") }}
        </span>
      </el-col>
      <el-col
:span="5"
>风控层级：<i v-if="activeL" class="el-icon-loading"></i>
        <span v-else>
          {{ outlineInfoList.windControlName }}
        </span>
      </el-col>
      <el-col
:span="5"
>合营代码：<i v-if="activeL" class="el-icon-loading"></i>
        <span v-else>
          {{ outlineInfoList.invitationCode }}
        </span>
      </el-col>
      <el-col
:span="5"
>代理标签：<i v-if="activeL" class="el-icon-loading"></i>
        <span v-else>
          {{ outlineInfoList.labelName }}
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
        <span v-else>
          {{ outlineInfoList.offLineDays }}
        </span>
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
      <el-col
:span="5"
>入口权限：<i v-if="activeL" class="el-icon-loading"></i>
        <span v-else>
          {{ typeFilter(outlineInfoList.entryAuthority, "entrAuthorityType") }}
        </span>
      </el-col>
    </el-row>
    <el-divider></el-divider>
    <div class="titelBox">个人资料</div>
    <el-row class="msgList">
      <el-col
:span="5"
>姓名：<i v-if="activeL" class="el-icon-loading"></i>
        <span v-else>
          {{ outlineInfoList.realName }}
        </span>
      </el-col>
      <el-col
:span="5"
>性别：<i v-if="activeL" class="el-icon-loading"></i>
        <span v-else>
          {{ typeFilter(outlineInfoList.gender, "genderType") }}
        </span>
      </el-col>
      <el-col
:span="5"
>出生日期：<i v-if="activeL" class="el-icon-loading"></i>
        <span v-else>
          {{ outlineInfoList.birth }}
        </span>
      </el-col>
      <el-col
:span="5"
>手机号码：<i v-if="activeL" class="el-icon-loading"></i>
        <span v-else>
          {{ outlineInfoList.mobile }}
        </span>
      </el-col>
      <el-col
:span="5"
>邮箱：<i v-if="activeL" class="el-icon-loading"></i>
        <span v-else>
          {{ outlineInfoList.email }}
        </span>
      </el-col>
      <el-col
:span="5"
>QQ：<i v-if="activeL" class="el-icon-loading"></i>
        <span v-else>
          {{ outlineInfoList.qq }}
        </span>
      </el-col>
      <el-col
:span="5"
>支付密码：<i v-if="activeL" class="el-icon-loading"></i>
        <span v-else-if="editMsgList[5].applyStatus === '1'" class="orangeColor">
          审核中 &nbsp;&nbsp; {{ outlineInfoList.payPassword }}
        </span>
        <span v-else>
          {{ outlineInfoList.payPassword }}
        </span>
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
        :model="editData"
        label-width="110px"
        @submit.native.prevent="enterSearch"
      >
        <el-form-item v-if="moduleBox === '账号状态'" label="账号状态：" prop="code">
          <el-select
            v-model="editData.code"
            placeholder="请选择"
            @change="changeAccountStatus"
          >
            <el-option
              v-for="item in accountStatusType"
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
        <el-form-item v-if="moduleBox === '代理标签'" label="代理标签：" prop="labelId">
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
        <el-form-item v-if="moduleBox === '入口权限'" label="入口权限：" prop="code">
          <el-select
            v-model="editData.code"
            placeholder="请选择"
            @change="changeEntrAuthorityType"
          >
            <el-option
              v-for="item in entrAuthorityType"
              :key="item.description"
              :label="item.description"
              :value="item.code"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          v-if="moduleBox === '支付密码重置'"
          label="支付密码重置："
          prop="pws"
        >
          <el-input placeholder="密码重置" disabled></el-input>
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
// import dayjs from 'dayjs'
export default {
  mixins: [list],
  props: {
    parentData: { type: Object, default: () => ({}) },
    outlineInfo: { type: Object, default: () => ({}) },
    remarksTableData: { type: Object, default: () => ({}) }
  },
  data() {
    return {
      loading: false,
      activeL: true,
      // 编辑信息按钮
      editMsgList: [
        { code: '', label: '账号状态', applyStatus: '' },
        { code: '', label: '风控层级', applyStatus: '' },
        { code: '', label: '代理标签', applyStatus: '' },
        { code: '', label: '账号备注', applyStatus: '' },
        { code: '', label: '入口权限', applyStatus: '' },
        { code: '6', label: '支付密码重置', applyStatus: '' }
      ],
      // 风控层级
      riskLevelList: [],
      // 代理标签
      memberLabelList: [],
      outlineInfoList: {}, // 基本信息
      tableList: [],
      moduleBox: '',
      titel: '备注备注：',
      editVisible: false,
      editData: { code: '', windControlId: '', labelId: '' },
      page: 1,
      size: 3
    }
  },
  computed: {
    accountStatusType() {
      return this.globalDics.accountStatusType
    },
    entrAuthorityType() {
      return this.globalDics.entrAuthorityType
    },
    outlineInfoData() {
      return this.outlineInfo
    }
  },
  watch: {
    outlineInfoData: {
      handler(newV) {
        console.log(newV)
        this.outlineInfoList = { ...newV }
        if (newV.auditList && newV.auditList !== null) {
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
        }
      },
      deep: true
    },
    remarksTableData: {
      handler(newV) {
        if (newV.totalRecord && newV.totalRecord > 0) {
          this.total = newV.totalRecord
          this.tableList = newV.record
        } else {
          this.total = 0
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
      this.$api.agentDictAPI().then((res) => {
        if (res.code === 200) {
          this.riskLevelList = res.data.windControl
          this.memberLabelList = res.data.userLabel
          console.log('风控，标签', res)
        }
      })
    },
    // 会员详情-基本信息-概要信息以及个人资料
    getProxyDetailQueryDetail(val) {
      this.$api.getProxyDetailQueryDetail({ userName: val.userName }).then((res) => {
        if (res.code === 200) {
          this.outlineInfoList = res.data
          this.editData = { code: '', windControlId: '', labelId: '' }
          if (res.data.auditList && res.data.auditList !== null) {
            for (let i = 0; i < res.data.auditList.length; i++) {
              const ele = res.data.auditList[i]
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
          }
          const params = { userId: val.userId, pageNum: 1, pageSize: 3 }
          this.$api.getProxyDetailRemark(params).then((res) => {
            if (res.code === 200) {
              this.tableList = res.data.record
            }
          })
        }
        this.activeL = false
      })
    },
    // 编辑信息
    setProxyDataInfoEdit(val) {
      this.$api.setProxyDataInfoEdit(val).then((res) => {
        if (res.code === 200) {
          this.$message.success(res.msg)
          this.refresh()
          this.editData = { code: '', windControlId: '', labelId: '' }
        }
        this.editVisible = false
      })
    },
    // 备注信息
    getProxyDetailRemark(val) {
      const params = { userId: val, pageNum: this.page, pageSize: this.size }
      this.$api.getProxyDetailRemark(params).then((res) => {
        if (res.code === 200) {
          this.tableList = res.data.record
        }
      })
    },
    refresh() {
      this.activeL = true
      for (let i = 0; i < this.editMsgList.length; i++) {
        this.editMsgList[i].applyStatus = ''
      }
      const val = this.parentData
      this.getProxyDetailQueryDetail(val)
    },
    editFn(val) {
      this.moduleBox = val
      this.editData = { code: '', windControlId: '', labelId: '' }
      switch (val) {
        case '账号状态':
          this.editData.code =
            this.outlineInfoList.accountStatus === null
              ? ''
              : this.outlineInfoList.accountStatus + ''
          break
        case '风控层级':
          this.editData.windControlId =
            this.outlineInfoList.windControlId === '0'
              ? ''
              : this.outlineInfoList.windControlId + ''
          for (let i = 0; i < this.riskLevelList.length; i++) {
            const ele = this.riskLevelList[i]
            if (this.editData.windControlId === ele.windControlId) {
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
            if (this.editData.labelId === ele.labelId) {
              this.editData.labelName = ele.labelName
            }
          }
          break
        case '入口权限':
          this.editData.code = this.outlineInfoList.entryAuthority
          break
        case '支付密码重置':
          this.titel = '审核备注'
          break

        default:
          this.titel = '备注信息：'
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
        if (ele.windControlId === val) {
          this.editData.windControlName = ele.windControlName
        }
      }
    },
    changeLabelId(val) {
      for (let i = 0; i < this.memberLabelList.length; i++) {
        const ele = this.memberLabelList[i]
        if (ele.labelId === val) {
          this.editData.labelName = ele.labelName
        }
      }
    },
    changeEntrAuthorityType(val) {
      console.log(val)
      this.editData.entryAuthority = val
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
            delete params.code
            delete params.labelId
            delete params.windControlId
            data.accountStatusAfter = params
            this.setProxyDataInfoEdit(data)
            loading.close()
          }
          if (this.moduleBox === '风控层级') {
            delete params.code
            delete params.labelId
            data.windControlAfter = params
            this.setProxyDataInfoEdit(data)
            loading.close()
          }
          if (this.moduleBox === '代理标签') {
            delete params.code
            delete params.windControlId
            data.labelAfter = params
            this.setProxyDataInfoEdit(data)
            loading.close()
          }
          if (this.moduleBox === '账号备注') {
            delete params.code
            delete params.labelId
            delete params.windControlId
            data.remarkAfter = params.remark
            this.setProxyDataInfoEdit(data)
            loading.close()
          }
          if (this.moduleBox === '入口权限') {
            delete params.code
            delete params.labelId
            delete params.windControlId
            data.entryAuthorityAfter = params
            this.setProxyDataInfoEdit(data)
            loading.close()
          }
          if (this.moduleBox === '支付密码重置') {
            delete params.code
            delete params.labelId
            delete params.windControlId
            data.payPasswordAfter = params
            this.setProxyDataInfoEdit(data)
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
        this.getProxyDetailRemark(this.parentData.userId)
      }
    },
    handleSizeChange(val) {
      this.size = val
      if (this.parentData.userId !== null) {
        this.getProxyDetailRemark(this.parentData.userId)
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
