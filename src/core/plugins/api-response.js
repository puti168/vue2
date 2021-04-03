
export default {
    install(Vue) {
        /**
         * 普通响应处理方法
         * @param {*} func 
         * @param {*} before 
         * @returns 
         */
        Vue.prototype.$handleApiResponse = function (func, before) {
            return (resp) => {
                const { code, data, message, totalCount } = resp
                if (before) {
                    before(data, totalCount, message)
                }
                if (code != 0) {
                    this.$message.error(message)
                    return
                }
                return func(data, message)
            }
        }
        /**
         * 默认的响应处理方法
         * @param {预处理} before 
         * @returns 
         */
        Vue.prototype.$handleApiResponseDefault = function (before) {
            return (resp) => {
                const { code, data, message, totalCount } = resp
                if (before) {
                    before(data, totalCount, message)
                }
                if (code != 0) {
                    this.$message.error(message)
                    return
                }
                this.$message.success(message)
            }
        }
    }
}


