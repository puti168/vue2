<template>
  <div class="allmargin report-container">
    <div class="bg"></div>
    <div class="ps">
      <el-form ref="form" :inline="true" :model="queryData">
        <el-form-item label="会员账号:">
          <el-input
            v-model="queryData.userid"
            clearable
            size="medium"
            style="width: 280px"
            placeholder="请输入会员账号"
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
      <el-tabs v-model="activeName" class="tabsBox" @tab-click="handleClick">
        <el-tab-pane label="基本信息" name="first" class="nav-list-item"> </el-tab-pane>
        <el-tab-pane label="财务信息" name="second" class="nav-list-item"></el-tab-pane>
        <el-tab-pane label="登录信息" name="third" class="nav-list-item"></el-tab-pane>
        <el-tab-pane
          label="银行卡/虚拟币账号信息"
          name="fourth"
          class="nav-list-item"
        ></el-tab-pane>
      </el-tabs>
    </div>
    <div class="marginTb"></div>
    <div class="contentBox">
      <first ref="first" class="floor-item" :memberRemarkList="memberRemarkList"></first>
      <second class="floor-item" :balanceList="balanceList"></second>
      <third class="floor-item"></third>
      <fourth class="floor-item"></fourth>
    </div>
  </div>
</template>

<script>
import list from '@/mixins/list'
import first from './components/first'
import second from './components/second'
import third from './components/third'
import fourth from './components/fourth'
export default {
  name: 'IFloor',
  components: { first, second, third, fourth },
  mixins: [list],
  data() {
    return {
      queryData: { userid: 587597733479145472 },
      activeName: 'first',
      tabList: ['first', 'second', 'third', 'fourth'],
      element: {
        nav_item: null,
        floor_item: null
      },
      timer: null,
      memberRemarkList: {},
      balanceList: { freezeBalance: '' }
    }
  },
  computed: {
    num: {
      get() {
        return this.$refs.first.page
      }
    },
    size: {
      get() {
        return this.$refs.first.size
      }
    }
  },
  mounted() {
    // 监听滚动事件
    window.addEventListener('scroll', this.onScroll, false)
  },
  destroy() {
    // 必须移除监听器，不然当该vue组件被销毁了，监听器还在就会出错
    window.removeEventListener('scroll', this.onScroll)
  },
  methods: {
    // vip信息
    getVipInfo(val) {
      this.$api.getVipInfo(val).then((res) => {
        console.log(res)
      })
    },
    // 备注信息
    getMemberRemarkList(val) {
      const params = { ...val, pageNum: this.num, pageSize: this.size }
      this.$api.getMemberRemarkList(params).then((res) => {
        if (res.code === 200) {
          this.memberRemarkList = res.data
        }
        console.log(res)
      })
    },
    // 查询中心钱包余额
    getAccountCashAccount(val) {
      this.$api.getAccountCashAccount(val).then((res) => {
        console.log(res)
      })
    },
    // 提现冻结余额
    getWithdrawalFreeze(val) {
      this.$api.getWithdrawalFreeze(val).then((res) => {
        if (res.code === 200) {
          console.log(res, 'freezeBalance')
          this.balanceList.freezeBalance = res.data.freezeBalance
        }
      })
    },
    // 银行卡/虚拟币
    initGetBankCardBank(val) {
      this.$api.getBankCardBank(val).then((res) => {
        console.log(res)
      })
    },
    query() {
      const params = this.queryData
      // this.getVipInfo(params);
      // this.getMemberRemarkList(params);
      // this.getAccountCashAccount(params);
      this.getWithdrawalFreeze(params)
      // this.initGetBankCardBank(params);
    },
    reset() {
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
        if (scrollTop + 134 >= offsetTopArr[n]) {
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
          document.body.scrollTop = scrollTop - 134
          document.documentElement.scrollTop = scrollTop - 134
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
          document.body.scrollTop = scrollTop - 134
          document.documentElement.scrollTop = scrollTop - 134
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
