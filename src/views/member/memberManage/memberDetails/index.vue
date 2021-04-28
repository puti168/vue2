<template>
  <div class="allmargin report-container">
    <div class="bg"></div>
    <div class="ps">
      <el-form ref="form" :inline="true" :model="queryData">
        <el-form-item label="会员账号:">
          <el-input
            v-model="queryData.roleName"
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
    <first class="floor-item"></first>
    <second class="floor-item"></second>
    <third class="floor-item"></third>
    <fourth class="floor-item"></fourth>
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
      queryData: {},
      activeName: 'first',
      tabList: ['first', 'second', 'third', 'fourth'],
      element: {
        nav_item: null,
        floor_item: null
      },
      timer: null
    }
  },
  mounted() {
    this.element = {
      nav_item: document.getElementsByClassName('nav-list-item'),
      floor_item: document.getElementsByClassName('floor-item')
    }
    this.element.nav_item[0].classList.add('active')
    window.addEventListener('scroll', this.floorSrcollEventListener)
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.floorSrcollEventListener)
  },
  methods: {
    query() {},
    reset() {},
    handleClick(tab, event) {
      this.setFloorNavMountClick(tab.index)
    },

    /**
     * 设置楼层导航事件驱动方法
     * @param {Number} index  楼层下标
     */
    setFloorNavMountClick(index) {
      const { floor_item } = this.element
      const floor_offsetTop = floor_item[index].offsetTop - floor_item[0].offsetTop
      console.log(floor_offsetTop, 222222222)
      const window_scrollTop =
        document.documentElement.scrollTop || document.body.scrollTop
      const timer = {
        step: 60,
        times: 20,
        FLOOR_OFFSETTOP: floor_offsetTop
      }
      if (window_scrollTop > floor_offsetTop) {
        this.setFloorScrollArrowUp(timer)
      } else if (window_scrollTop === floor_offsetTop) {
        return false
      } else {
        this.setFloorScrollArrowDown(timer)
      }
    },
    /**
     * 设置楼层向上滚动
     * @param {Object} timer 定时器配置
     */
    setFloorScrollArrowUp(timer) {
      clearInterval(this.timer)
      this.timer = setInterval(() => {
        const window_scrollTop =
          document.documentElement.scrollTop || document.body.scrollTop
        if (window_scrollTop <= timer.FLOOR_OFFSETTOP) {
          document.documentElement.scrollTop = timer.FLOOR_OFFSETTOP
          document.body.scrollTop = timer.FLOOR_OFFSETTOP
          clearInterval(this.timer)
        } else {
          document.documentElement.scrollTop = window_scrollTop - timer.step
          document.body.scrollTop = window_scrollTop - timer.step
        }
      }, timer.times)
    },
    /**
     * 设置楼层向下滚动
     * @param {Object} timer 定时器配置
     */
    setFloorScrollArrowDown(timer) {
      clearInterval(this.timer)
      this.timer = setInterval(() => {
        const window_scrollTop =
          document.documentElement.scrollTop || document.body.scrollTop
          console.log(window_scrollTop, 11111111111)
        if (window_scrollTop >= timer.FLOOR_OFFSETTOP) {
          document.documentElement.scrollTop = timer.FLOOR_OFFSETTOP
          document.body.scrollTop = timer.FLOOR_OFFSETTOP
          clearInterval(this.timer)
        } else {
          document.documentElement.scrollTop = window_scrollTop + timer.step
          document.body.scrollTop = window_scrollTop - timer.step
        }
      }, timer.times)
    },
    /**
     * 监听窗口滚动楼层导航动态定位
     */
    floorSrcollEventListener() {
      const { nav_item, floor_item } = this.element
      const window_scrollTop =
        document.documentElement.scrollTop || document.body.scrollTop
      for (let i = 0, len = floor_item.length; i < len; i++) {
        const floor_offsetTop = floor_item[i].offsetTop - floor_item[0].offsetTop
        if (window_scrollTop >= floor_offsetTop) {
          for (let n = 0, len = nav_item.length; n < len; n++) {
            i === n
              ? (this.activeName = this.tabList[i])
              : (this.activeName = this.tabList[i])
          }
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
