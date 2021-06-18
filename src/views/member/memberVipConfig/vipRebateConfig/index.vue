<template>
  <div class="game-container report-container">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane
        v-for="item in gameTypeList"
        :key="item.gameName"
        :label="item.gameName"
        :name="item.gameName"
      >
      </el-tab-pane>
    </el-tabs>
    <el-table
      v-loading="loading"
      border
      size="mini"
      class="small-size-table"
      :data="tableData"
      style="width: 100%"
      :header-cell-style="getRowClass"
    >
      <el-table-column prop="gameName" align="center" label="游戏类型"> </el-table-column>
      <el-table-column prop="vip0" align="center" label="vip0">
        <template slot="header">
          vip0
          <br />
          返水比例
        </template>
        <template slot-scope="scope">
          <el-input-number
            v-model.number="scope.row.vip0"
            class="inputBox"
            :max="99999"
            :precision="2"
            @blur="checkTransferValue(scope.row, 'vip0')"
          ></el-input-number>
          <span>%</span><br />
        </template>
      </el-table-column>
      <el-table-column prop="vip1" align="center" label="vip1">
        <template slot="header">
          vip1
          <br />
          返水比例
        </template>
        <template slot-scope="scope">
          <el-input-number
            v-model.number="scope.row.vip1"
            class="inputBox"
            :max="99999"
            :precision="2"
            @blur="checkTransferValue(scope.row, 'vip1')"
          ></el-input-number>
          <span>%</span>
        </template>
      </el-table-column>
      <el-table-column prop="vip2" align="center" label="vip2">
        <template slot="header">
          vip2
          <br />
          返水比例
        </template>
        <template slot-scope="scope">
          <el-input-number
            v-model.number="scope.row.vip2"
            class="inputBox"
            :max="99999"
            :precision="2"
            @blur="checkTransferValue(scope.row, 'vip2')"
          ></el-input-number>
          <span>%</span>
        </template>
      </el-table-column>
      <el-table-column prop="vip3" align="center" label="vip3">
        <template slot="header">
          vip3
          <br />
          返水比例
        </template>
        <template slot-scope="scope">
          <el-input-number
            v-model.number="scope.row.vip3"
            class="inputBox"
            :max="99999"
            :precision="2"
            @blur="checkTransferValue(scope.row, 'vip3')"
          ></el-input-number>
          <span>%</span>
        </template>
      </el-table-column>
      <el-table-column prop="vip4" align="center" label="vip4">
        <template slot="header">
          vip4
          <br />
          返水比例
        </template>
        <template slot-scope="scope">
          <el-input-number
            v-model.number="scope.row.vip4"
            class="inputBox"
            :max="99999"
            :precision="2"
            @blur="checkTransferValue(scope.row, 'vip4')"
          ></el-input-number>
          <span>%</span>
        </template>
      </el-table-column>
      <el-table-column prop="vip5" align="center" label="vip5">
        <template slot="header">
          vip5
          <br />
          返水比例
        </template>
        <template slot-scope="scope">
          <el-input-number
            v-model.number="scope.row.vip5"
            class="inputBox"
            :max="99999"
            :precision="2"
            @blur="checkTransferValue(scope.row, 'vip5')"
          ></el-input-number>
          <span>%</span>
        </template>
      </el-table-column>
      <el-table-column prop="vip6" align="center" label="vip6">
        <template slot="header">
          vip6
          <br />
          返水比例
        </template>
        <template slot-scope="scope">
          <el-input-number
            v-model.number="scope.row.vip6"
            class="inputBox"
            :max="99999"
            :precision="2"
            @blur="checkTransferValue(scope.row, 'vip6')"
          ></el-input-number>
          <span>%</span>
        </template>
      </el-table-column>
      <el-table-column prop="vip7" align="center" label="vip7">
        <template slot="header">
          vip7
          <br />
          返水比例
        </template>
        <template slot-scope="scope">
          <el-input-number
            v-model.number="scope.row.vip7"
            class="inputBox"
            :max="99999"
            :precision="2"
            @blur="checkTransferValue(scope.row, 'vip7')"
          ></el-input-number>
          <span>%</span>
        </template>
      </el-table-column>
      <el-table-column prop="vip8" align="center" label="vip8">
        <template slot="header">
          vip8
          <br />
          返水比例
        </template>
        <template slot-scope="scope">
          <el-input-number
            v-model.number="scope.row.vip8"
            class="inputBox"
            :max="99999"
            :precision="2"
            @blur="checkTransferValue(scope.row, 'vip8')"
          ></el-input-number>
          <span>%</span>
        </template>
      </el-table-column>
      <el-table-column prop="vip9" align="center" label="vip9">
        <template slot="header">
          vip9
          <br />
          返水比例
        </template>
        <template slot-scope="scope">
          <el-input-number
            v-model.number="scope.row.vip9"
            class="inputBox"
            :max="99999"
            :precision="2"
            @blur="checkTransferValue(scope.row, 'vip9')"
          ></el-input-number>
          <span>%</span>
        </template>
      </el-table-column>
      <el-table-column prop="vip10" align="center" label="vip10">
        <template slot="header">
          vip10
          <br />
          返水比例
        </template>
        <template slot-scope="scope">
          <el-input-number
            v-model.number="scope.row.vip10"
            class="inputBox"
            :max="99999"
            :precision="2"
            @blur="checkTransferValue(scope.row, 'vip10')"
          ></el-input-number>
          <span>%</span>
        </template>
      </el-table-column>
    </el-table>
    <div v-show="tableData.length > 0">
      <p class="subBox">
        <el-button type="primary" @click="submitData()"> 保存</el-button>
        <el-button class="pad" @click="resetData()"> 恢复上次设置 </el-button>
      </p>
    </div>
  </div>
</template>

<script>
import list from '@/mixins/list'
export default {
  components: {},
  mixins: [list],
  data() {
    return {
      tableData: [],
      activeName: '',
      gameTypeList: [],
      id: ''
    }
  },
  computed: {},
  mounted() {},
  methods: {
    loadData() {
      this.$api
        .getMerchantGameGetMerchantGames()
        .then((res) => {
          if (res.code === 200) {
            for (let i = 0; i < res.data.length; i++) {
              const obj = {}
              const ele = res.data[i]
              obj.venueId = ele.id
              obj.gamePlatform = ele.gameCode
              obj.gameName = ele.gameName
              this.gameTypeList.push(obj)
            }
            this.activeName = this.gameTypeList[0].gameName
            const params = {}
            this.id = this.gameTypeList[0].venueId
            params.venueId = this.gameTypeList[0].venueId
            params.gamePlatform = this.gameTypeList[0].gamePlatform
            this.getMemberVipRebateSelectAllInfo(params)
          }
        })
        .catch(() => {
          this.loading = false
        })
    },
    getMemberVipRebateSelectAllInfo(params) {
      this.loading = true
      this.$api
        .getMemberVipRebateSelectAllInfo(params)
        .then((res) => {
          if (res.code === 200) {
            console.log(res)
            this.tableData = res.data
            this.loading = false
          }
        })
        .catch(() => {
          this.loading = false
        })
    },
    handleClick(val) {
      this.tableData = []
      this.activeName = val.name
      const params = {}
      this.id = this.gameTypeList[val.index].venueId
      params.venueId = this.gameTypeList[val.index].venueId
      params.gamePlatform = this.gameTypeList[val.index].gamePlatform
      this.getMemberVipRebateSelectAllInfo(params)
    },
    submitData() {
      console.log(111111, this.id)
      this.loading = true
      const params = [...this.tableData]
      for (let i = 0; i < params.length; i++) {
        const ele = params[i]
        console.log(ele)
        ele.venueId = this.id
        // delete ele.gameName;
      }
      this.$api
        .setMemberVipRebateUpdateRebateInfo(params)
        .then((res) => {
          if (res.code === 200) {
            this.$message.success('保存成功')
            this.loading = false
            this.tableData = res.data
          } else {
            this.$message.error(res.mgs)
          }
        })
        .catch(() => {
          this.loading = false
        })
    },
    resetData() {
      const params = {}
      for (let i = 0; i < this.gameTypeList.length; i++) {
        const ele = this.gameTypeList[i]
        if (this.activeName === ele.gameName) {
          params.venueId = ele.venueId
          params.gamePlatform = ele.gamePlatform
        }
      }
      console.log(params)
      this.getMemberVipRebateSelectAllInfo(params)
    },
    checkTransferValue(row, val) {
      if (!row[val]) {
        row[val] = 0
      }
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
/deep/.el-tabs__item {
  font-weight: 700;
}
.inputBox {
  width: 85%;
  margin: auto;
}
/deep/.el-input-number__decrease,
/deep/.el-input-number__increase {
  display: none;
}
/deep/.el-input-number .el-input__inner {
  padding: 0 15px;
  text-align: left;
}
.subBox {
  width: 240px;
  margin: 20px auto;
  .pad {
    padding: 0 10px;
  }
}
</style>
