<template>
  <div class="game-container report-container">
    <div class="view-container dealer-container">
      <el-form ref="form" :inline="true">
        <el-form-item label="比赛名称:">
          <span>{{ rankingRewardsData.Contestname }}</span>
        </el-form-item>
        <el-form-item label="比赛编号:">
          <span>{{ rankingRewardsData.code }}</span>
        </el-form-item>
      </el-form>
      <el-form ref="form" :inline="true" :model="query">
        <el-form-item label="会员账号:">
          <el-input
            v-model="query.memberAccount"
            clearable
            size="medium"
            style="width: 280px"
            placeholder="请输入会员账号"
          ></el-input>
        </el-form-item>
        <el-form-item label="派彩状态:">
          <el-select
            v-model="query.payout"
            style="width: 280px"
            :popper-append-to-body="false"
          >
            <el-option label="全部" :value="0"></el-option>
            <el-option label="已派彩" :value="1"></el-option>
            <el-option label="待派彩" :value="2"></el-option>
            <el-option label="已驳回" :value="3"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div class="btngruop">
        <el-button type="primary" icon="el-icon-search" size="medium" @click="loadPage">
          查询
        </el-button>
        <el-button icon="el-icon-edit" size="medium" @click="reset"> 重置 </el-button>
      </div>
      <el-table
        v-loading="loading"
        border
        class="small-size-table"
        :data="dataList"
        :header-cell-style="getRowClass"
      >
        <el-table-column
          prop="Rank"
          align="center"
          width="50px"
          label="排名"
        ></el-table-column>
        <el-table-column
          prop="menberaccount"
          align="center"
          width="120px"
          label="会员账号/昵称"
        ></el-table-column>
        <el-table-column
          prop="merchantname"
          align="center"
          label="商户名称"
        ></el-table-column>
        <el-table-column prop="code" align="center" label="商户编码"></el-table-column>
        <el-table-column
          prop="Getarankedround"
          align="center"
          width="120px"
          label="获得排名轮局"
        ></el-table-column>
        <el-table-column
          prop="Reasonsforranking"
          align="center"
          width="120px"
          label="获得排名原因"
        ></el-table-column>
        <el-table-column prop="bonus" align="center" label="获得奖金"></el-table-column>
        <el-table-column
          prop="Otherrewards"
          align="center"
          width="180px"
          label="其他奖励"
        ></el-table-column>
        <el-table-column
          prop="rewardstatus"
          align="center"
          label="派奖状态"
        ></el-table-column>
        <el-table-column
          prop="time"
          align="center"
          width="180px"
          label="时间"
        ></el-table-column>
        <el-table-column
          prop="remarks"
          align="center"
          width="150px"
          label="备注"
        ></el-table-column>
      </el-table>
      <el-pagination
        v-show="dataList.length > 0"
        :current-page.sync="pageNum"
        layout="total, sizes,prev, pager, next, jumper"
        :page-size="pageSize"
        :page-sizes="$store.getters.pageSizes"
        :total="15"
        @current-change="handleCurrentChange"
        @size-change="handleSizeChange"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import list from '@/mixins/list'

export default {
  name: '',
  components: {},
  mixins: [list],
  props: {
    rankingRewardsData: { type: Object, default: () => ({}) }
  },
  data() {
    return {
      dataList: [],
      query: {
        memberAccount: '',
        payout: 0
      }
    }
  },
  computed: {},
  mounted() {
    for (let i = 0; i < 10; i++) {
      this.dataList[i] = {
        Rank: '1',
        menberaccount: 'zj7flily0006',
        Nickname: 'zj7flily0006',
        merchantname: '亚博体育',
        code: 'YBTIS',
        Getarankedround: '第3轮 3/3局',
        Reasonsforranking: '比赛结束',
        bonus: '20000',
        Otherrewards: '月赛争霸赛门票x1',
        rewardstatus: '已派彩',
        time: '2021-02-13 20:28:54',
        remarks: '驳回原因（运营端）'
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
      console.log(this.pageNum)
    }
  }
}
</script>

<style lang="scss" scoped>
/deep/.el-form-item {
  margin-bottom: 0;
}
.btngruop {
  float: right;
  margin-top: -40px;
  margin-bottom: 20px;
}
</style>
