<template>
  <div>
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        ref="menus"
        :default-active="activeMenu"
        background-color="#f2f2f2"
        text-color="#999999"
        :unique-opened="false"
        active-text-color="#999999"
        :collapse-transition="false"
        mode="vertical"
        :default-openeds="defaultOpeneds"
        @close="handleClose"
      >
        <sidebar-item
          v-for="route in showRoute"
          :key="route.path"
          :item="route"
          :base-path="route.path"
          :active-path="activeMenu"
        />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import SidebarItem from './SidebarItem'
import variables from '@/styles/variables.scss'

export default {
  components: { SidebarItem },
  data() {
    return {
      defaultOpeneds: []
    }
  },
  computed: {
    ...mapGetters(['sidebar', 'routes', 'nowRoute']),
    showRoute() {
      let arr = []
      this.routes.forEach((item) => {
        if (item.id === this.nowRoute) {
          arr = item
          console.log(item)
        }
      })
      return arr.children
    },
    activeMenu() {
      console.log('routes :>> ', this.routes)
      console.log(this.$route)
      const route = this.$route
      const { meta, path } = route
      // if set path, the sidebar will highlight the path you set
      if (meta.activeMenu) {
        return meta.activeMenu
      }
      return path
    },
    variables() {
      return variables
    }
  },
  watch: {
    showRoute(newQuestion, oldQuestion) {
      console.log(newQuestion, oldQuestion)
      if (newQuestion.length) {
        for (let i = 0; i < newQuestion.length; i++) {
          const ele = newQuestion[i]
          this.defaultOpeneds.push(ele.path)
        }
      }
    }
  },
  methods: {
    handleClose(key, keyPath) {
      this.$refs.menus.open(keyPath)
    }
  }
}
</script>
