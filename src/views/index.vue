<template>
  <div class="game-container">
    <div class="flex-h flex-bc">
      <h2 class="h2-line">{{ $t("navbar.dashboard") }}</h2>
    </div>
    <el-row class="content"> 欢迎进入【OB旗舰】中控管理后台 </el-row>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'Index',
  computed: {
    ...mapGetters(['name'])
  }
}
</script>

<style lang="scss" scoped>
.content {
  text-align: center;
  padding: 120px 0;
  margin-top: 200px;
  font-size: 20px;
  color: #fff;
  font-weight: 700;
  background: url("../assets/img/bg-login.jpg") no-repeat;
  background-size: cover;
}
.welcome-info {
  margin-top: 20%;
  font-size: 20px;
  color: #333;
}
.logo {
  width: 300px;
  height: 300px;
}
</style>
