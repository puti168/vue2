/**
 * <a-button v-if="$auth('form.edit')">Button</a-button>
 * @param Vue
 */
function plugin(Vue) {
  if (plugin.installed) {
    return
  }

  !Vue.prototype.$auth && Object.defineProperties(Vue.prototype, {
    $auth: {
      get() {
        const actions = this.$vnode.context.$route.meta.actions
        return (permission) => {
          return permission.split(",").some(v => {
            return actions.includes(v)
          })
        }
      }
    }
  })
}

export default plugin
