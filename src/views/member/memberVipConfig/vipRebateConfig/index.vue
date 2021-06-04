<template>
  <div class="game-container report-container">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane
        v-for="item in gameTypeList"
        :key="item.gameName"
        :label="item.gameName"
        :name="item.gameName"
      >
        <editForm v-if="listData.length > 0" :listData="listData"></editForm>
        <div v-else></div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import list from '@/mixins/list'
import { routerNames } from '@/utils/consts'
import editForm from './components/index'
export default {
  name: routerNames.vipRebateConfig,
  components: { editForm },
  mixins: [list],
  data() {
    return {
      listData: [],
      activeName: '',
      gameTypeList: []
    }
  },
  computed: {},
  mounted() {},
  methods: {
    loadData() {
      this.loading = true
      this.$api
        .getMerchantGameGetMerchantGames()
        .then((res) => {
          if (res.code === 200) {
            for (let i = 0; i < res.data.length; i++) {
              const obj = {}
              const ele = res.data[i]
              obj.venueId = ele.id
              obj.gamePlatform = ele.gameType
              obj.gameName = ele.gameName
              this.gameTypeList.push(obj)
            }
            console.log(this.gameTypeList)
            this.activeName = this.gameTypeList[0].gameName
            this.getMemberVipRebateSelectAllInfo()
            this.loading = false
          } else {
            this.loading = false
          }
        })
        .catch(() => {
          this.loading = false
        })
    },
    getMemberVipRebateSelectAllInfo() {
      const params = {}
      params.venueId = this.gameTypeList[0].venueId
      params.gamePlatform = this.gameTypeList[0].gamePlatform
      this.$api.getMemberVipRebateSelectAllInfo(params).then((res) => {
        if (res.code === 200) {
          console.log(res)
          this.listData = res.data
        }
      })
    },
    handleClick(val) {
      console.log(val)
      this.activeName = val.name
      this.listData = {}
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
</style>
