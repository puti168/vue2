<template>
  <a-card hoverable style="width: 300px">
    <img slot="cover" alt="example" src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png" />
    <a-card-meta :title="balanceInfo.game" :description="balanceInfo.balance | formatNumber">
      <a-avatar slot="avatar" src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
    </a-card-meta>
  </a-card>
</template>
<script>
import PropTypes from 'ant-design-vue/es/_util/vue-types'
export default {
  props: {
    balanceInfo: PropTypes.object.def({}),
  },
}
</script>