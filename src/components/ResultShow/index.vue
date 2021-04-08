<template>
	<div style="text-align: center">
		<!-- 龙虎 -->
		<div v-if="gameTypeId === 2006">
			<el-row>
				<el-col :span="12">
					<img :src="getPokerImage(judgeResults[0])" alt="图片" />
					<div class="text-style">
						<div>{{ results[0] }}</div>
					</div>
				</el-col>
				<el-col :span="12">
					<img :src="getPokerImage(judgeResults[1])" alt="图片" />
					<div class="text-style">
						<div>{{ results[1] }}</div>
					</div>
				</el-col>
			</el-row>
		</div>
		<!-- 轮盘 -->
		<div v-else-if="gameTypeId === 2007">
			<div class="round">{{ results[0] }}</div>
		</div>
		<!-- 骰宝 -->
		<div v-else-if="gameTypeId === 2008">
			<div>
				<img :src="getScImage(judgeResults[0])" alt="图片" />
				<img :src="getScImage(judgeResults[1])" alt="图片" />
				<img :src="getScImage(judgeResults[2])" alt="图片" />
				<div>{{ result }}</div>
			</div>
		</div>
		<!-- 炸金花 -->
		<div v-else-if="gameTypeId === 2010">
			<el-row>
				<el-col :span="12">
					<img :src="getPokerImage(judgeResults[0] && judgeResults[0].split(':')[0])" alt="图片" />
					<img :src="getPokerImage(judgeResults[0] && judgeResults[0].split(':')[1])" alt="图片" />
					<img :src="getPokerImage(judgeResults[0] && judgeResults[0].split(':')[2])" alt="图片" />
					<div>{{ results[0] }}</div>
				</el-col>
				<el-col :span="12">
					<img :src="getPokerImage(judgeResults[1] && judgeResults[1].split(':')[0])" alt="图片" />
					<img :src="getPokerImage(judgeResults[1] && judgeResults[1].split(':')[1])" alt="图片" />
					<img :src="getPokerImage(judgeResults[1] && judgeResults[1].split(':')[2])" alt="图片" />
					<div>{{ results[1] }}</div>
				</el-col>
			</el-row>
		</div>
		<!-- 三公, 牛牛 -->
		<div v-else-if="gameTypeId === 2011 || gameTypeId === 2009">
			<el-row>
				<el-col :span="12">
					<img :src="getPokerImage(judgeResults[2] && judgeResults[2].split(':')[0])" alt="图片" />
					<img :src="getPokerImage(judgeResults[2] && judgeResults[2].split(':')[1])" alt="图片" />
					<img :src="getPokerImage(judgeResults[2] && judgeResults[2].split(':')[2])" alt="图片" />
					<template v-if="gameTypeId === 2009">
						<img :src="getPokerImage(judgeResults[2] && judgeResults[2].split(':')[3])" alt="图片" />
						<img :src="getPokerImage(judgeResults[2] && judgeResults[2].split(':')[4])" alt="图片" />
					</template>
					<div>{{ results[0] }}</div>
				</el-col>
				<el-col :span="12">
					<img :src="getPokerImage(judgeResults[3] && judgeResults[3].split(':')[0])" alt="图片" />
					<img :src="getPokerImage(judgeResults[3] && judgeResults[3].split(':')[1])" alt="图片" />
					<img :src="getPokerImage(judgeResults[3] && judgeResults[3].split(':')[2])" alt="图片" />
					<template v-if="gameTypeId === 2009">
						<img :src="getPokerImage(judgeResults[3] && judgeResults[3].split(':')[3])" alt="图片" />
						<img :src="getPokerImage(judgeResults[3] && judgeResults[3].split(':')[4])" alt="图片" />
					</template>
					<div>{{ results[1] }}</div>
				</el-col>
				<el-col :span="12">
					<img :src="getPokerImage(judgeResults[4] && judgeResults[4].split(':')[0])" alt="图片" />
					<img :src="getPokerImage(judgeResults[4] && judgeResults[4].split(':')[1])" alt="图片" />
					<img :src="getPokerImage(judgeResults[4] && judgeResults[4].split(':')[2])" alt="图片" />
					<template v-if="gameTypeId === 2009">
						<img :src="getPokerImage(judgeResults[4] && judgeResults[4].split(':')[3])" alt="图片" />
						<img :src="getPokerImage(judgeResults[4] && judgeResults[4].split(':')[4])" alt="图片" />
					</template>
					<div>{{ results[2] }}</div>
				</el-col>
				<el-col :span="12">
					<img :src="getPokerImage(judgeResults[1] && judgeResults[1].split(':')[0])" alt="图片" />
					<img :src="getPokerImage(judgeResults[1] && judgeResults[1].split(':')[1])" alt="图片" />
					<img :src="getPokerImage(judgeResults[1] && judgeResults[1].split(':')[2])" alt="图片" />
					<template v-if="gameTypeId === 2009">
						<img :src="getPokerImage(judgeResults[1] && judgeResults[1].split(':')[3])" alt="图片" />
						<img :src="getPokerImage(judgeResults[1] && judgeResults[1].split(':')[4])" alt="图片" />
					</template>
					<div>{{ results[3] }}</div>
				</el-col>
			</el-row>
		</div>
		<!-- 21点 -->
		<div v-else-if="gameTypeId === 2012">
			<template v-if="page === 'betrecord'">
				<el-row>
					<el-col :span="12">
						<img
							v-for="(item, index) in judgeResults[0] && judgeResults[0].split(':')"
							:key="index"
							:src="getPokerImage(judgeResults[0] && judgeResults[0].split(':')[index])"
							alt="图片"
						/>
						<div>{{ results[0] }}</div>
					</el-col>
					<el-col :span="12">
						<img
							v-for="(item, index) in judgeResults[1] && judgeResults[1].split(':')"
							:key="index"
							:src="getPokerImage(judgeResults[1] && judgeResults[1].split(':')[index])"
							alt="图片"
						/>
						<div>{{ `闲${results[1]}` }}</div>
					</el-col>
				</el-row>
			</template>
			<template v-else>
				<img
					v-for="(item, index) in judgeResults"
					:key="index"
					:src="getPokerImage(judgeResults[index])"
					alt="图片"
				/>
				<div>{{ result }}</div>
			</template>
		</div>
		<!-- 百家乐 -->
		<div v-else>
			<el-row>
				<el-col :span="12">
					<img
						v-for="(item, index) in Baccarats"
						:key="index"
						:src="getPokerImage(Baccarats[index])"
						:class="Baccarats.length > 2 && index === 0 ? 'rotate-right' : ''"
						alt="图片"
					/>
					<div>{{ results[0] }}</div>
				</el-col>
				<el-col :span="12">
					<img
						v-for="(item, index) in judgeResults[0] && judgeResults[0].split(':')"
						:key="index"
						:src="getPokerImage(judgeResults[0] && judgeResults[0].split(':')[index])"
						:class="index === 2 ? 'rotate-left' : ''"
						alt="图片"
					/>
					<div>{{ results[1] }}</div>
				</el-col>
			</el-row>
		</div>
	</div>
</template>

<script>
export default {
	name: 'ResultShow',
	props: {
		page: {
			type: String,
			default: 'betrecord' // 下注记录 会员
		},
		gameTypeId: {
			type: Number,
			default: 2001
		},
		result: {
			type: String,
			default: ''
		},
		judgeResult: {
			type: String,
			default: ''
		}
	},
	data() {
		return {}
	},
	computed: {
		results() {
			if (this.gameTypeId === 2012 && this.page === 'betrecord') {
				return this.result.split(':')
			}
			if (
				this.gameTypeId === 2010 ||
				this.gameTypeId === 2009 ||
				this.gameTypeId === 2011
			) {
				return this.result.replace(/\(/g, ' ').split(')')
			} else {
				return this.result.split(' ')
			}
		},
		judgeResults() {
			let splitSymbol
			if (
				this.gameTypeId === 2008 ||
				(this.gameTypeId === 2012 && this.page !== 'betrecord')
			) {
				splitSymbol = ':'
			} else {
				splitSymbol = ';'
			}
			return this.judgeResult.split(splitSymbol)
		},
		// 百家乐特殊处理开牌顺序
		Baccarats() {
			if (this.judgeResults[1]) {
				const arr = this.judgeResults[1].split(':') || []
				if (arr.length > 2) {
					const temp = arr[0]
					arr[0] = arr[2]
					arr[2] = temp
				}
				return arr
			}
			return []
		}
	},
	methods: {
		getPokerImage(value) {
			if (value.length > 5) return
			return require(`@/assets/result_images/poker${value}.png`)
		},
		getScImage(value) {
			return require(`@/assets/result_images/sic_bo_zhong_sz${value}.png`)
		}
	}
}
</script>

<style lang="scss" scoped>
.text-style {
	text-align: center;
}
.round {
	margin: 0 auto;
	width: 50px;
	height: 100px;
	background: red;
	border-radius: 25px;
	line-height: 100px;
	text-align: center;
	color: #fff;
}
img {
	width: 18%;
}
.rotate-right {
	transform: rotate(90deg);
	margin-right: 3.5%;
}
.rotate-left {
	transform: rotate(90deg);
	margin-left: 3.5%;
}
</style>
