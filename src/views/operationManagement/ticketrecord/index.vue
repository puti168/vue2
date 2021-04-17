<template>
  <div class="game-container report-container">
    <div class="header flex-h flex-bc">
      <h2 class="h2-line">门票记录</h2>
      <div class="head flex-h-end">
        <el-button type="primary" icon="el-icon-search" size="medium" @click="loadPage">
          查询
        </el-button>
        <el-button icon="el-icon-edit" size="medium" @click="reset"> 重置 </el-button>
      </div>
    </div>
    <div class="view-container dealer-container">
      <div class="params">
        <query-form></query-form>
      </div>
      <div class="content">
        <el-table
          v-loading="loading"
          border
          size="mini"
          class="small-size-table"
          :data="dataList"
          style="width: 100%"
          :header-cell-style="getRowClass"
        >
          <el-table-column prop="Betnumber" align="center" label="时间">
          </el-table-column>
          <el-table-column prop="menberaccount" align="center" label="会员账号/昵称">
            <template slot-scope="scope">
              <el-tooltip placement="top">
                <div slot="content">{{ scope.row.menberaccount }}</div>
                <div>{{ scope.row.menberaccount }}</div>
              </el-tooltip>
            </template>
          </el-table-column>
          <el-table-column prop="merchantname" align="center" label="商户名称">
          </el-table-column>
          <el-table-column prop="merchantcode" align="center" label="商户编码">
          </el-table-column>
          <el-table-column prop="Contestname" align="center" label="变更类型">
          </el-table-column>
          <el-table-column
            prop="roundinfo"
            align="center"
            label="门票名称"
          ></el-table-column>
          <el-table-column
            prop="tableinfo"
            align="center"
            label="门票ID"
          ></el-table-column>
          <el-table-column prop="gamesessionnumber" align="center" label="数量">
          </el-table-column>
          <el-table-column prop="strategy" align="center" label="持有门票">
            <template slot="header">
              <span>持有门票</span>
              <el-tooltip popper-class="tooltip" placement="top">
                <i class="el-icon-warning-outline"></i>
                <div slot="content" class="tooltip-content">
                  点击查看该会员持有门票详情，只记录最新一条数据的门票详情
                </div>
              </el-tooltip>
            </template>
            <template slot-scope="scope">
              <span style="color: #c689ff">{{ scope.row.strategy }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="remarks" align="center" label="备注"> </el-table-column>
        </el-table>
        <!-- 分页 -->
        <el-pagination
          v-show="dataList.length > 0"
          :current-page.sync="pageIndex"
          layout="total, sizes,prev, pager, next, jumper"
          :page-size="pageSize"
          :page-sizes="$store.getters.pageSizes"
          :total="15"
          @current-change="handleCurrentChange"
          @size-change="handleSizeChange"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import list from '@/mixins/list'
import queryForm from './components/queryForm'
export default {
  name: '',
  components: {
    queryForm
  },
  mixins: [list],
  data() {
    return {
      dataList: []
    }
  },
  computed: {},
  mounted() {
    for (let i = 0; i < 10; i++) {
      this.dataList[i] = {
        Betnumber: '2021-02-13 20:28:54',
        menberaccount: 'zj7flily0006',
        merchantname: '亚博体育',
        merchantcode: 'YBTIS',
        Contestname: '报名比赛',
        roundinfo: 'BO月赛争霸赛门票',
        tableinfo: '9956458',
        gamesessionnumber: '1',
        strategy: '16张',
        remarks: 'BO月赛争霸赛  第2名  012345678901234'
      }
    }
  },
  methods: {
    loadDetail() {},
    loadPage() {
      if (!this.query.roundNo) {
        this.$message({
          message: '请输入会员账号！',
          type: 'error'
        })
        return
      }
      this.loading = true
    },
    reset() {
      this.query.memberAccount = ''
    },
    handleCurrentChange() {
      this.loadDetail()
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
</style>
