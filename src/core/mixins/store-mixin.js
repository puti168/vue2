/**
 * store相关引用
 */

export default {
    methods: {
        /**
         * 获取当前用户信息
         * @param {属性名} prop 
         * @returns 
         */
        getUserInfo(prop) {
            if (prop) {
                return this.$store.getters.userInfo[prop]
            }
            return this.$store.getters.userInfo
        },
        /**
         * 设置当前用户信息
         * @param {属性名} prop 
         * @returns 
         */
        setUserInfo(prop, data) {
            if (!prop) {
                return
            }
            this.$store.getters.userInfo[prop] = data
        }
    },
}