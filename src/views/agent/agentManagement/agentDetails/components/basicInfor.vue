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
          {{ outlineInfoList.firstDepositTime }}
        </span>
      </el-col>
      <el-col
:span="5"
>代理标签：<i v-if="activeL" class="el-icon-loading"></i>
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
        <span v-else>
          {{ outlineInfoList.leaveLineTime }}
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
          {{ outlineInfoList.registerIp }}
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
          {{ outlineInfoList.registerPhone }}
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
          {{ outlineInfoList.email }}
        </span>
      </el-col>
      <el-col
:span="5"
>支付密码：<i v-if="activeL" class="el-icon-loading"></i>
        <span v-else>
          {{ outlineInfoList.email }}
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
        <el-form-item
          v-if="moduleBox === '账号状态'"
          label="账号状态："
          prop="accountStatus"
        >
          <el-select
            v-model="editData.accountStatus"
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
        <el-form-item
          v-if="moduleBox === '支付密码重置'"
          label="支付密码重置："
          prop="labelId"
        >
          <el-input></el-input>
        </el-form-item>
        <el-form-item
          v-if="moduleBox === '账号备注' || moduleBox === '入口权限'"
          label="备注信息："
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
        <el-form-item
          v-else
          label="审核备注："
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
    remarksTableData: { type: Object, default: () => ({}) }
  },
  data() {
    return {
      loading: false,
      activeL: true,
      // 编辑信息按钮
      editMsgList: [
        { code: '6', label: '账号状态', applyStatus: '' },
        { code: '8', label: '风控层级', applyStatus: '' },
        { code: '9', label: '代理标签', applyStatus: '' },
        { code: '', label: '账号备注', applyStatus: '' },
        { code: '', label: '入口权限', applyStatus: '' },
        { code: '3', label: '支付密码重置', applyStatus: '' }
      ],
      // 账号状态
      accountStatusList: [],
      // 风控层级
      riskLevelList: [],
      // 代理标签
      memberLabelList: [],
      // 性别
      genderTypeList: [],
      outlineInfoList: {}, // 基本信息
      tableList: [],
      moduleBox: '',
      editVisible: false,
      editData: {},
      page: 1,
      size: 3
    }
  },
  computed: {},
  watch: {
    outlineInfo: {
      handler(newV) {
        this.outlineInfoList = { ...newV }
        console.log('newV.auditList', newV.auditList)
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
          const params = { userId: val.userId, pageNum: 1, pageSize: 3 }
          this.$api.getMemberRemarkList(params).then((res) => {
            if (res.code === 200) {
              this.tableList = res.data.record
            }
          })
        }
      })
    },
    // 添加会员备注
    getMemberRemarkAdd(val) {
      this.$api.getMemberRemarkAdd(val).then((res) => {
        this.editData = {}
        if (res.code === 200) {
          this.$message.success('添加成功')
          this.getOutlineInfo(this.parentData)
        }
        this.editVisible = false
      })
    },
    // 编辑信息
    setProxyDataInfoEdit(val) {
      this.$api.setProxyDataInfoEdit(val).then((res) => {
        if (res.code === 200) {
          this.$message.success(res.msg)
          this.getOutlineInfo(this.parentData)
          this.editData = {}
        }
        this.editVisible = false
      })
    },
    // 备注信息
    getMemberRemarkList(val) {
      const params = { userId: val, pageNum: this.page, pageSize: this.size }
      this.$api.getMemberRemarkList(params).then((res) => {
        if (res.code === 200) {
          this.tableList = res.data.record
        }
      })
    },
    refresh() {
      const val = this.parentData
      this.getOutlineInfo(val)
    },
    editFn(val) {
      this.moduleBox = val
      this.editVisible = true
    },
    changeAccountStatus(val) {
      this.editData.accountStatus = val
    },
    changeWindControlId(val) {
      for (let i = 0; i < this.memberLabelList.length; i++) {
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
    changeGender(val) {
      this.editData.gender = val
    },
    cancel() {
      this.$refs.editForm.resetFields()
      this.editData = {}
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
            delete params.code
            data.accountStatusAfter = params
            this.setProxyDataInfoEdit(data)
            loading.close()
          }
          if (this.moduleBox === '风控层级') {
            data.windControlAfter = params
            this.setProxyDataInfoEdit(data)
            loading.close()
          }
          if (this.moduleBox === '代理标签') {
            data.labelAfter = params
            this.setProxyDataInfoEdit(data)
            loading.close()
          }
          if (this.moduleBox === '账号备注') {
            data.payPasswordAfter = params
            this.setProxyDataInfoEdit(data)
            loading.close()
          }
          if (this.moduleBox === '入口权限') {
            data.entryAuthorityAfter = params
            this.setProxyDataInfoEdit(data)
            loading.close()
          }
          if (this.moduleBox === '账号备注') {
            params.userName = this.parentData.userName
            params.remarkAfter = params.remark
            delete params.remark
            this.setProxyDataInfoEdit(params)
            loading.close()
          }
        } else {
          return false
        }
      })
    },
    closeFormDialog() {
      this.$refs.editForm.resetFields()
      this.editData = {}
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
