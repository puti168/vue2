<template>
  <div class="game-container report-container">
    <div class="view-container dealer-container">
      <div class="head flex-h-end">
        <el-form ref="form" :inline="true" :model="queryData">
          <el-form-item>
            <el-button
              type="primary"
              class="pattern"
              :disabled="loading"
              size="medium"
              @click="addLabel"
            >
              新增代理提款设置
            </el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="content">
        <el-table
          v-loading="loading"
          border
          size="mini"
          class="small-size-table"
          :data="tableData"
          style="width: 100%"
          :header-cell-style="getRowClass"
          @sort-change="_changeTableSort"
        >
		<el-table-column
            prop="description"
            align="center"
            width="170px"
            label="序号"
          ></el-table-column>
          <el-table-column prop="operating" align="center" label="操作" width="180px">
            <template slot-scope="scope">
              <el-button
                type="primary"
                icon="el-icon-edit"
                :disabled="scope.row.labelStatus === 1"
                size="medium"
                @click="edit(scope.row)"
              >
                修改
              </el-button>
			  <el-button
                type="warning"
                icon="el-icon-delete"
                :disabled="scope.row.labelStatus === 1"
                size="medium"
                @click="deleteLabel(scope.row)"
              >
                删除
              </el-button>
            </template>
          </el-table-column>
          <el-table-column prop="labelStatus" align="center" label="状态" width="100px">
            <template slot-scope="scope">
              <div v-if="scope.row.labelStatus === 0" class="disableRgba">关闭</div>
              <div v-else-if="scope.row.labelStatus === 1" class="normalRgba">开启</div>
              <span v-else>-</span>
            </template>
          </el-table-column>
		  <el-table-column
            prop="description"
            align="center"
            width="170px"
            label="代理账号"
          ></el-table-column>
		  <el-table-column
            prop="description"
            align="center"
            width="170px"
            label="代理姓名"
          ></el-table-column>
		  <el-table-column
            prop="description"
            align="center"
            width="170px"
            label="代理类型"
          ></el-table-column>
		  <el-table-column
            prop="description"
            align="center"
            width="170px"
            label="代理状态"
          ></el-table-column>
		   <el-table-column
            prop="description"
            align="center"
            width="170px"
            label="风控层级"
          ></el-table-column>
          <el-table-column
            prop="gameLabelName"
            align="center"
            label="单次提现最低限额"
            width="170px"
          ></el-table-column>
          <el-table-column
            prop="gameLabelName"
            align="center"
            label="单次提现最高限额"
            width="170px"
          ></el-table-column>
          <el-table-column
            prop="gameLabelName"
            align="center"
            label="单日免费提现次数"
            width="170px"
          ></el-table-column>
          <el-table-column
            prop="gameLabelName"
            align="center"
            label="单日最高提款次数"
            width="170px"
          ></el-table-column>
          <el-table-column
            prop="description"
            align="center"
            width="170px"
            label="单日免费提款总额限制"
          ></el-table-column>
          <el-table-column
            prop="description"
            width="170px"
            align="center"
            label="单日最高提款总额度"
          ></el-table-column>
          <el-table-column
            prop="description"
            align="center"
            width="170px"
            label="大额提现标记金额"
          ></el-table-column>
          <el-table-column
            prop="description"
            align="center"
            width="175px"
            label="超出单日免费次数手续费"
          ></el-table-column>
          <el-table-column
            prop="description"
            align="center"
            width="175px"
            label="超出单日提款总额手续费"
          ></el-table-column>
        </el-table>
        <!-- 分页 -->
        <el-pagination
          :current-page.sync="pageNum"
          class="pageValue"
          background
          layout="total, sizes,prev, pager, next, jumper"
          :page-size="pageSize"
          :page-sizes="pageSizes"
          :total="total"
          @current-change="handleCurrentChange"
          @size-change="handleSizeChange"
        ></el-pagination>
      </div>
      <el-dialog
        :visible.sync="dialogFormVisible"
        :destroy-on-close="true"
        width="970px"
        @close="clear"
      >
        <div class="form-header">
          <span>新增代理提款设置</span>
          <span>
            <code style="color: #ff3b30">*</code>
            为必填项
          </span>
        </div>
        <h2>代理信息</h2>
        <el-form :rules="rules" :inline="true" class="demo-form-inline">
          <el-form-item prop="agent" label="代理账号：">
            <el-input v-model="queryData.agentnum" class="information"></el-input>
          </el-form-item>
          <el-form-item label-width="147px" label="代理姓名：">
            <el-input v-model="queryData.agentname" class="information"></el-input>
          </el-form-item>
          <el-form-item label-width="147px" label="代理类型：">
            <el-input v-model="queryData.agenttype" class="information"></el-input>
          </el-form-item>
          <el-form-item label="代理状态：">
            <el-input v-model="queryData.agentstate" class="information"></el-input>
          </el-form-item>
          <el-form-item label-width="147px" label="风控层级：">
            <el-input v-model="queryData.risk" class="information"></el-input>
          </el-form-item>
        </el-form>
        <h2>提款配置</h2>
        <el-form
          ref="formSub"
          :rules="rules"
          :inline="true"
          class="demo-form-inline"
          :model="dialogForm"
        >
          <el-form-item
            prop="viplevel"
            label-width="147px"
            label="VIP等级："
            class="configure"
          >
            <el-input v-model="queryData.viplevel" placeholder=""></el-input>
          </el-form-item>
          <el-form-item label="单次提款最低额度：" prop="minimum">
            <el-input
              v-model="queryData.miniamount"
              class="chief"
              placeholder="请输入金额，为0不限制"
            ></el-input>
            <span>元</span>
          </el-form-item>
          <el-form-item label="单次提款最高额度：" class="configure" prop="maxmum">
            <el-input
              v-model="queryData.maxamount"
              class="chief"
              placeholder="请输入金额，为0不限制"
            ></el-input>
            <span>元</span>
          </el-form-item>
          <el-form-item label="单日免费提款次数：" prop="oneFree">
            <el-input
              v-model="queryData.oneFree"
              class="chief"
              placeholder="请输入金额，为0不限制"
            ></el-input>
            <span>次</span>
          </el-form-item>
          <el-form-item label="大额提款标记金额：" class="configure" prop="signminimum">
            <el-input
              v-model="queryData.minimum"
              class="chief"
              placeholder="请输入金额，为0不限制"
            ></el-input>
            <span style="w">元</span>
          </el-form-item>
          <el-form-item label="单日免费提款总额：" prop="onefreetotal">
            <el-input
              v-model="queryData.onefreetotal"
              class="chief"
              placeholder="请输入金额，为0不限制"
            ></el-input>
            <span>元</span>
          </el-form-item>
          <h2>提款手续费配置</h2>
          <el-form-item label="超出单日免费次数：" class="configure" prop="region">
            <el-select v-model="queryData.region" class="sun" placeholder="请选择">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
            <el-input
              v-model="queryData.onefreetotal"
              class="sun"
              placeholder="0"
            ></el-input>
          </el-form-item>
          <el-form-item label="超出单日免费次数总额：" prop="region">
            <el-select v-model="queryData.exregion" class="sun" placeholder="请选择">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
            <el-input
              v-model="queryData.exregions"
              class="sun"
              placeholder="0"
            ></el-input>
          </el-form-item>
          <h2>提款提示语配置</h2>
          <el-form-item
            class="configure"
            label="超出单日最高次数提示语："
            prop="beyondfrequency"
          >
            <el-input
              v-model="queryData.extips"
              style="width: 260px"
              placeholder="游戏前端提示语，限制25字以内"
            ></el-input>
          </el-form-item>
          <el-form-item
            class="configure"
            label="超出单日最高提款总额提示语："
            prop="beyondtotal"
          >
            <el-input
              v-model="queryData.extotaltips"
              style="width: 260px"
              placeholder="游戏前端提示语，限制25字以内"
            ></el-input>
          </el-form-item>
          <el-form-item label="状态">
            <el-select
            v-model="queryData.status"
            clearable
            :popper-append-to-body="false"
            >
              <el-option label="关闭" value="shanghai"></el-option>
              <el-option label="开启" value="beijing"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item
            label="标签名称:"
            prop="gameLabelName"
            :rules="[
              { required: true, message: '请输入标签名称', trigger: 'blur' },
              {
                min: 1,
                max: 10,
                message: '长度在 2 到 10 个字符',
                trigger: 'blur',
              },
            ]"
          >
            <el-input
              v-model="dialogForm.gameLabelName"
              :maxlength="10"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="描述:"
            prop="description"
            :rules="[
              { required: true, message: '请输入描述内容', trigger: 'blur' },
              {
                min: 2,
                max: 50,
                message: '长度在 2 到 50 个字符',
                trigger: 'blur',
              },
            ]"
          >
            <el-input v-model="dialogForm.description" type="textarea"></el-input>
          </el-form-item>
        </el-form>
        <el-divider></el-divider>
        <span slot="footer" class="dialog-footer">
          <el-button
            type="primary"
            icon="el-icon-search"
            :disabled="loading"
            size="medium"
            @click="add"
          >
            提交
          </el-button>
          <el-button @click="reset">重置</el-button>
        </span>
      </el-dialog>
      <el-dialog
        title="标签游戏"
        :visible.sync="dialogGameVisible"
        :destroy-on-close="true"
        width="970px"
        class="rempadding"
      >
        <el-divider></el-divider>
        <div class="contentBox disableColor">标签名称：{{ labelName }}</div>
        <p class="headerBox">
          <span>游戏名称</span>
          <span>添加时间</span>
        </p>
        <div class="bodyBox">
          <p v-for="item in gameList" :key="item.gameName">
            <span>{{ item.gameName }}</span>
            <span>{{ item.createdAt }}</span>
          </p>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import list from '@/mixins/list'
import { routerNames } from '@/utils/consts'
export default {
  name: routerNames.gameLabel,
  components: {},
  mixins: [list],
  data() {
    return {
      formInline: {
        user: '',
        region: ''
      },
      queryData: {},
      tableData: [],
      dialogFormVisible: false,
      dialogForm: { minimum: '' },
      gameList: [],
      dialogGameVisible: false,
      title: '',
      labelName: ''
    }
  },
  computed: {
    rules() {
      const oneFreeRules = (rule, value, callback) => {
        console.log(value)
        if (!Number.isInteger(value) || value < 1) {
          callback(new Error('输入大于单日最高提款次数，请重新输入'))
        } else if (value <= this.ruleForm.maxmum) {
          callback(new Error('输入大于单日最高提款次数，请重新输入'))
        } else if (value > 9999999999) {
          callback(new Error('输入值最多为9999999999'))
        } else {
          callback()
        }
      }
      const oneFree = [{ required: true, validator: oneFreeRules, trigger: 'blur' }]

      const minimum = [
        { required: true, message: '请输入金额', trigger: 'blur' },
        { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
      ]
      const maxmum = [
        { required: true, message: '请输入金额', trigger: 'blur' },
        { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
      ]
      const signminimum = [
        { required: true, message: '请输入金额', trigger: 'blur' },
        { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
      ]
      const onefreetotal = [
        {
          required: true,
          message: '输入大于单日最高提款次数，请重新输入',
          trigger: 'blur'
        },
        { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
      ]
      const region = [{ required: true, message: '百分比（%）', trigger: 'change' }]
      const beyondfrequency = [
        { required: true, message: '请输入提示语', trigger: 'blur' },
        { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
      ]
      const beyondtotal = [
        { required: true, message: '请输入提示语', trigger: 'blur' },
        { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
      ]
      return {
        oneFree,
        minimum,
        maxmum,
        signminimum,
        onefreetotal,
        region,
        beyondfrequency,
        beyondtotal
      }
    }
  },
  mounted() {},
  methods: {
    add(done) {
      this.$confirm('您确认要执行新增提款设置的操作？')
        .then((_) => {
          done()
        })
        .catch((_) => {})
    },
    reset() {
      this.queryData = {
        viplevel: undefined,
        miniamount: undefined,
        maxamount: undefined,
        oneFree: undefined,
        minimum: undefined,
        onefreetotal: undefined,
        region: undefined,
        exregion: undefined,
        exregions: undefined,
        extips: undefined,
        extotaltips: undefined
      }
      this.$refs['form'].resetFields()
    },
    loadData() {
      this.loading = true
      let params = {
        ...this.queryData
      }
      params = {
        ...this.getParams(params)
      }
      this.$api
        .getTabelData(params)
        .then((res) => {
          if (res.code === 200) {
            this.tableData = res.data.record
            this.total = res.data.totalRecord
            this.loading = false
          } else {
            this.loading = false
          }
        })
        .catch(() => {
          this.loading = false
        })
    },

    addLabel() {
      this.title = '新增'
      this.dialogForm = {}
      this.dialogFormVisible = true
    },
    edit(val) {
      this.title = '编辑'
      this.dialogForm = { ...val }
      this.dialogFormVisible = true
    },
	deleteLabel(val) {
      const data = {}
      data.id = val.id
      data.description = val.description
      data.gameLabelName = val.gameLabelName
      this.$confirm(`<strong>确定删除此条标签类型吗?</strong>`, `确认提示`, {
        dangerouslyUseHTMLString: true,
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.$api.setUpdateDelete(data).then((res) => {
            if (res.code === 200) {
              this.$message.success('删除成功')
              this.loadData()
            }
          })
        })
        .catch(() => {})
    },

    subAddOrEidt() {
      console.log(this.title)
      const data = {}
      data.id = this.dialogForm.id
      data.description = this.dialogForm.description
      data.gameLabelName = this.dialogForm.gameLabelName
      this.$refs.formSub.validate((valid) => {
        if (valid) {
          if (this.title === '新增') {
            console.log('新增')
            this.$api.addObGameLabel(data).then((res) => {
              if (res.code === 200) {
                this.$message.success('创建成功')
                this.pageNum = 1
                this.loadData()
              }
            })
          } else {
            this.$api.setUpdateLabel(data).then((res) => {
              if (res.code === 200) {
                this.$message.success('修改成功')
                this.loadData()
              }
            })
          }
          this.dialogFormVisible = false
        }
      })
    },
    checkValue(e) {
      const { value } = e.target
      this.queryData.gameLabelId = value
      console.log(value)
    },
    _changeTableSort({ column, prop, order }) {
      if (prop === 'gameLabelId') {
        prop = 1
      }
      if (prop === 'createdAt') {
        prop = 2
      }
      if (prop === 'updatedAt') {
        prop = 3
      }
      this.queryData.orderKey = prop
      if (order === 'ascending') {
        // 升序
        this.queryData.orderType = 'asc'
      } else if (column.order === 'descending') {
        // 降序
        this.queryData.orderType = 'desc'
      }
      this.loadData()
    },
    clear() {
      this.$refs.formSub.resetFields()
    },
    enterSubmit() {
      this.loadData()
    }
  }
}
</script>

<style lang="scss" scoped>
.information {
	width: 150px;
}
.sun {
  width: 95px;
}
.configure {
  width: 420px;
}
.chief {
  width: 180px;
}
.form-header {
  width: 930px;
  left: 0px;
  background-color: #d3d7df;
  height: 45px;
  line-height: 45px;
  span:nth-child(1) {
    position: absolute;
    left: 30px;
    top: 65px;
    color: #666;
    font-size: 27px;
    font-weight: 700;
  }
  span:nth-child(2) {
    position: absolute;
    right: 30px;
    color: #999;
    font-weight: 400;
    font-size: 18px;
    top: 60px;
  }
}
.pattern {
  padding-left: 8px;
  padding-right: 8px;
}
/deep/.el-dialog__header {
  text-align: center;
  color: #909399;
  font-weight: 700;
}
/deep/ .tagheight .el-tag {
  height: 24px;
  line-height: 24px;
  min-width: 60px;
}
/deep/.el-input-number__decrease,
/deep/.el-input-number__increase {
  display: none;
}
/deep/.el-input-number--medium .el-input__inner {
  padding: 0 15px;
  text-align: left;
}

.decoration {
  text-decoration: underline;
  cursor: pointer;
}
.bodyBox {
  max-height: 400px;
  overflow: auto;
}
p {
  display: flex;
  height: 40px;
  line-height: 40px;
  border-bottom: 1px solid #e8e8e8;
  justify-content: space-around;
  span {
    display: inline-block;
    width: 50%;
    text-align: center;
  }
}
.headerBox {
  color: #000000d8;
  background: #fafafa;
  font-family: "PingFang SC ", "PingFang SC", sans-serif;
  font-weight: 650;
  border-top: 1px solid #e8e8e8;
  margin-top: 15px;
}
</style>
