<template>
  <div class="detail">
    <el-dialog :key="newOne" class="edit-drawer" :title="$t('title.monitorInfo')" :visible.sync="elDrawer" :close-on-click-modal="false" @close="handleClose">
      <el-form ref="form" :model="form" label-width="90px">
        <el-form-item :label="$t('tableColumn.alarmType')" prop="alarmType">
          <p>{{ form.alarmType }}</p>
        </el-form-item>
        <el-form-item :label="$t('tableColumn.alarmLevel')" prop="alarmLevel">
          <p>{{ form.alarmLevel }}</p>
        </el-form-item>
        <el-form-item :label="$t('tableColumn.service')" prop="service">
          <p>{{ form.service }}</p>
        </el-form-item>
        <el-form-item :label="$t('tableColumn.monitorMethod')" prop="method">
          <p>{{ form.method }}</p>
        </el-form-item>
        <el-form-item :label="$t('tableColumn.alarmContent')" prop="alarmContent">
          <p @click="showAcDetail">{{ form.alarmContent }}</p>
        </el-form-item>
        <el-form-item :label="$t('label.dataType')" prop="dataType">
          <p @click="showDtDetail">{{ form.dataType }}</p>
        </el-form-item>
        <el-form-item :label="$t('label.originData')" prop="data">
          <p @click="showOdDetail">{{ form.data }}</p>
        </el-form-item>
        <el-form-item :label="$t('label.ip')" prop="ip">
          <p>{{ form.ip }}</p>
        </el-form-item>
        <el-form-item :label="$t('label.sysName')" prop="sysName">
          <p>{{ form.sysName }}</p>
        </el-form-item>
        <el-form-item :label="$t('label.userName')" prop="userName">
          <p>{{ form.userName }}</p>
        </el-form-item>
        <el-form-item :label="$t('label.agentName')" prop="agentName">
          <p>{{ form.agentName }}</p>
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
    monitorData: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      elDrawer: false,
      acShow: false,
      acCanClick: false,
      dtShow: false,
      dtCanClick: false,
      odShow: false,
      odCanClick: false,
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
    monitorData: {
      handler(val) {
        this.form = { ...val }
        if (val.alarmContent && this.strLength(val.alarmContent) > 77) {
          this.acCanClick = true
        } else {
          this.acCanClick = false
        }
        if (val.dataType && this.strLength(val.dataType) > 77) {
          this.dtCanClick = true
        } else {
          this.dtCanClick = false
        }
        if (val.data && this.strLength(val.data) > 77) {
          this.odCanClick = true
        } else {
          this.odCanClick = false
        }
      },
      deep: true,
      immediate: true
    }
  },
  methods: {
    handleClose() {
      this.$emit('close')
      this.form = {}
      this.newOne = new Date().valueOf()
    },
    showAcDetail(e) {
      if (!this.acCanClick) return
      this.acShow = !this.acShow
      this.acShow ? (e.target.className = 'acontent') : (e.target.className = '')
    },
    showDtDetail(e) {
      if (!this.dtCanClick) return
      this.dtShow = !this.dtShow
      this.dtShow ? (e.target.className = 'dType') : (e.target.className = '')
    },
    showOdDetail(e) {
      if (!this.odCanClick) return
      this.odShow = !this.odShow
      this.odShow ? (e.target.className = 'odata') : (e.target.className = '')
    },
    strLength(str) {
      let len = 0
      for (let i = 0; i < str.length; i++) {
        const c = str.charCodeAt(i)
        if (c > 255) {
          len += 2
        } else {
          len += 1
        }
      }
      return len
    }
  }
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

			p.acontent,
			p.dType,
			p.odata {
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
