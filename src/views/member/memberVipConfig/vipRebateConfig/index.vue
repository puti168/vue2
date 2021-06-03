<template>
  <div class="game-container report-container">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="OB真人" name="zr">
        <editForm :listData="listData"></editForm>
      </el-tab-pane>
      <el-tab-pane label="OB体育" name="ty"> </el-tab-pane>
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
      listData: {},
      activeName: 'zr'
    }
  },
  computed: {},
  mounted() {},
  methods: {
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
