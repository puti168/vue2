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
      <el-col :span="16" class="btngroup">
        <el-button
          v-for="(item, index) in editMsgList"
          :key="index"
          :disabled="item.status"
          type="primary"
          @click="editFn(item.label)"
          >{{ item.label }}</el-button>
      </el-col>
    </el-row>
    <div class="titelBox">概要信息</div>
    <el-row class="msgList">
      <el-col :span="5">会员账号：LAKA12</el-col>
      <el-col :span="5">账号类型：正式</el-col>
      <el-col :span="5">帐号状态：正常</el-col>
      <el-col :span="5">风控层级：风控二级</el-col>
      <el-col :span="5">首存时间：2019-09-16 17:00:55</el-col>
      <el-col :span="5">首存金额：10000.00</el-col>
      <el-col :span="5">最后登录时间：2019-09-16 17:00:55</el-col>
      <el-col :span="5">离线天数：20</el-col>
      <el-col :span="5">注册时间：2019-09-16 17:00:55</el-col>
      <el-col :span="5">注册IP：119.92.65.155</el-col>
      <el-col :span="5">注册端：PC</el-col>
      <el-col :span="5">上级代理：MICO123556</el-col>
      <el-col :span="5">会员标签：标签1</el-col>
    </el-row>
    <el-divider></el-divider>
    <div class="titelBox">个人资料</div>
    <el-row class="msgList">
      <el-col :span="5">姓名：张龙</el-col>
      <el-col :span="5">性别：男</el-col>
      <el-col :span="5">出生日期：1911-11-11</el-col>
      <el-col :span="5">手机号码：+86 186****0227</el-col>
      <el-col :span="5">邮箱：akdjajj@qq.com</el-col>
    </el-row>
    <el-divider></el-divider>
    <!-- <div class="titelBox">
      <p class="borderR"></p>
    </div> -->
    <el-row class="titelBox">
      <el-col :span="12">VIP信息</el-col>
      <el-col :span="12" class="borderL"></el-col>
    </el-row>
    <el-row class="msgList">
      <el-col :span="12" class="paddingBox">
        <el-row>
          <el-col :span="3">剩余</el-col>
          <el-col :span="7" class="textR">10000</el-col>
          <el-col :span="7" class="textR">10000</el-col>
          <el-col :span="7" class="textR">10000</el-col>
        </el-row>
        <el-row style="height: 14px">
          <el-col :span="3" style="color: #fff; height: 14px">进度条 </el-col>
          <el-col :span="7" class="">
            <el-progress :percentage="percentage" :stroke-width="12" :show-text="false">
            </el-progress></el-col>
          <el-col :span="7" class="paddingL">
            <el-progress :percentage="percentage" :stroke-width="12" :show-text="false">
            </el-progress></el-col>
          <el-col :span="7" class="paddingL">
            <el-progress :percentage="percentage" :stroke-width="12" :show-text="false">
            </el-progress></el-col>
        </el-row>
        <el-row>
          <el-col :span="3">已完成</el-col>
          <el-col :span="7" class="textR">10000/20000</el-col>
          <el-col :span="7" class="textR">10000/20000</el-col>
          <el-col :span="7" class="textR">10000/20000</el-col>
        </el-row>
        <el-row>
          <el-col :span="3" style="color: #fff">描述</el-col>
          <el-col :span="7" class="textC">(升级)存款金额</el-col>
          <el-col :span="7" class="textC">(升级)有效投注</el-col>
          <el-col :span="7" class="textC">(保级: 2019-12-31)有效投注</el-col>
        </el-row>
      </el-col>
      <el-col :span="10" class="paddingBox">
        <div>VIP等级：5</div>
        <div>VIP经验：20</div>
      </el-col>
    </el-row>
    <el-divider></el-divider>
    <div class="titelBox">备注信息</div>
    <div style="width: 70%">
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
          label="更新时间"
        ></el-table-column>
        <el-table-column prop="remark" align="center" label="备注信息"></el-table-column>
        <el-table-column
          prop="operator"
          align="center"
          label="备注账号"
        ></el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination
        :current-page.sync="page"
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
              :key="item.accountStatus"
              :label="item.label"
              :value="item.accountStatus"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item v-if="moduleBox === '风控层级'" label="风控层级：" prop="riskLevel">
          <el-select v-model="editData.riskLevel" placeholder="请选择">
            <el-option
              v-for="item in riskLevelList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          v-if="moduleBox === '会员标签'"
          label="会员标签："
          prop="memberLabel"
        >
          <el-select v-model="editData.memberLabel" placeholder="请选择">
            <el-option
              v-for="item in memberLabelList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item v-if="moduleBox === '出生日期'" label="出生日期：" prop="birthday">
          <el-date-picker v-model="editData.birthday" type="date" placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item v-if="moduleBox === '手机号码'" label="手机号码：" prop="phoneNum">
          <el-input
            v-model="editData.phoneNum"
            clearable
            size="medium"
            placeholder="请输入手机号码"
            :disabled="loading"
            @keyup.enter.native="enterSearch"
          ></el-input>
        </el-form-item>
        <el-form-item v-if="moduleBox === '姓名'" label="姓名：" prop="name">
          <el-input
            v-model="editData.name"
            clearable
            size="medium"
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
            placeholder="请输入邮箱"
            :disabled="loading"
            @keyup.enter.native="enterSearch"
          ></el-input>
        </el-form-item>
        <el-form-item v-if="moduleBox === '性别'" label="性别：" prop="radio">
          <el-radio-group v-model="radio" @change="changeRadio">
            <el-radio :label="0">保密</el-radio>
            <el-radio :label="1">男</el-radio>
            <el-radio :label="2">女</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item
          label="审核备注："
          prop="remark"
          :rules="[
            { required: true, message: '请输入活动名称', trigger: 'blur' },
            { min: 2, max: 50, message: '长度在 2 到 50 个字符', trigger: 'blur' },
          ]"
        >
          <el-input
            v-model="editData.remark"
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
    userid: { type: Number, default: null },
    memberRemarkList: { type: Object, default: () => ({}) }
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
      // 编辑信息按钮
      editMsgList: [
        { label: '账号状态', status: false },
        { label: '风控层级', status: false },
        { label: '会员标签', status: false },
        { label: '出生日期', status: false },
        { label: '手机号码', status: false },
        { label: '姓名', status: false },
        { label: '性别', status: false },
        { label: '邮箱', status: false },
        { label: '账号备注', status: false }
      ],
      // 账号状态
      accountStatusList: [{ accountStatus: 0, label: '正常' }],
      // 风控层级
      riskLevelList: [],
      // 会员标签
      memberLabelList: [],
      // 提交账号状态编辑
      accountStatusAfter: {
        userName: '',
        accountStatus: 0,
        remark: ''
      },
      // 提交风控层级编辑
      windControlAfter: {
        userName: '',
        remark: '',
        windControlId: 0,
        windControlName: ''
      },
      // 提交会员标签编辑
      labelAfter: {
        userName: '',
        labelName: '',
        labelId: 0,
        remark: ''
      },
      // 提交生日编辑
      birthAfter: {
        userName: '',
        birth: '',
        remark: ''
      },
      // 提交手机号编辑
      mobileAfter: {
        userName: '',
        mobile: '',
        remark: ''
      },
      // 提交性名编辑
      realNameAfter: {
        userName: '',
        realName: '',
        remark: ''
      },
      // 提交性别编辑
      genderAfter: {
        userName: '',
        gender: 0,
        remark: ''
      },
      // 提交邮箱编辑
      emailAfter: {
        userName: '',
        email: '',
        remark: ''
      },
      percentage: 0,
      tableList: [],
      moduleBox: '',
      editVisible: false,
      editData: {},
      radio: 0,
      page: 1,
      size: 3,
      rules: {
        phoneNum: [{ required: true, validator: checkPhone, trigger: 'blur' }]
      }
    }
  },
  computed: {},
  watch: {
    // userid: {
    //   handler(newV) {
    //     if (newV != null) {
    //       this.editData.userid = newV;
    //     }
    //   },
    //   deep: true,
    //   immediate: true,
    // },
    memberRemarkList: {
      handler(newV) {
        if (newV.total) {
          this.total = newV.total
          this.tableList = newV.records
        }
      },
      deep: true,
      immediate: true
    }
  },
  created() {},
  mounted() {
    this.percentage = (10000 / 20000) * 100 + 0
    if (this.percentage > 100) {
      this.percentage = 100
    }
  },
  methods: {
    // 会员详情-基本信息-概要信息以及个人资料
    getOutlineInfo(val) {
      this.$api.getOutlineInfo('', val.userName).then((res) => {
        console.log(res)
      })
    },
    // vip信息
    getVipInfo(val) {
      this.$api.getVipInfo(val).then((res) => {
        console.log(res)
      })
    },
    // 添加会员备注
    getMemberRemarkAdd(val) {
      this.$api.getMemberRemarkAdd(val).then((res) => {
        console.log(res)
        this.editVisible = false
      })
    },
    // 编辑信息
    setMemberInfoEdit(val) {
      this.$api.setMemberInfoEdit(val).then((res) => {
        console.log(res)
        this.editVisible = false
      })
    },
    refresh() {
      this.getOutlineInfo()
      this.getVipInfo()
    },
    editFn(val) {
      this.moduleBox = val
      this.editVisible = true
    },
    changeAccountStatus(val) {
      this.accountStatusAfter.accountStatus = val
    },
    changeRadio(val) {
      console.log(val)
      this.radio = val
      this.editData.radio = val
    },

    cancel() {
      this.$refs.editForm.resetFields()
      this.editVisible = false
    },
    submitEdit() {
      const params = this.editData
      const data = {}
      data.userName = 'fitz2019'
      console.log(this.moduleBox)
      this.$refs.editForm.validate((valid) => {
        console.log(params)
        if (valid) {
          const loading = this.$loading({
            lock: true,
            text: 'Loading',
            spinner: 'el-icon-loading',
            background: 'rgba(0, 0, 0, 0.7)'
          })
          if (this.moduleBox === '账号状态') {
            data.accountStatusAfter = params
            console.log('accountStatusAfter', data)
            this.setMemberInfoEdit(data)
            loading.close()
          }
          if (this.moduleBox === '风控层级') {
            data.windControlAfter = params
            this.setMemberInfoEdit(data)
            loading.close()
          }
          if (this.moduleBox === '会员标签') {
            data.labelAfter = params
            this.setMemberInfoEdit(data)
            loading.close()
          }
          if (this.moduleBox === '出生日期') {
            data.birthAfter = params
            this.setMemberInfoEdit(data)
            loading.close()
          }
          if (this.moduleBox === '手机号码') {
            data.mobileAfter = params
            this.setMemberInfoEdit(data)
            loading.close()
          }
          if (this.moduleBox === '姓名') {
            data.realNameAfter = params
            this.setMemberInfoEdit(data)
            loading.close()
          }
          if (this.moduleBox === '性别') {
            data.genderAfter = params
            this.setMemberInfoEdit(data)
            loading.close()
          }
          if (this.moduleBox === '邮箱') {
            data.emailAfter = params
            this.setMemberInfoEdit(data)
            loading.close()
          }
          if (this.moduleBox === '账号备注') {
            params.userid = this.userid
            console.log(params)
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
      this.editVisible = false
    },
    handleCurrentChange(val) {
      this.page = val
      this.$parent.query()
    },
    handleSizeChange(val) {
      this.size = val
      this.$parent.query()
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
