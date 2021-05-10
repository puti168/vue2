<template>
  <div class="game-container report-container">
    <h3>等级福利配置</h3>
    <div class="view-container dealer-container">
      <div class="params">
        <el-form ref="form" :inline="true" :model="queryData">
          <el-form-item label="游戏标签ID:">
            <el-input
              v-model="queryData.bankCode"
              clearable
              :maxlength="3"
              size="medium"
              style="width: 180px"
              placeholder="请输入"
              :disabled="loading"
              @keyup.enter.native="enterSearch"
            ></el-input>
          </el-form-item>
          <el-form-item label="标签名称:">
            <el-input
              v-model="queryData.bankName"
              clearable
              :maxlength="10"
              size="medium"
              style="width: 180px; margin-right: 20px"
              placeholder="请输入"
              :disabled="loading"
              @keyup.enter.native="enterSearch"
            ></el-input>
          </el-form-item>
          <el-form-item label="状态:" class="tagheight">
            <el-select
              v-model="queryData.accountType"
              style="width: 180px"
              multiple
              placeholder="默认选择全部"
              :popper-append-to-body="false"
            >
              <el-option label="开启中" value="1"></el-option>
              <el-option label="禁用中" value="2"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item>
            <el-button
              type="primary"
              icon="el-icon-search"
              :disabled="loading"
              size="medium"
              @click="search"
            >
              查询
            </el-button>
            <el-button
              icon="el-icon-refresh-left"
              :disabled="loading"
              size="medium"
              @click="reset"
            >
              重置
            </el-button>
            <el-button
              type="warning"
              icon="el-icon-folder"
              :disabled="loading"
              size="medium"
              @click="dialogFormVisible = true"
            >
              创建
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
            prop="vipSerialNum"
            align="center"
            label="游戏标签ID"
            sortable="custom"
            width="120px"
          ></el-table-column>
          <el-table-column
            prop="content"
            align="center"
            label="标签内容"
            width="170px"
          ></el-table-column>
          <el-table-column prop="bankName" align="center" label="状态" width="100px">
            <template slot-scope="scope">
              <div v-if="scope.row.code === 1" class="normalRgba">开启中</div>
              <div v-else class="disableRgba">已禁用</div>
            </template>
          </el-table-column>
          <el-table-column
            prop="bankName"
            align="center"
            label="标签描述"
          ></el-table-column>
          <el-table-column
            prop="bankName"
            align="center"
            label="已标签游戏"
            width="120px"
          >
            <template slot-scope="scope">
              <div class="blueColor decoration" @click="lookGame(scope.row)">100</div>
            </template>
          </el-table-column>
          <el-table-column
            prop="bankName"
            align="center"
            label="创建人"
            width="100px"
          ></el-table-column>
          <el-table-column
            prop="createDt"
            align="center"
            label="创建时间"
            sortable="custom"
            width="160px"
          ></el-table-column>
          <el-table-column
            prop="bankName"
            align="center"
            label="最近操作人"
            width="100px"
          ></el-table-column>
          <el-table-column
            prop="createDt"
            align="center"
            label="最近操作时间"
            sortable="custom"
            width="160px"
          ></el-table-column>
          <el-table-column prop="operating" align="center" label="操作" width="240px">
            <template slot-scope="scope">
              <el-button
                :disabled="loading"
                type="success"
                size="medium"
                class="noicon"
                @click="switchClick(scope.row)"
              >
                开启
              </el-button>
              <el-button
                :disabled="loading"
                type="danger"
                size="medium"
                class="noicon"
                @click="switchClick(scope.row)"
              >
                禁用
              </el-button>
              <el-button
                type="primary"
                icon="el-icon-edit"
                :disabled="loading"
                size="medium"
                @click="edit(scope.row)"
              >
                编辑信息
              </el-button>

              <el-button
                type="warning"
                icon="el-icon-delete"
                :disabled="loading"
                size="medium"
                @click="deleteLabel(scope.row)"
              >
                删除
              </el-button>
            </template>
          </el-table-column>
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
        title="创建/编辑"
        :visible.sync="dialogFormVisible"
        :destroy-on-close="true"
        width="480px"
        class="rempadding"
      >
        <el-divider></el-divider>
        <el-form :model="dialogForm" label-width="90px">
          <el-form-item
            label="标签名称:"
            prop="name"
            :rules="[
              { required: true, message: '请输入标签名称', trigger: 'blur' },
              { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' },
            ]"
          >
            <el-input
              v-model="dialogForm.name"
              :maxlength="10"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="描述:"
            prop="remark"
            :rules="[
              { required: true, message: '请输入描述内容', trigger: 'blur' },
              { min: 2, max: 50, message: '长度在 2 到 50 个字符', trigger: 'blur' },
            ]"
          >
            <el-input v-model="dialogForm.remark" type="textarea"></el-input>
          </el-form-item>
        </el-form>
        <el-divider></el-divider>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取消</el-button>
          <el-button type="primary" @click="subAddOrEidt">保存</el-button>
        </div>
      </el-dialog>
      <el-dialog
        title="标签游戏"
        :visible.sync="dialogGameVisible"
        :destroy-on-close="true"
        width="480px"
        class="rempadding"
      >
        <el-divider></el-divider>
        <div class="contentBox disableColor">标签名称：高频率（001）</div>
        <p class="headerBox">
          <span>游戏名称</span>
          <span>添加时间</span>
        </p>
        <div class="bodyBox">
          <p>
            <span>斗地主</span>
            <span>2016-09-21 08:50:08</span>
          </p>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import list from '@/mixins/list'
import dayjs from 'dayjs'
import { routerNames } from '@/utils/consts'
const startTime = dayjs().startOf('day').valueOf()
const endTime = dayjs().endOf('day').valueOf()

export default {
  name: routerNames.gamePlatform,
  components: {},
  mixins: [list],
  data() {
    return {
      queryData: {
        accountType: []
      },
      searchTime: [startTime, endTime],
      now: dayjs(new Date()).format('YYYY-MM-DD HH:mm:ss'),
      summary: {
        count: 0,
        failCount: 0,
        successCount: 0
      },
      tableData: [],
      dialogFormVisible: false,
      dialogForm: {},
      dialogGameVisible: false
    }
  },
  computed: {},
  mounted() {
    for (let i = 0; i < 10; i++) {
      this.tableData[i] = {
        bankCode: '165416416464654',
        bankName: '中国银行',
        content: '高频率',
        code: 1,
        createDt: '2021-02-13 20:28:54',
        updateDt: '2021-02-13 20:28:54'
      }
    }
  },
  methods: {
    loadData() {
      // this.loading = true;
      const create = this.searchTime || []
      const [startTime, endTime] = create
      let params = {
        ...this.queryData,
        startTime: startTime ? dayjs(startTime).format('YYYY-MM-DD HH:mm:ss') : '',
        endTime: endTime ? dayjs(endTime).format('YYYY-MM-DD HH:mm:ss') : ''
      }
      params = {
        ...this.getParams(params)
      }
      console.log(params)
    },
    lookGame(val) {
      this.dialogGameVisible = true
      console.log(val)
    },
    reset() {
      this.queryData = {}
    },
    switchClick(val) {
      this.$confirm(
        `<strong>是否对子游戏进行开启/维护/禁用操作?</strong></br><span style='font-size:12px;color:#c1c1c1'>一旦操作将会立即生效</span>`,
        `确认提示`,
        {
          dangerouslyUseHTMLString: true,
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }
      )
        .then(() => {
          console.log(1111111)
        })
        .catch(() => {})
    },
    edit(val) {
      this.dialogFormVisible = true
      console.log(val)
    },
    deleteLabel(val) {
      this.$confirm(`<strong>确定删除此条标签类型吗?</strong>`, `确认提示`, {
        dangerouslyUseHTMLString: true,
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          console.log(2222222222)
        })
        .catch(() => {})
    },
    subAddOrEidt() {
      this.dialogFormVisible = false
    },
    _changeTableSort({ column, prop, order }) {
      if (prop === 'vipSerialNum') {
        prop = 1
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
    enterSubmit() {
      this.loadData()
    }
  }
}
</script>

<style lang="scss" scoped>
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
/deep/ .rempadding .el-dialog__body {
  padding: 0;
  padding-bottom: 30px;

  .contentBox,
  form {
    padding: 0 20px;
  }
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
