<template>
  <div id="basicInformation">
    <el-row>
      <el-col :span="4" class="backgroundTitelBox">登录信息</el-col>
      <el-col :span="2" class="refrestBox">
        <el-button
          type="primary"
          icon="el-icon-refresh"
          :disabled="queryData.userId === ''"
          @click="refresh"
          >刷新</el-button>
      </el-col>
    </el-row>
    <div style="width: 70%">
      <el-table
        border
        size="mini"
        class="small-size-table"
        :data="dataList"
        :header-row-style="{ height: '24px', lineHeight: '24px' }"
        style="margin: 10px 0 30px 0; z-index: 0"
        :header-cell-style="getRowClass"
      >
        <el-table-column align="center" label="登录时间"></el-table-column>
        <el-table-column prop="updateDt" align="center" label="状态"></el-table-column>
        <el-table-column prop="updateDt" align="center" label="IP地址"></el-table-column>
        <el-table-column
          prop="updateDt"
          align="center"
          label="IP归属地"
        ></el-table-column>
        <el-table-column
          prop="updateDt"
          align="center"
          label="登录网址"
        ></el-table-column>
        <el-table-column
          prop="updateDt"
          align="center"
          label="登录终端"
        ></el-table-column>
        <el-table-column prop="updateDt" align="center" label="设备号"></el-table-column>
        <el-table-column
          prop="updateDt"
          align="center"
          label="设备版本"
        ></el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination
        :current-page.sync="page"
        layout="total, sizes,prev, pager, next, jumper"
        :page-size="size"
        :page-sizes="[5, 10, 20]"
        :total="total"
        :pager-count="5"
        style="float: right; padding-top: 10px"
        @current-change="handleCurrentChange"
        @size-change="handleSizeChange"
      ></el-pagination>
      <div class="clear"></div>
    </div>
  </div>
</template>

<script>
import list from '@/mixins/list'
// import dayjs from 'dayjs'
export default {
  mixins: [list],
  props: { queryData: { type: Object, default: () => ({}) } },
  data() {
    return {
      page: 1,
      size: 10,
      dataList: []
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    // 会员登录日志查询
    getLogMemberLoginLog(val) {
      const params = { userId: val, pageNum: this.page, pageSize: this.size }
      this.$api.getLogMemberLoginLog(params).then((res) => {
        console.log('会员登录日志查询', res)
      })
    },
    refresh() {
      this.page = 1
      this.size = 10
      this.getLogMemberLoginLog(this.queryData.userId)
    },
    handleCurrentChange(val) {
      this.page = val
      if (this.queryData.userId !== null) {
        this.getLogMemberLoginLog(this.queryData.userId)
      }
    },
    handleSizeChange(val) {
      this.size = val
      if (this.queryData.userId !== null) {
        this.getLogMemberLoginLog(this.queryData.userId)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
#basicInformation {
  font-size: 14px;
  line-height: 40px;
  min-height: 400px;
  padding-top: 10px;
}
/deep/.el-dialog__header {
  text-align: center;
  color: #909399;
  font-weight: 700;
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
.clear {
  clear: both;
  height: 0;
  line-height: 0;
  font-size: 0;
}
</style>
