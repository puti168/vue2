<template>
  <a-result status="403" title="403" sub-title="您没有权限访问，请联系管理员！">
    <template #extra>
      <a-button type="primary" @click="toHome"> 返回首页 </a-button>
    </template>
  </a-result>
</template>

<script>
export default {
  name: 'Exception403',
  methods: {
    toHome() {
      window.location.href = '/'
    },
  },
}
</script>
 