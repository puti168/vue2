<template>
  <div id="basicInformation">
    <el-row>
      <el-col :span="4" class="backgroundTitelBox">基本信息</el-col>
      <el-col :span="2" class="refrestBox">
        <el-button type="primary" icon="el-icon-refresh">刷新</el-button>
      </el-col>
      <el-col :span="2" class="editMsg">
        <i class="el-icon-edit-outline"></i><br />
        编辑信息
      </el-col>
      <el-col :span="16" class="btngroup">
        <el-button
          v-for="(item, index) in editMsgList"
          :key="index"
          type="primary"
          @click="editFn(item)"
          >{{ item }}</el-button>
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
        :page-sizes="[1, 2, 10]"
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
        ref="form"
        :model="editData"
        label-width="85px"
        @submit.native.prevent="enterSearch"
      >
        <el-form-item v-if="moduleBox === '账号状态'" label="账号状态：">
          <el-select v-model="editData.accountStatus" placeholder="请选择">
            <el-option
              v-for="item in accountStatusList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item v-if="moduleBox === '风控层级'" label="风控层级：">
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
        <el-form-item v-if="moduleBox === '会员标签'" label="会员标签：">
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
        <el-form-item v-if="moduleBox === '出生日期'" label="出生日期：">
          <el-date-picker v-model="editData.value" type="date" placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item v-if="moduleBox === '手机号码'" label="手机号码：">
          <el-input
            v-model="editData.bankName"
            clearable
            size="medium"
            placeholder="请输入手机号码"
            :disabled="loading"
            @keyup.enter.native="enterSearch"
          ></el-input>
        </el-form-item>
        <el-form-item v-if="moduleBox === '姓名'" label="姓名：">
          <el-input
            v-model="editData.bankName"
            clearable
            size="medium"
            placeholder="请输入姓名"
            :disabled="loading"
            @keyup.enter.native="enterSearch"
          ></el-input>
        </el-form-item>
        <el-form-item v-if="moduleBox === '邮箱'" label="邮箱：">
          <el-input
            v-model="editData.bankName"
            clearable
            type="email"
            size="medium"
            placeholder="请输入邮箱"
            :disabled="loading"
            @keyup.enter.native="enterSearch"
          ></el-input>
        </el-form-item>
        <el-form-item v-if="moduleBox === '性别'" label="性别：">
          <el-radio v-model="editData.radio" label="1">男</el-radio>
          <el-radio v-model="editData.radio" label="2">女</el-radio>
          <el-radio v-model="editData.radio" label="3">保密</el-radio>
        </el-form-item>

        <el-form-item label="审核备注：">
          <el-input v-model="editData.textarea" type="textarea" placeholder="请输入内容">
          </el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editVisible = false">取 消</el-button>
        <el-button v-if="moduleBox == '新增银行信息'" type="primary" @click="submitAdd">
          确 定
        </el-button>
        <el-button v-else type="primary" @click="submitEdit"> 确 定 </el-button>
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
  props: { memberRemarkList: { type: Object, default: () => ({}) } },
  data() {
    return {
      editMsgList: [
        '账号状态',
        '风控层级',
        '会员标签',
        '出生日期',
        '手机号码',
        '姓名',
        '性别',
        '邮箱',
        '账号备注'
      ],
      accountStatusList: [
        {
          value: '1',
          label: '正常'
        },
        {
          value: '2',
          label: '游戏锁定'
        },
        {
          value: '3',
          label: '登录锁定'
        },
        {
          value: '4',
          label: '充值锁定'
        }
      ],
      riskLevelList: [
        {
          value: '1',
          label: '一级'
        },
        {
          value: '2',
          label: '二级'
        },
        {
          value: '3',
          label: '三级'
        },
        {
          value: '4',
          label: '四级'
        }
      ],
      memberLabelList: [
        {
          value: '1',
          label: '标签一'
        },
        {
          value: '2',
          label: '标签二'
        },
        {
          value: '3',
          label: '标签三'
        },
        {
          value: '4',
          label: '标签四'
        }
      ],
      percentage: 0,
      tableList: [],
      moduleBox: '',
      editVisible: false,
      editData: { textarea: '' },
      page: 1,
      size: 3
    }
  },
  computed: {},
  watch: {
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
    editFn(val) {
      this.moduleBox = val
      this.editVisible = true
    },
    submitAdd() {},
    submitEdit() {},
    closeFormDialog() {
      this.editData = {}
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
  line-height: 20px;
  i {
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 5px;
  }
}
.btngroup button {
  min-width: 40px;
  height: 20px;
  line-height: 20px;
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
