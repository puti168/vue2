<template>
  <div class="game-container report-container">
    <div class="header flex-h flex-bc">
      <h2 class="h2-line">会员详情</h2>
    </div>
    <div>
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
        <el-tab-pane label="基本信息" name="first">
          <el-divider></el-divider>
          <first></first>
        </el-tab-pane>
        <el-tab-pane label="财务信息" name="second">配置管理</el-tab-pane>
        <el-tab-pane label="登录信息" name="third">角色管理</el-tab-pane>
        <el-tab-pane
label="银行卡/虚拟币账号信息"
name="fourth"
>定时任务补偿</el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import list from '@/mixins/list'
import first from './components/first'
export default {
  name: '',
  components: { first },
  mixins: [list],
  data() {
    return {
      queryData: {},
      activeName: 'first'
    }
  },
  computed: {},
  mounted() {},
  methods: {
    query() {},
    reset() {},
    handleClick(tab, event) {
      console.log(tab, event)
    }
  }
}
</script>

<style lang="scss" scoped>
.tabsBox {
  padding: 0 30px;
}
/deep/ .tabsBox .el-tabs__item {
  font-weight: bold;
}
/deep/ .tabsBox .el-tabs__nav-wrap::after {
  display: none;
}
/deep/ .tabsBox .el-divider {
  margin: 5px 0;
}
</style>
