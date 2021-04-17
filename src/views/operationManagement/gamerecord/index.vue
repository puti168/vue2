<template>
  <div class="game-container report-container">
    <div class="header flex-h flex-bc">
      <h2 class="h2-line">比赛记录</h2>
      <div class="head flex-h-end">
        <el-button type="primary" icon="el-icon-search" size="medium" @click="loadPage">
          查询
        </el-button>
        <el-button icon="el-icon-edit" size="medium" @click="reset"> 重置 </el-button>
      </div>
    </div>
    <div class="view-container dealer-container">
      <div class="params"><query-form></query-form></div>
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
          <el-table-column
            prop="Contestname"
            width="160"
            align="center"
            label="比赛名称/编号"
          >
            <template slot-scope="scope">
              <div>{{ scope.row.Contestname }}</div>
              <div style="color: #959595">{{ scope.row.code }}</div>
            </template>
          </el-table-column>
          <el-table-column prop="Eligibility" align="center" label="参赛资格">
            <template slot-scope="scope">
              <el-tooltip placement="top">
                <div slot="content">暂无数据</div>
                <div>{{ scope.row.Eligibility }}</div>
              </el-tooltip>
            </template>
          </el-table-column>
          <el-table-column
            prop="registeryfee"
            align="center"
            width="160"
            label="报名费"
          ></el-table-column>
          <el-table-column prop="state" align="center" label="比赛状态"></el-table-column>
          <el-table-column
            prop="Numberofparticipants"
            align="center"
            label="报名总数"
          ></el-table-column>
          <el-table-column
            prop="Numberofexitsbeforestart"
            align="center"
            label="赛前退赛"
          ></el-table-column>
          <el-table-column
            prop="Actualparticipation"
            align="center"
            label="实际参赛"
          ></el-table-column>
          <el-table-column
            prop="Numberofabandoned"
            align="center"
            label="弃赛人数"
          ></el-table-column>
          <el-table-column prop="start" align="center" width="160" label="开赛/结束时间">
            <template slot-scope="scope">
              <div>{{ scope.row.start }}</div>
              <div>{{ scope.row.endtime }}</div>
            </template>
          </el-table-column>
          <el-table-column
            prop="bonusamount"
            align="center"
            label="派出奖金"
          ></el-table-column>
          <el-table-column
            prop="Numberofbonuses"
            align="center"
            label="获奖人数"
          ></el-table-column>
          <el-table-column prop="Remarks" align="center" label="备注"></el-table-column>
          <el-table-column
            prop="operating"
            align="center"
            width="240"
            fixed="right"
            label="操作"
          >
            <template slot-scope="scope">
              <el-button
type="text"
@click="registrationList(scope.row)"
>报名名单</el-button>
              <el-button type="text" @click="bettingDetails">投注详情</el-button>
              <el-button
type="text"
@click="rankingRewards(scope.row)"
>排名奖励</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-row>
          <el-col :span="4" class="footer" style="text-align: right">总计</el-col>
          <el-col :span="4" class="footer">派出总奖金:66666</el-col>
        </el-row>
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
        <el-dialog
          :title="tiptitel"
          center
          :visible.sync="centerDialogVisible"
          width="70%"
        >
          <registrationList
            v-if="tiptitel == '报名名单'"
            :registration-list-data="registrationListData"
          ></registrationList>
          <rankingRewards
            v-else
            :ranking-rewards-data="rankingRewardsData"
          ></rankingRewards>
        </el-dialog>
      </div>
    </div>
  </div>
</template>

<script>
import list from '@/mixins/list'

import registrationList from './registrationList/index'
import rankingRewards from './rankingRewards/index'
import queryForm from './components/queryForm'
export default {
  name: '',
  components: { registrationList, rankingRewards, queryForm },
  mixins: [list],
  data() {
    return {
      dataList: [],
      tiptitel: '',
      centerDialogVisible: false,
      registrationListData: {},
      rankingRewardsData: {}
    }
  },
  computed: {},
  mounted() {
    for (let i = 0; i < 10; i++) {
      this.dataList[i] = {
        Contestname: '比赛名称五六七八九十',
        code: 'OF1234567890',
        Eligibility: '无',
        registeryfee: 'BO月度争霸赛 x1',
        state: '预告中',
        Numberofparticipants: '1356',
        Numberofexitsbeforestart: '56',
        Actualparticipation: '1300',
        Numberofabandoned: '50',
        start: '2021-02-13 20:28:54',
        endtime: '2021-02-13 22:21:50',
        bonusamount: '60,000.00',
        Numberofbonuses: '200',
        Remarks: '取消原因',
        operating: ''
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
    },
    registrationList(val) {
      this.centerDialogVisible = true
      this.tiptitel = '报名名单'
      this.registrationListData = val
      console.log(val)
    },
    bettingDetails() {
      this.$router.push('/bettingdetails')
    },
    rankingRewards(val) {
      this.centerDialogVisible = true
      this.tiptitel = '排名奖励'
      this.rankingRewardsData = val
      console.log(val)
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
.footer {
  height: 32px;
  margin-top: 10px;
  line-height: 32px;
  padding: 0 20px;
  background: #edfaff;
  color: #909399;
  font-weight: 700;
  font-size: 14px;
  border: #eeeeee solid 1px;
}
</style>
