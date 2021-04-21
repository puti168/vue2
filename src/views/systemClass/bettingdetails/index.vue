<template>
  <div class="game-container report-container">
    <div class="header flex-h flex-bc">
      <h2 class="h2-line">平台赛投注详情</h2>
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
          <el-table-column prop="Betnumber" width="100" align="center" label="注单号">
          </el-table-column>
          <el-table-column
            prop="Contestname"
            width="150"
            align="center"
            label="比赛名称/编号"
          >
            <template slot-scope="scope">
              <div>{{ scope.row.Contestname }}</div>
              <div style="color: #959595">{{ scope.row.Contestcode }}</div>
            </template>
          </el-table-column>
          <el-table-column
            prop="merchantname"
            width="100"
            align="center"
            label="商户名称/编码"
          >
            <template slot-scope="scope">
              <div>{{ scope.row.merchantname }}</div>
              <div style="color: #959595">{{ scope.row.merchantcode }}</div>
            </template>
          </el-table-column>
          <el-table-column
            prop="menberaccount"
            width="100"
            align="center"
            label="会员账号/昵称"
          >
            <template slot-scope="scope">
              <el-tooltip placement="top">
                <div slot="content">{{ scope.row.menberaccount }}</div>
                <div>{{ scope.row.menberaccount }}</div>
              </el-tooltip>
            </template>
          </el-table-column>
          <el-table-column
            prop="roundinfo"
            align="center"
            width="120"
            label="轮局信息"
          ></el-table-column>
          <el-table-column
            v-show="istrue == '桌台信息'"
            prop="tableinfo"
            align="center"
            label="桌台信息"
          ></el-table-column>
          <el-table-column
            prop="gamesessionnumber"
            align="center"
            width="120"
            label="局号"
          ></el-table-column>
          <el-table-column prop="strategy" align="center" label="玩法"></el-table-column>
          <el-table-column
            prop="Functionuse"
            align="center"
            label="功能使用"
          ></el-table-column>
          <el-table-column
            prop="Bettingchips"
            align="center"
            width="100"
            label="投注筹码"
          ></el-table-column>
          <el-table-column prop="Winchips" align="center" width="100" label="赢得筹码">
          </el-table-column>
          <el-table-column
            prop="Chipsaftersettlement"
            align="center"
            width="100"
            label="结算后筹码"
          ></el-table-column>
          <el-table-column prop="result" align="center" label="结果"></el-table-column>
          <el-table-column prop="Winrate" align="center" label="胜率"></el-table-column>
          <el-table-column prop="Notemark" align="center" label="注单标记">
            <template slot-scope="scope">
              <span style="color: red">{{ scope.row.Notemark }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="bettingip" align="center" width="100" label="投注IP">
            <template slot-scope="scope">
              <span style="color: #c689ff">{{ scope.row.bettingip }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="terminaltype" align="center" label="终端类型">
          </el-table-column>
          <el-table-column
            prop="betpayout"
            align="center"
            width="150"
            label="下注/派彩时间"
          >
            <template slot-scope="scope">
              <div>{{ scope.row.betpayout }}</div>
              <div>{{ scope.row.bettime }}</div>
            </template>
          </el-table-column>
          <el-table-column prop="shoenumber" align="center" width="150" label="靴号">
          </el-table-column>
          <el-table-column prop="remarks" align="center" label="备注"> </el-table-column>
          <el-table-column
            prop="operating"
            align="center"
            fixed="right"
            label="操作"
            :filters="[
              { text: '桌台信息', value: '桌台信息' },
              { text: '投注IP', value: '投注IP' },
              { text: '终端类型', value: '终端类型' },
              { text: '胜率', value: '胜率' },
              { text: '靴号', value: '靴号' },
            ]"
            :filter-method="filterTag"
          >
            <template slot-scope="">
              <el-button type="text" @click="look(scope.row)">查看视频</el-button>
            </template>
            <template slot-scope="scope">
              <el-button type="text" @click="look(scope.row)">查看视频</el-button>
            </template>
          </el-table-column>
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
      dataList: [],
      istrue: ''
    }
  },
  computed: {},
  mounted() {
    for (let i = 0; i < 10; i++) {
      this.dataList[i] = {
        Betnumber: 'YBZR201910250000000001',
        Contestname: '比赛名称五六七八九十',
        Contestcode: 'OF1234567890',
        merchantname: '亚博体育',
        merchantcode: 'YBTIS',
        menberaccount: 'zj7flily0006',
        nickname: '',
        roundinfo: '第3轮 3/3局',
        tableinfo: 'XXX',
        gamesessionnumber: 'GD1234567890',
        strategy: '庄对',
        Functionuse: 'pass 1/5',
        Bettingchips: '999,999.00',
        Winchips: '999,999.00',
        Chipsaftersettlement: '999,999.00',
        result: '闲4  庄6',
        Winrate: '52.21%',
        Notemark: '跳局',
        bettingip: '10.111.8.164',
        terminaltype: 'PC',
        betpayout: '2021-02-13 20:28:54',
        bettime: '2021-02-13 20:28:54',
        shoenumber: 'B0B022122500F1-0072',
        remarks: '比赛结束 获得亚军',
        operating: '查看视频'
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
    filterTag(value, row) {
      this.istrue = value
      console.log(value, row)
      // return row.tag === value;
    },
    look(val) {
      this.$message.warning('浏览器暂不支持')
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
