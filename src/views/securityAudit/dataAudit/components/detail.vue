<template>
  <div class="detail">
    <el-dialog :key="newOne" class="edit-drawer" :title="$t('title.auditInfo')" :visible.sync="elDrawer" :close-on-click-modal="false" @close="handleClose">
      <el-form ref="form" :model="form" label-width="auto">
        <el-form-item :label="$t('label.sysName')" prop="sysName">
          <p>{{ form.sysName }}</p>
        </el-form-item>
        <el-form-item :label="$t('label.userName')" prop="userName">
          <p>{{ form.userName }}</p>
        </el-form-item>
        <el-form-item :label="$t('label.agentName')" prop="agentName">
          <p>{{ form.agentName }}</p>
        </el-form-item>
        <el-form-item :label="$t('label.agentId')" prop="agentId">
          <p>{{ form.agentId }}</p>
        </el-form-item>
        <el-form-item :label="$t('label.ip')" prop="ip">
          <p>{{ form.ip }}</p>
        </el-form-item>
        <el-form-item :label="$t('label.playId')" prop="operation">
          <p @click="showIdDetail">{{ form.operation }}</p>
        </el-form-item>
        <el-form-item :label="$t('label.dataType')" prop="operationType">
          <p @click="showDtDetail">{{ form.operationType }}</p>
        </el-form-item>
        <el-form-item :label="$t('label.method')" prop="method">
          <p @click="showMdDetail">{{ form.method }}</p>
        </el-form-item>
        <el-form-item :label="$t('label.operationTime')" prop="createTime">
          <p>{{ form.createTime| dateformat('{y}-{m}-{d} {h}:{i}:{s}') }}</p>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click.native="handleClose">{{ $t('btn.confirm') }}</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'Detail',
  props: {
    drawer: Boolean,
    auditData: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      elDrawer: false,
      idShow: false,
      idCanClick: false,
      dtShow: false,
      dtCanClick: false,
      mdShow: false,
      mdCanClick: false,
      form: {},
      newOne: new Date().valueOf()
    }
  },
  watch: {
    drawer: {
      handler(val) {
        this.elDrawer = val
      },
      deep: true,
      immediate: true
    },
    auditData: {
      handler(val) {
        this.form = { ...val }
        if (val.operation && this.strLength(val.operation) > 77) {
          this.idCanClick = true
        } else {
          this.idCanClick = false
        }
        if (val.dataType && this.strLength(val.dataType) > 77) {
          this.dtCanClick = true
        } else {
          this.dtCanClick = false
        }
        if (val.method && this.strLength(val.method) > 77) {
          this.mdCanClick = true
        } else {
          this.mdCanClick = false
        }
      },
      deep: true,
      immediate: true
    }
  },
  methods: {
    /* eslint-disable */
    handleClose() {
      this.$emit('close')
      this.form = {}
      this.newOne = new Date().valueOf()
    },
    showIdDetail(e) {
      if (!this.idCanClick) return
      this.idShow = !this.idShow
      this.idShow ? (e.target.className = 'playId') : (e.target.className = '')
    },
    showDtDetail(e) {
      if (!this.dtCanClick) return
      this.dtShow = !this.dtShow
      this.dtShow ? (e.target.className = 'dataType') : (e.target.className = '')
    },
    showMdDetail(e) {
      if (!this.mdCanClick) return
      this.mdShow = !this.mdShow
      this.mdShow ? (e.target.className = 'method') : (e.target.className = '')
    },
    strLength(str) {
      let len = 0;
      for (let i = 0; i < str.length; i++) {
        let c = str.charCodeAt(i);
        if (c > 255) {
          len += 2;
        } else {
          len += 1;
        }
      }
      return len;
    }
  },
}
</script>
<style lang="scss" scoped>
/deep/.el-dialog {
	width: 35%;
	min-width: 580px;
	.el-dialog__header .el-dialog__title {
		font-weight: 700;
		font-size: 20px;
	}

	.el-dialog__body,
	.el-dialog__footer {
		display: flex;
		justify-content: center;

		.el-form-item {
			margin-bottom: 10px;

			.el-form-item__label {
				font-size: 16px;
				font-weight: normal;
				text-align: justify;
				text-align-last: justify;
				padding: 0 25px 0 0;
				height: 40px;

				&:after {
					content: ' :';
					display: inline-block;
					padding-left: 100%;
					font-weight: 700;
					position: relative;
					top: -40px;
					left: 0px;
				}
			}

			p.playId,
			p.dataType,
			p.method {
				overflow: visible;
				height: 100%;
				max-height: 240px;
				margin: 0;
				line-height: 25px;
				display: block;
			}

			p {
				width: 300px !important;
				margin: 0;
				font-size: 16px;
				overflow: hidden;
				// white-space: nowrap;
				text-overflow: ellipsis;
				display: -webkit-box;
				-webkit-line-clamp: 2; //（行数）
				-webkit-box-orient: vertical;
			}
		}
	}
}
</style>
