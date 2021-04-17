<template>
  <div class="game-container report-container">
    <div class="header flex-h flex-bc">
      <h2 class="h2-line">会员流水</h2>
      <div class="head flex-h-end">
        <el-button type="primary" icon="el-icon-search" size="medium" @click="loadPage">
          查询
        </el-button>
        <el-button icon="el-icon-edit" size="medium" @click="reset"> 重置 </el-button>
      </div>
    </div>
    <div class="view-container dealer-container">
      <div class="params">
        <query-form ref="queryform"></query-form>
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
          <el-table-column type="index" align="center" label="序号"> </el-table-column>
          <el-table-column prop="Betnumber" align="center" label="流水单号">
          </el-table-column>
          <el-table-column prop="merchantname" align="center" label="商户名称">
          </el-table-column>
          <el-table-column prop="menberaccount" align="center" label="会员账号">
          </el-table-column>
          <el-table-column prop="nickname" align="center" label="会员昵称">
          </el-table-column>
          <el-table-column prop="merchantcode" align="center" label="帐变账户">
          </el-table-column>
          <el-table-column prop="Contestname" align="center" label="流水类型">
          </el-table-column>
          <el-table-column
            prop="roundinfo"
            align="center"
            label="交易前账户余额"
          ></el-table-column>
          <el-table-column
            prop="tableinfo"
            align="center"
            label="交易金额"
          ></el-table-column>
          <el-table-column prop="gamesessionnumber" align="center" label="交易后账户余额">
          </el-table-column>
          <el-table-column prop="strategy" align="center" label="交易时间">
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
        Betnumber: 'YBZR201910250000000001',
        menberaccount: 'zj7flily0006',
        nickname: 'ZJ7F58547728',
        merchantname: '亚洲真人游戏',
        merchantcode: '游戏币',
        Contestname: '彩金转游戏币',
        roundinfo: '0',
        tableinfo: '750.00',
        gamesessionnumber: '750.00',
        strategy: '2019-10-25 10:59:21',
        remarks: '彩金转游戏币670.00'
      }
    }
  },
  methods: {
    loadDetail() {},
    loadPage() {
      console.log(this.$refs.queryform.checkedCities)
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
