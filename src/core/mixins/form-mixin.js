/**
 * 表单查询
 * 使用示例：src\views\report\finance\settlementinput\index.vue
 */
export default {
    data() {
        return {
            resetAndSearch: true
        }
    },
    methods: {
        /**
         * 提交查询
         * @param {表单ref} formName 
         */
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                this.fetch(1, this.pageSize)
            })
        },
        /**
         * 重置查询条件
         * @param {表单ref} formName 
         */
        resetForm(formName) {
            this.resetData()
            this.$refs[formName].resetFields()
            if (this.resetAndSearch) {
                this.fetch(1, this.pageSize)
            }
        },
        /**
         * 向后台发送表单数据
         * @param {请求数据} data 
         */
        fetch(page, pageSize) {
            console.error("need override fetch method");
        },
        /**
         * 重置表单
         */
        resetData() {
        },
    },
}
