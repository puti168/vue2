'use strict'

// 真人版本号示例： 1.1.1.20191112

const FStream = require('fs')

const primaryVersion = process.env.VERSION_ENV

// 格式化日期
/* eslint-disable */
Date.prototype.Format = function(fmt) {
	let o = {
		'M+': this.getMonth() + 1, //月份
		'd+': this.getDate(), //日
		'h+': this.getHours(), //小时
		'm+': this.getMinutes(), //分
		's+': this.getSeconds(), //秒
		'q+': Math.floor((this.getMonth() + 3) / 3), //季度
		S: this.getMilliseconds() //毫秒
	}
	if (/(y+)/.test(fmt))
		fmt = fmt.replace(
			RegExp.$1,
			(this.getFullYear() + '').substr(4 - RegExp.$1.length)
		)
	for (var k in o)
		if (new RegExp('(' + k + ')').test(fmt))
			fmt = fmt.replace(
				RegExp.$1,
				RegExp.$1.length == 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length)
			)
	return fmt
}
/* eslint-disable */

const versionName = process.env.VERSION_NAME

/**
 * 版本信息生成插件
 * @author ll
 * @param options
 * @constructor
 */
function VersionPlugin(options) {
	this.options = options || {}
	!this.options.versionDirectory &&
		(this.options.versionDirectory = 'dist/static')
}

// apply方法是必须要有的，因为当我们使用一个插件时（new somePlugins({})），webpack会去寻找插件的apply方法并执行
VersionPlugin.prototype.apply = function(compiler) {
	var self = this
	// compiler.plugin('compile', function(params) {
	// })
	// 编译器'对'所有任务已经完成'这个事件的监听
	compiler.plugin('done', function(stats) {
		let VERSION = ''
		if (FStream.existsSync(versionName)) {
			const data = FStream.readFileSync(versionName, 'utf8')
			var parseData = JSON.parse(data)
			console.log('parseData :', parseData)
			let versions = parseData.version
			if (
				primaryVersion[2] !== versions[2] ||
				primaryVersion[4] !== versions[4]
			) {
				versions = primaryVersion
				VERSION = generateVersion(compiler, versions)
			} else {
				VERSION = generateVersion(compiler, versions, 1)
			}
		} else {
			let versions = primaryVersion
			VERSION = generateVersion(compiler, versions)
		}
		console.log('应用编译完成！')
		var dir_path = compiler.context + '/' + self.options.versionDirectory
		var version_file = dir_path + '/version.json'
		var content = '{"version":' + JSON.stringify(VERSION) + '}'
		FStream.exists(dir_path, function(exist) {
			if (exist) {
				writeVersion(version_file, content)
				return
			}
			FStream.mkdir(dir_path, function(err) {
				if (err) throw err
				console.log('\n创建目录[' + dir_path + ']成功')
				writeVersion(version_file, content)
			})
		})
	})
}

/**
 * @desc 生成版本文件
 * @param {*} compiler
 * @param {*} version 版本 类似 'A 1.0.1' 这种
 */
const generateVersionFile = (compiler, version) => {
	var dir_path = compiler.context + '/'
	var version_file = dir_path + `/${versionName}`
	var content = '{"version":' + JSON.stringify(version) + '}'
	FStream.exists(dir_path, function(exist) {
		if (exist) {
			writeVersion(version_file, content)
			return
		}
		FStream.mkdir(dir_path, function(err) {
			if (err) throw err
			console.log('\n创建目录[' + dir_path + ']成功')
			writeVersion(version_file, content)
		})
	})
}

/**
 * @desc 生成版本号
 * @param {*} compiler
 * @param {*} value 版本 类似 'A 1.0.1' 这种
 * @param {*} type 是否需要版本 z 位 +1
 */
const generateVersion = (compiler, value, type) => {
	// 获取发布版本日期
	const publishDate = new Date().Format('yyyyMMdd hh:mm')
	let VERSION = ''
	let versions = value
	versions = versions && versions.split('.')
	if (type === 1) {
		versions[2] = Number(versions[2]) + 1
	}
	const joinVersion = versions.join('.')
	VERSION = `${joinVersion}.${publishDate}`
	generateVersionFile(compiler, joinVersion)
	return VERSION
}

const writeVersion = (versionFile, content) => {
	console.log('开始写入版本信息...')
	// 写入文件
	FStream.writeFile(versionFile, content, function(err) {
		if (err) throw err
		console.log('版本信息写入成功!')
	})
}

module.exports = VersionPlugin
