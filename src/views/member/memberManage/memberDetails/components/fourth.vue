<template>
  <div id="basicInformation">
    <el-row>
      <el-col :span="4" class="backgroundTitelBox">银行卡/虚拟币账号信息</el-col>
      <el-col :span="2" class="refrestBox">
        <el-button type="primary" icon="el-icon-refresh" @click="refresh">刷新</el-button>
      </el-col>
    </el-row>
    <div class="titelBox">银行卡</div>
    <div
      v-if="activeL"
      style="
        height: 100px;
        width: 180px;
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
        :data="resBankList"
        :header-row-style="{ height: '24px', lineHeight: '24px' }"
        style="margin: 10px 0 30px 0; z-index: 0"
        :header-cell-style="getRowClass"
      >
        <el-table-column
          align="center"
          prop="modifyDt"
          label="绑定时间"
        ></el-table-column>
        <el-table-column
          prop="bankName"
          align="center"
          label="银行名称"
        ></el-table-column>
        <el-table-column
          prop="cnName"
          align="center"
          label="持卡人姓名"
        ></el-table-column>
        <el-table-column prop="cardNumber" align="center" label="卡号"></el-table-column>
        <el-table-column
          prop="bankAddress"
          align="center"
          label="分行地址"
        ></el-table-column>
        <el-table-column prop="status" align="center" label="银行卡状态">
          <template slot-scope="scope">
            {{ typeFilter(scope.row.status, "bindType") }}
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="titelBox">虚拟币账号信息</div>
    <div
      v-if="activeL"
      style="
        height: 100px;
        width: 180px;
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
        :data="resVirtualList"
        :header-row-style="{ height: '24px', lineHeight: '24px' }"
        style="margin: 10px 0 30px 0; z-index: 0"
        :header-cell-style="getRowClass"
      >
        <el-table-column
          align="center"
          prop="modifyDt"
          label="绑定时间"
        ></el-table-column>
        <el-table-column
          prop="virtual_address"
          align="center"
          label="虚拟币账户地址"
        ></el-table-column>
        <el-table-column
          prop="virtual_kind"
          align="center"
          label="虚拟币种类"
        ></el-table-column>
        <el-table-column
          prop="virtual_protocol"
          align="center"
          label="虚拟币协议"
        ></el-table-column>
        <el-table-column prop="status" align="center" label="虚拟币账户状态">
          <template slot-scope="scope">
            {{ typeFilter(scope.row.status, "bindType") }}
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import list from '@/mixins/list'
// import dayjs from 'dayjs'
export default {
  mixins: [list],
  props: {
    parentData: { type: Object, default: () => ({}) },
    bankList: { type: Array, default: () => [] },
    virtualList: { type: Array, default: () => [] }
  },
  data() {
    return {
      activeL: true,
      resBankList: [],
      resVirtualList: []
    }
  },
  computed: {},
  watch: {
    bankList: {
      handler(newV) {
        this.resBankList = newV
      },
      deep: true
    },
    virtualList: {
      handler(newV) {
        this.resVirtualList = newV
      },
      deep: true
    }
  },
  created() {},
  mounted() {},
  methods: {
    // 银行卡/虚拟币行号信息
    getBankCardBank(val) {
      const dataType1 = { userId: val, dataType: 2 }
      this.$api.getBankCardBank(dataType1).then((res) => {
        if (res.code === 200) {
          this.resVirtualList = res.data
        }
      })
      const dataType2 = { userId: val, dataType: 1 }
      this.$api.getBankCardBank(dataType2).then((res) => {
        if (res.code === 200) {
          this.resBankList = res.data
        }
      })
    },
    refresh() {
      this.getBankCardBank(this.parentData.userId)
    }
  }
}
</script>

<style lang="scss" scoped>
#basicInformation {
  font-size: 14px;
  line-height: 40px;
  min-height: 800px;
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
  line-height: 24px;
  margin-top: 20px;
  display: inline-block;
  border-bottom: 3px solid #58a3f7;
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
}
</style>
