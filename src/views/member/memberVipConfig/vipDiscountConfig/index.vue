<template>
  <div class="game-container report-container">
    <div class="view-container dealer-container">
        <h1>vip晋级优惠配置</h1>
    </div>
  </div>
</template>

<script>
import list from '@/mixins/list'
import { routerNames } from '@/utils/consts'

export default {
  name: routerNames.vipDiscountConfig,
  components: {},
  mixins: [list],
  data() {
    return {
      queryData: {}
    }
  },
  computed: {},
  mounted() {},
  methods: {}
}
</script>

<style lang="scss" scoped>
/deep/.el-dialog__header {
  text-align: center;
  color: #909399;
  font-weight: 700;
}
</style>
