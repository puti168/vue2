<template>
  <a-result status="500" title="500" sub-title="服务器异常，请联系管理员！">
    <template #extra>
      <a-button type="primary" @click="toHome"> 返回首页 </a-button>
    </template>
  </a-result>
</template>

<script>
export default {
  name: 'Exception500',
  methods: {
    toHome() {
      window.location.href = '/'
    },
  },
}
</script>
