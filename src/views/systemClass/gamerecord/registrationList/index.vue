<template>
  <div class="game-container report-container">
    <div class="view-container dealer-container">
      <el-form ref="form" :inline="true">
        <el-form-item label="比赛名称:">
          <span>{{ registrationListData.Contestname }}</span>
        </el-form-item>
        <el-form-item label="比赛编号:">
          <span>{{ registrationListData.code }}</span>
        </el-form-item>
        <el-form-item label="报名总数:">
          <span>{{ registrationListData.Numberofparticipants }}</span>
        </el-form-item>
        <el-form-item label="赛前退赛:">
          <span>{{ registrationListData.Numberofexitsbeforestart }}</span>
        </el-form-item>
        <el-form-item label="实际参赛:">
          <span>{{ registrationListData.Actualparticipation }}</span>
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
        <el-table-column prop="time" align="center" label="时间"></el-table-column>
        <el-table-column
          prop="menberaccount"
          align="center"
          label="会员账号/昵称"
        ></el-table-column>
        <el-table-column
          prop="merchantname"
          align="center"
          label="商户名称"
        ></el-table-column>
        <el-table-column prop="code" align="center" label="商户编码"></el-table-column>
        <el-table-column prop="status" align="center" label="状态"></el-table-column>
        <el-table-column
          prop="registeryfee"
          align="center"
          label="报名费"
        ></el-table-column>
        <el-table-column
          prop="Ticketname"
          align="center"
          label="门票名称"
        ></el-table-column>
        <el-table-column prop="Quantity" align="center" label="数量"></el-table-column>
      </el-table>
      <el-pagination
        v-show="dataList.length > 0"
        :current-page.sync="pageNum"
        background
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
    registrationListData: { type: Object, default: () => ({}) }
  },
  data() {
    return {
      dataList: [],
      query: {
        memberAccount: ''
      }
    }
  },
  computed: {},
  mounted() {
    console.log(this.registrationListData)
    for (let i = 0; i < 10; i++) {
      this.dataList[i] = {
        time: '2021-04-09',
        menberaccount: 'zj7flily0006',
        Nickname: 'zj7flily0006',
        merchantname: '亚博体育',
        code: 'YBTIS',
        status: '已报名',
        registeryfee: '门票',
        Ticketname: '月赛争霸赛门票',
        Quantity: '1'
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
