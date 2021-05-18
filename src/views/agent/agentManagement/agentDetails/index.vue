<template>
  <div class="allmargin report-container">
    <div class="bg"></div>
    <div class="ps">
      <el-form ref="form" :inline="true" :model="queryData" @submit.native.prevent>
        <el-form-item
          label="代理账号:"
          prop="userName"
          :rules="[
            { required: true, message: '请输入代理账号', trigger: 'blur' },
            { min: 4, max: 12, message: '长度在 4 到 12 个字符', trigger: 'blur' },
          ]"
        >
          <el-input
            v-model="queryData.userName"
            clearable
            size="medium"
            :maxlength="11"
            style="width: 280px"
            placeholder="请输入代理账号"
            :disabled="loading"
            @keyup.enter.native="enterSearch"
          ></el-input>
        </el-form-item>
        <el-form-item style="margin-left: 30px">
          <el-button
            type="primary"
            icon="el-icon-search"
            :disabled="loading"
            size="medium"
            @click="query"
          >
            查询
          </el-button>
          <el-button
            icon="el-icon-refresh-left"
            :disabled="loading"
            size="medium"
            @click="reset"
          >
            重置
          </el-button>
        </el-form-item>
      </el-form>

      <el-tabs
        v-show="isShow"
        v-model="activeName"
        class="tabsBox"
        @tab-click="handleClick"
      >
        <el-tab-pane label="基本信息" name="basicInfor" class="nav-list-item">
        </el-tab-pane>
        <el-tab-pane
          label="财务信息"
          name="financialInfor"
          class="nav-list-item"
        ></el-tab-pane>
        <el-tab-pane
          label="团队信息"
          name="teamInfor"
          class="nav-list-item"
        ></el-tab-pane>
        <el-tab-pane
          label="登录信息"
          name="loginInfor"
          class="nav-list-item"
        ></el-tab-pane>
      </el-tabs>
    </div>
    <div class="marginTb"></div>
    <div v-show="isShow" class="contentBox">
      <basicInfor
        ref="basicInfor"
        class="floor-item"
        :parentData="parentData"
        :outlineInfo="outlineInfo"
        :remarksTableData="remarksTableData"
      ></basicInfor>
      <financialInfor
        ref="financialInfor"
        class="floor-item"
        :parentData="parentData"
        :balanceList="balanceList"
        :commission="commission"
        :playerList="playerList"
        :surrogateList="surrogateList"
      ></financialInfor>
      <teamInfor
        ref="teamInfor"
        class="floor-item"
        :parentData="parentData"
        :overviewList="overviewList"
        :bettingList="bettingList"
        :top3Sy="top3Sy"
      ></teamInfor>
      <loginInfor
        ref="loginInfor"
        class="floor-item"
        :parentData="parentData"
        :lonRecord="lonRecord"
      ></loginInfor>
    </div>
  </div>
</template>

<script>
import list from '@/mixins/list'
import basicInfor from './components/basicInfor'
import financialInfor from './components/financialInfor'
import teamInfor from './components/teamInfor'
import loginInfor from './components/loginInfor'
import { routerNames } from '@/utils/consts'
export default {
  name: routerNames.memberDetails,
  components: { basicInfor, financialInfor, teamInfor, loginInfor },
  mixins: [list],
  data() {
    return {
      isShow: false,
      parentData: { userName: '', userId: '' },
      queryData: { userName: '', userId: '' },
      activeName: 'basicInfor',
      tabList: ['basicInfor', 'financialInfor', 'teamInfor', 'loginInfor'],
      outlineInfo: {}, // 基本信息
      remarksTableData: {}, // 备注表格
      balanceList: {}, // 代理余额
      commission: {}, // 佣金信息
      playerList: {}, // 充提信息
      surrogateList: {}, // 代存信息
      overviewList: {}, // 成员概览
      bettingList: {}, // 投注信息
      top3Sy: [], // top3表格
      lonRecord: {} // 登录信息
    }
  },
  computed: {},
  mounted() {
    this.activeName = 'basicInfor'
    // 监听滚动事件
    window.addEventListener('scroll', this.onScroll, false)
    this.onScroll(0)
  },
  destroy() {
    // 必须移除监听器，不然当该vue组件被销毁了，监听器还在就会出错
    window.removeEventListener('scroll', this.onScroll)
  },
  methods: {
    // 代理详情-基本信息-概要信息以及个人资料
    getOutlineInfo(val) {
      // const loading = this.$loading(this.loadingRgba);
      this.$api
        .getOutlineInfo({ userName: val.userName })
        .then((res) => {
          this.isShow = true
          if (res.code === 200) {
            this.outlineInfo = res.data
            this.parentData.userName = res.data.userName
            this.parentData.userId = res.data.id
          }
          this.$refs.basicInfor.activeL = false
          this.$refs.financialInfor.activeL = false
          this.$refs.teamInfor.activeL = false
          this.$refs.loginInfor.activeL = false
          this.activeName = 'basicInfor'
          this.scrollTo(0)
          // loading.close();
        })
        .catch(() => {
          this.isShow = false
          this.$refs.basicInfor.activeL = false
          this.$refs.financialInfor.activeL = false
          this.$refs.teamInfor.activeL = false
          this.$refs.loginInfor.activeL = false
        })
    },
    // 备注信息
    getProxyDetailRemark(val) {
      const params = { userId: val, pageNum: 1, pageSize: 3 }
      this.$api.getProxyDetailRemark(params).then((res) => {
        if (res === 200) {
          this.remarksTableData = res
          console.log('备注信息', res)
        }
      })
    },
    // 代理余额
    getProxyDataBalance(val) {
      const params = { userId: val }
      this.$api.getProxyDataBalance(params).then((res) => {
        if (res === 200) {
          this.balanceList = res
          console.log('代理余额', res)
        }
      })
    },
    // 佣金信息
    getProxyDataCommission(val) {
      const params = { userId: val }
      this.$api.getProxyDataCommission(params).then((res) => {
        if (res === 200) {
          this.commission = res
          console.log('佣金信息', res)
        }
      })
    },
    // 存提信息
    getRechargeAndWithdrawInfo(val) {
      const params = { userId: val }
      this.$api.getRechargeAndWithdrawInfo(params).then((res) => {
        if (res === 200) {
          this.playerList = res
          console.log('存提信息', res)
        }
      })
    },
    // 代存信息
    getProxyDetailProxyRechargeInfo(val) {
      const params = { userId: val }
      this.$api.getProxyDetailProxyRechargeInfo(params).then((res) => {
        if (res === 200) {
          this.surrogateList = res
          console.log('代存信息', res)
        }
      })
    },
    // 成员概况
    getProxyDetailTeamInfo(val) {
      const params = { userId: val }
      this.$api.getProxyDetailTeamInfo(params).then((res) => {
        if (res === 200) {
          this.overviewList = res
          console.log('成员概况', res)
        }
      })
    },
    // 成员投注
    getProxyDetailTeamBet(val) {
      const params = { userId: val }
      this.$api.getProxyDetailTeamBet(params).then((res) => {
        if (res === 200) {
          this.bettingList = res
          console.log('成员投注', res)
        }
      })
    },
    // top3
    getProxyDetailTop3Bet(val) {
      const params = { orderKey: 1, userId: val }
      this.$api.getProxyDetailTop3Bet(params).then((res) => {
        if (res === 200) {
          this.top3Sy = res
          console.log('top3', res)
        }
      })
    },
    // 登录日志
    getProxyDetailProxyLoginLog(val) {
      const params = { userId: val, pageNum: 1, pageSize: 10 }
      this.$api.getProxyDetailProxyLoginLog(params).then((res) => {
        if (res === 200) {
          this.lonRecord = res
          console.log('登录日志', res)
        }
      })
    },
    query() {
      const params = this.queryData
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.getOutlineInfo(params)
        }
      })
    },
    enterSubmit() {
      this.query()
    },
    reset() {
      this.$refs.form.resetFields()
      this.queryData = {}
    },
    handleClick(tab, event) {
      this.scrollTo(tab.index)
    },
    // 滚动监听器
    onScroll() {
      // 获取所有锚点元素
      const navContents = document.querySelectorAll('.floor-item')
      // 所有锚点元素的 offsetTop
      const offsetTopArr = []
      navContents.forEach((item) => {
        offsetTopArr.push(item.offsetTop)
      })
      // 获取当前文档流的 scrollTop
      const scrollTop = document.documentElement.scrollTop || document.body.scrollTop
      // 定义当前点亮的导航下标
      let navIndex = 0
      for (let n = 0; n < offsetTopArr.length; n++) {
        // 如果 scrollTop 大于等于第n个元素的 offsetTop 则说明 n-1 的内容已经完全不可见
        // 那么此时导航索引就应该是n了
        if (scrollTop + 240 >= offsetTopArr[n]) {
          navIndex = n
        }
      }
      if (
        scrollTop + document.documentElement.clientHeight ===
        document.documentElement.scrollHeight
      ) {
        navIndex = offsetTopArr.length - 1
      }
      this.activeName = this.tabList[navIndex]
    },
    // 跳转到指定索引的元素
    scrollTo(index) {
      // 获取目标的 offsetTop
      // css选择器是从 1 开始计数，我们是从 0 开始，所以要 +1
      const navContents = document.querySelectorAll('.floor-item')
      const targetOffsetTop = navContents[index].offsetTop
      // const targetOffsetTop = document.querySelector(
      //   `.floor-item:nth-child(${index + 1})`
      // ).offsetTop;
      console.log(targetOffsetTop)
      // 获取当前 offsetTop
      let scrollTop = document.documentElement.scrollTop || document.body.scrollTop
      // 定义一次跳 50 个像素，数字越大跳得越快，但是会有掉帧得感觉，步子迈大了会扯到蛋
      const STEP = 50
      // 判断是往下滑还是往上滑
      if (scrollTop > targetOffsetTop) {
        // 往上滑
        smoothUp()
      } else {
        // 往下滑
        smoothDown()
      }
      // 定义往下滑函数
      function smoothDown() {
        // 如果当前 scrollTop 小于 targetOffsetTop 说明视口还没滑到指定位置
        if (scrollTop < targetOffsetTop) {
          // 如果和目标相差距离大于等于 STEP 就跳 STEP
          // 否则直接跳到目标点，目标是为了防止跳过了。
          if (targetOffsetTop - scrollTop >= STEP) {
            scrollTop += STEP
          } else {
            scrollTop = targetOffsetTop
          }
          document.body.scrollTop = scrollTop - 240
          document.documentElement.scrollTop = scrollTop - 240
          // 关于 requestAnimationFrame 可以自己查一下，在这种场景下，相比 setInterval 性价比更高
          requestAnimationFrame(smoothDown)
        }
      }
      // 定义往上滑函数
      function smoothUp() {
        if (scrollTop > targetOffsetTop) {
          if (scrollTop - targetOffsetTop >= STEP) {
            scrollTop -= STEP
          } else {
            scrollTop = targetOffsetTop
          }
          document.body.scrollTop = scrollTop - 240
          document.documentElement.scrollTop = scrollTop - 240
          requestAnimationFrame(smoothUp)
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.allmargin {
  margin: 9px 15px 15px 15px;
}
.ps {
  position: fixed;
  height: 125px;
  width: 100%;
  background: #fff;
  padding: 15px 0;
  z-index: 100;
  border-bottom: 1px solid #dcdfe6;
}
.bg {
  width: 100%;
  height: 15px;
  background: #ffffff;
  position: fixed;
  top: 100px;
  z-index: 1;
}

/deep/ .tabsBox .el-tabs__nav-wrap::after {
  display: none;
}
/deep/ .tabsBox .el-tabs__content {
  display: none;
}
/deep/ .tabsBox .el-tabs__item {
  font-weight: bold;
}
.floor-item {
  // width: 100%;
  // min-height: 500px;
  // text-align: center;
  // color: #fff;
  // background-color: #404040;
}
.marginTb {
  height: 125px;
}
</style>
