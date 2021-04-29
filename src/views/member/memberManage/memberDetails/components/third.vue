<template>
  <div id="basicInformation">
    <el-row>
      <el-col :span="4" class="backgroundTitelBox">登录信息</el-col>
      <el-col :span="2" class="refrestBox">
        <el-button type="primary" icon="el-icon-refresh">刷新</el-button>
      </el-col>
    </el-row>
    <div style="width: 70%">
      <el-table
        border
        size="mini"
        class="small-size-table"
        :data="dataList"
        style="margin-top: 30px; z-index: 0"
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
        :current-page.sync="pageNum"
        layout="total, sizes,prev, pager, next, jumper"
        :page-size="3"
        :page-sizes="[3, 5, 10]"
        :total="total"
        :pager-count="5"
        style="float: right; padding-top: 10px"
        @current-change="handleCurrentChange"
        @size-change="handleSizeChange"
      ></el-pagination>
      <div class="clear"></div>
    </div>
    <el-divider></el-divider>
  </div>
</template>

<script>
import list from '@/mixins/list'
// import dayjs from 'dayjs'
export default {
  mixins: [list],
  props: {},
  data() {
    return {
      dataList: []
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    handleCurrentChange(val) {
      this.pageNum = val
      this.loadData()
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
