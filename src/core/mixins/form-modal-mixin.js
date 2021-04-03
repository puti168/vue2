/**
 * 表单弹框mixin封装
 * 使用参考：src\views\report\finance\settlementinput\components\AddForm.vue
 */
import PropTypes from 'ant-design-vue/es/_util/vue-types'

export default {
    props: {
        type: { ...PropTypes.oneOf(['add', 'edit', 'view']), required: true },
        visible: PropTypes.bool,
        loading: PropTypes.bool.def(true),
        formData: PropTypes.object.def({}),
    },
    data(){
        return {
            bodyLoading: false,
            confirmLoading: false
        }
    },
    methods: {
        /**
         * 是否继续确定处理
         * @param {表单名} formName 
         * @param {*} other 
         * @returns 
         */
        continueOk(formName, other){
            return true
        },
        /**
         * 点击确定
         * @param {表单名} formName 
         */
        handleOk(formName, other) {
            if(!this.continueOk(formName, other)){
                return
            }
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.confirmLoading = true
                    this.request(this.formData, other).then((res) => {
                        this.confirmLoading = false
                        if (res.code != 200) {
                            this.$message.error(res.msg)
                            return
                        }
                        this.$refs[formName].resetFields()
                        this.hideModal('ok')
                        this.$message.success(res.msg)
                    })
                } else {
                    return
                }
            })
        },
        /**
         * 校验通过返回true
         * @param {校验域} fields 
         */
        validateField(fields) {
            let pass = true
            this.$refs['addForm'].validateField(fields, (valid) => {
                if (valid) {
                    pass = false
                }
            })
            return pass
        },
        /**
         * 关闭对话框
         * @param {表单名} formName 
         */
        handleCancel(formName) {
            if(formName){
                this.$refs[formName].resetFields()
            }
            this.hideModal('cancel')
        },
        /**
         * 重置表单
         */
        resetData(isOk) {
        },
        /**
         * 向后台发送表单数据
         * @param {请求数据} data 
         */
        request(data) {
            console.error("need override request method");
        },
        hideModal(event){
            this.resetData(event=='ok')
            this.$emit('update:visible', false)
            this.$emit(event)
        }
    },
    computed: {
        /**
         * 是否显示底部栏
         */
        footer() {
            if (!this.isView) {
                return {}
            }
            return { footer: null }
        },
        /**
         * 是否新增
         */
        isAdd() {
            return this.type == 'add'
        },
        /**
         * 是否编辑
         */
        isEdit() {
            return this.type == 'edit'
        },
        /**
         * 是否查看
         */
        isView() {
            return this.type == 'view'
        },
    }
}
