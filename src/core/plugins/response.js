
export default {
    install(Vue) {
        /**
         * 普通响应处理方法
         * @param {*} func 
         * @param {*} before 
         * @returns 
         */
        Vue.prototype.$handleResponse = function (func, before) {
            return (resp) => {
                const { code, data, msg, totalCount } = resp
                if (before) {
                    before(data, totalCount, msg)
                }
                if (code != 200) {
                    this.$message.error(msg)
                    return
                }
                return func(data, msg)
            }
        }
        /**
         * 分页响应处理方法
         * @param {*} func 
         * @param {*} before 
         * @returns 
         */
        Vue.prototype.$handlePageResponse = function (func, before) {
            return (resp) => {
                const { code, data, msg, totalCount } = resp
                if (before) {
                    before(data, totalCount, msg)
                }
                if (code != 200) {
                    this.$message.error(msg)
                    return
                }
                return func(data, totalCount)
            }
        }
        /**
         * 默认的响应处理方法
         * @param {预处理} before 
         * @returns 
         */
        Vue.prototype.$handleResponseDefault = function (before) {
            return (resp) => {
                const { code, data, msg, totalCount } = resp
                if (before) {
                    before(data, totalCount, msg)
                }
                if (code != 200) {
                    this.$message.error(msg)
                    return
                }
                this.$message.success(msg)
            }
        }
    }
}


