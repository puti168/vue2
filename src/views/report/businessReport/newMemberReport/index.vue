<template>
	<div class="game-container report-container">
		<div class="view-container dealer-container">
			<div class="params">
				<el-form ref="form" :inline="true">
					<el-form-item label="日期:">
						<el-date-picker
							v-model="searchTime"
							type="daterange"
							range-separator="-"
							:clearable="false"
							start-placeholder="开始日期"
							end-placeholder="结束日期"
							:picker-options="timeControl"
						></el-date-picker>
					</el-form-item>

					<el-form-item>
						<el-button
							type="primary"
							icon="el-icon-search"
							:disabled="flag"
							size="medium"
							@click="search"
						>
							{{ queryText }}
						</el-button>
						<el-button
							icon="el-icon-refresh-left"
							:disabled="flag"
							size="medium"
							@click="reset"
						>
							重置
						</el-button>
						<el-button
							v-if="hasPermission('357')"
							icon="el-icon-download"
							type="warning"
							:disabled="loading"
							size="medium"
							@click="exportExcel"
						>
							导出
						</el-button>
						<el-button
							type="success"
							icon="el-icon-setting"
							:disabled="loading"
							size="medium"
							@click="openSetting"
						>
							列设置
						</el-button>
					</el-form-item>
				</el-form>
			</div>
			<div class="content">
				<el-table
					ref="tables"
					v-loading="loading"
					border
					class="small-size-table"
					:data="tableData"
					style="width: 100%"
					:header-cell-style="getRowClass"
				>
					<el-table-column
						v-if="newMemberReport['日期']"
						prop="staticsDate"
						align="center"
						label="日期"
					></el-table-column>
					<el-table-column
						v-if="newMemberReport['新增人数']"
						prop="registeredMemberCount"
						align="center"
						label="新增人数"
					></el-table-column>
					<el-table-column
						v-if="newMemberReport['7天后']"
						prop="retentionRate7Day"
						align="center"
						label="7天后"
					></el-table-column>
					<el-table-column
						v-if="newMemberReport['14天后']"
						prop="retentionRate14Day"
						align="center"
						label="14天后"
					></el-table-column>
					<el-table-column
						v-if="newMemberReport['30天后']"
						prop="retentionRate30Day"
						align="center"
						label="30天后"
					></el-table-column>
					<el-table-column
						v-if="newMemberReport['60天后']"
						prop="retentionRate60Day"
						align="center"
						label="60天后"
					></el-table-column>
					<el-table-column
						v-if="newMemberReport['90天后']"
						prop="retentionRate90Day"
						align="center"
						label="90天后"
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
				title="列设置"
				center
				:visible.sync="visible"
				width="300px"
				class="col-setting"
			>
				<el-link type="primary" @click="clickDel">复原缺省</el-link>
				<div
					v-for="(value, name) in newMemberReport"
					:key="name"
					class="setting-div"
				>
					<el-checkbox v-if="newList.length > 0" v-model="newList[0][name]">
						{{ name }}
					</el-checkbox>
				</div>
				<div slot="footer" class="dialog-footer">
					<el-button @click="visible = false">取 消</el-button>
					<el-button type="primary" @click="confirm">提交</el-button>
				</div>
			</el-dialog>
		</div>
	</div>
</template>

<script>
import list from '@/mixins/list'
import dayjs from 'dayjs'
const startTime =
	dayjs()
		.startOf('day')
		.valueOf() -
	6 * 24 * 60 * 60 * 1000
const endTime = dayjs()
	.endOf('day')
	.valueOf()

export default {
	components: {},
	mixins: [list],
	data() {
		return {
			searchTime: [startTime, endTime],
			day31: 30 * 24 * 3600 * 1000,
			// 日期使用
			timeControl: {
				onPick: ({ maxDate, minDate }) => {
					console.log(maxDate, minDate)
					if (maxDate - minDate > this.day31) {
						this.flag = true
						this.$message.warning('请缩小搜索范围至31天')
					}
					if (
						maxDate !== null &&
						minDate !== null &&
						maxDate - minDate <= this.day31 &&
						this.queryText === '查询'
					) {
						this.flag = false
					} else {
						this.flag = true
					}
				},
				disabledDate: (time) => {
					return time.getTime() > Date.now()
				}
			},
			flag: false,
			queryText: '查询',
			tableData: [],
			visible: false,
			newMemberReport: {
				日期: true,
				新增人数: true,
				'7天后': true,
				'14天后': true,
				'30天后': true,
				'60天后': true,
				'90天后': true
			},
			myName: '',
			newList: [],
			timecount: null
		}
	},
	computed: {},
	mounted() {
		this.myName = localStorage.getItem('username')
		this.initDB()
	},

	methods: {
		// 列设置
		openSetting() {
			this.getList()
			this.visible = true
		},
		initDB() {
			const request = indexedDB.open('newMemberReport')
			request.onupgradeneeded = (event) => {
				const db = event.target.result
				this.db = db
				// 建表 名为person,主键为id
				db.createObjectStore('newMemberReport', {
					keyPath: 'id',
					autoIncrement: true
				})
			}

			request.onsuccess = (event) => {
				this.db = event.target.result
				console.log('数据库打开/创建成功', event)
				this.clickAdd()
				this.getList()
			}
		},
		clickAdd() {
			const request = this.db
				.transaction(['newMemberReport'], 'readwrite')
				.objectStore('newMemberReport')
				.add({
					id: this.myName,
					obj: this.newMemberReport
				})
			request.onsuccess = (event) => {
				this.getList()
			}
		},
		getList() {
			this.newList = []
			var transaction = this.db.transaction(['newMemberReport'])
			const objectStore = transaction.objectStore('newMemberReport')
			const list = []
			objectStore.openCursor().onsuccess = (event) => {
				const cursor = event.target.result
				if (cursor) {
					list.push(cursor.value)
					cursor.continue()
				} else {
					for (let i = 0; i < list.length; i++) {
						const ele = list[i]
						if (ele.id === this.myName) {
							this.newList.push(ele.obj)
							this.newMemberReport = { ...ele.obj }
						}
					}
				}
			}
		},
		confirm() {
			const request = this.db
				.transaction(['newMemberReport'], 'readwrite')
				.objectStore('newMemberReport')
				.put({
					id: this.myName,
					obj: this.newList[0]
				})
			request.onsuccess = (event) => {
				this.visible = false
				this.getList()
				console.log('数据更新成功')
			}

			request.onerror = (event) => {
				console.log('数据更新失败')
			}
		},
		clickDel(id) {
			this.newList = []
			this.newList.push({
				日期: true,
				新增人数: true,
				'7天后': true,
				'14天后': true,
				'30天后': true,
				'60天后': true,
				'90天后': true
			})
		},
		loadData() {
			const create = this.searchTime || []
			const [startTime, endTime] = create
			let params = {
				startTime: startTime ? dayjs(startTime).format('YYYY-MM-DD') : '',
				endTime: endTime ? dayjs(endTime).format('YYYY-MM-DD') : ''
			}
			params = {
				...this.getParams(params)
			}
			if (endTime - startTime > this.day31) {
				this.$message.warning('请缩小搜索范围至31天')
			} else {
				this.loading = true
				this.$api
					.getReportNewMemberRetentionDay(params)
					.then((res) => {
						if (res.code === 200 && res.data !== null) {
							this.tableData = res.data.record
							this.total = res.data.totalRecord
							console.log(res)
						} else {
							this.tableData = []
							this.total = 0
						}
						this.loading = false
					})
					.catch(() => {
						this.loading = false
					})
			}
		},
		search() {
			const create = this.searchTime || []
			const [startTime, endTime] = create
			console.log(create)
			if (endTime - startTime <= this.day31) {
				this.flag = true
				let t = 10
				clearInterval(this.timecount)
				this.timecount = setInterval(() => {
					t--
					this.queryText = t + 's'
					if (t < 0) {
						clearInterval(this.timecount)
						this.queryText = '查询'
						this.flag = false
					}
				}, 1000)
				this.loadData()
			} else {
				this.flag = true
				this.loadData()
			}
		},
		reset() {
			this.searchTime = [startTime, endTime]
			this.pageNum = 1
			this.search()
		},
		exportExcel() {
			this.loading = true
			const create = this.searchTime || []
			const [startTime, endTime] = create
			let params = {
				startTime: startTime ? dayjs(startTime).format('YYYY-MM-DD') : '',
				endTime: endTime ? dayjs(endTime).format('YYYY-MM-DD') : ''
			}
			params = {
				...this.getParams(params)
			}
			this.$confirm(
				`<strong>是否导出?</strong></br><span style='font-size:12px;color:#c1c1c1'>数据过大时，请耐心等待</span>`,
				'确认提示',
				{
					dangerouslyUseHTMLString: true,
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}
			)
				.then(() => {
					this.$api
						.getGameRecordDownload(params)
						.then((res) => {
							this.loading = false
							const { data, status } = res
							if (res && status === 200) {
								const { type } = data
								if (type.includes('application/json')) {
									const reader = new FileReader()
									reader.onload = (evt) => {
										if (evt.target.readyState === 2) {
											const {
												target: { result }
											} = evt
											const ret = JSON.parse(result)
											if (ret.code !== 200) {
												this.$message({
													type: 'error',
													message: ret.msg,
													duration: 1500
												})
											}
										}
									}
									reader.readAsText(data)
								} else {
									const result = res.data
									const disposition = res.headers['content-disposition']
									const fileNames = disposition && disposition.split("''")
									let fileName = fileNames[1]
									fileName = decodeURIComponent(fileName)
									const blob = new Blob([result], {
										type: 'application/octet-stream'
									})
									if ('download' in document.createElement('a')) {
										const downloadLink = document.createElement('a')
										downloadLink.download = fileName || ''
										downloadLink.style.display = 'none'
										downloadLink.href = URL.createObjectURL(blob)
										document.body.appendChild(downloadLink)
										downloadLink.click()
										URL.revokeObjectURL(downloadLink.href)
										document.body.removeChild(downloadLink)
									} else {
										window.navigator.msSaveBlob(blob, fileName)
									}
									this.$message({
										type: 'success',
										message: '导出成功',
										duration: 1500
									})
								}
							}
						})
						.catch(() => {
							this.loading = false
							this.$message({
								type: 'error',
								message: '导出失败',
								duration: 1500
							})
						})
				})
				.catch(() => {})
		}
	}
}
</script>

<style lang="scss" scoped>
/deep/.el-dialog__header {
	color: #5c5c5c;
	font-weight: 700;
}
.params {
	padding-bottom: 15px;
}
/deep/ .el-table__footer-wrapper .cell::after {
	border: 1px solid #ebeef5;
	content: '';
	position: absolute;
	top: 41px;
	left: 0;
	width: 100%;
}

/deep/ .el-table__fixed-footer-wrapper tr::after {
	border: 1px solid #ebeef5;
	content: '';
	position: absolute;
	top: 41px;
	left: 0;
	width: 100%;
}
.count_row {
	height: 80px;
	color: #5c5c5c;
	p {
		height: 40px;
		line-height: 40px;
		font-weight: 700;
		span {
			display: inline-block;
			width: 20px;
			height: 20px;
		}
	}
}
.fenye {
	text-align: center;
}
</style>
