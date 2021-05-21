<template>
  <div class="game-container report-container">
    <!-- 体育,真人荷官模块，电竞，彩票，棋牌，电子，派奖排行 -->
    <mix v-if="isSport" :recommendDetails="recommendDetails" @back="back"></mix>
    <span>{{ recommendDetails }}</span>
    <!-- 直播模块 -->
    <live v-if="isLive" :gemeDetails="gameDetails" @back="back"></live>
    <!-- 游戏专题模块 -->
    <game v-if="isGame" :gemeDetails="gameDetails" @back="back"></game>
    <!-- 最新游戏 -->
    <newGame v-if="isLastGame" :gemeDetails="gameDetails" @back="back"></newGame>
  </div>
</template>

<script>
import list from '@/mixins/list'
import live from './components/live'
import mix from './components/mix'
import game from './components/game'
import newGame from './components/newGame'
export default {
  components: {
    live,
    game,
    newGame,
    mix
  },
  mixins: [list],
  props: { recommendDetails: { type: Object, default: () => ({}) } },
  data() {
    return {
      gameDetails: {},
      form: {
        icon: '',
        gameName: ''
      },
      searchData: {
        moduleId: this.recommendDetails.id
      },
      visible: false,
      type: true,
      isSport: true,
      isLive: false,
      isGame: false,
      isLastGame: false
    }
  },
  computed: {},
  watch: {
    recommendDetails: {
      handler(newV) {
        console.log(888888, newV)
      },
      deep: true
    }
  },
  created() {},
  mounted() {
    // this.initShowDetailsModule();
    this.getDetailsInfo()
  },
  updated() {},
  methods: {
    back() {
      this.$emit('back')
    },
    // 初始化详情
    // initShowDetailsModule() {
    //   const moduleName = this.recommendDetails.moduleName;
    //   this.isSport =
    //     moduleName.search("体育") !== -1 ||
    //     moduleName.search("真人荷官") !== -1 ||
    //     moduleName.search("电竞") !== -1 ||
    //     moduleName.search("彩票") !== -1 ||
    //     moduleName.search("棋牌") !== -1 ||
    //     moduleName.search("电子") !== -1 ||
    //     moduleName.search("派奖排行") !== -1;
    //   this.isLive = moduleName.search("直播") !== -1;
    //   this.isGame = moduleName.search("游戏") !== -1;
    //   this.isLastGame = moduleName.search("最新游戏") !== -1;
    // },
    // 获取详情信息
    getDetailsInfo() {
      const params = {
        ...this.searchData
      }
      this.$api.gameHomeRecommendDetailsAPI(params).then((res) => {
        if (res.code === 200) {
          const response = res.data
          this.loading = false
          console.log('请求到值了', response)
          //   this.gameDetails = response;
        } else {
          this.loading = false
          this.$message({
            message: res.msg,
            type: 'error'
          })
        }
      })
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
.review-content {
  width: 100%;
  .head {
    height: 70px;
    line-height: 70px;
    width: 100%;
    background: #000;
    border-radius: 2px;
    padding: 0 30px;
    .title {
      font-weight: 600;
      color: rgb(192, 190, 190);
    }
    .right-btn {
      float: right;
    }
  }
  .main-content {
    .review-content {
      border: 1px solid rgba(192, 190, 190, 0.5);
      border-top: 0px;
      padding: 30px;
      .name {
        font-weight: 600;
      }
      .review-flex {
        position: relative;
        width: 100%;
        margin-top: 10px;
        div {
          display: inline-block;
          width: 24%;
        }
      }
    }
    .more-height {
      height: 200px;
    }
  }
  .img-title {
    margin-top: 10px;
    font-size: 14px;
    font-weight: 600;
    margin-bottom: 10px;
    color: rgba(0, 0, 0, 0.847058823529412);
  }
  .avatar {
    width: 70px;
    height: 70px;
    display: inline-block;
    margin-left: 20px;
    margin-bottom: 20px;
  }
}
</style>
