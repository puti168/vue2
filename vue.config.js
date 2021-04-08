'use strict'
const path = require('path')
const VersionPlugin = require('./version-plugin')
const defaultSettings = require('./src/settings.js')
function resolve(dir) {
	return path.join(__dirname, dir)
}

const name = defaultSettings.title || 'b2b management' // page title

const port = process.env.port || process.env.npm_config_port || 10086 // dev port

// http://vuejs.res.lzjshop.com/common-static/nprogress/index.css

module.exports = {
	transpileDependencies: ['vue-echarts', 'resize-detector'],
	/**
	 * You will need to set publicPath if you plan to deploy your site under a sub path,
	 * for example GitHub Pages. If you plan to deploy your site to https://foo.github.io/bar/,
	 * then publicPath should be set to "/bar/".
	 * In most cases please use '/' !!!
	 * Detail: https://cli.vuejs.org/config/#publicpath
	 */
	publicPath: '/',
	outputDir: 'dist',
	assetsDir: 'static',
	lintOnSave: process.env.NODE_ENV === 'development',
	productionSourceMap: false,
	devServer: {
		port,
		open: true,
		overlay: {
			warnings: false,
			errors: true
		}
	},
	configureWebpack: (config) => {
		console.log(
			[
				'                   _ooOoo_',
				'                  o8888888o',
				'                  88" . "88',
				'                  (| -_- |)',
				'                  O\\  =  /O',
				"               ____/`---'\\____",
				"             .'  \\\\|     |//  `.",
				'            /  \\\\|||  :  |||//  \\',
				'           /  _||||| -:- |||||-  \\',
				'           |   | \\\\\\  -  /// |   |',
				"           | \\_|  ''\\---/''  |   |",
				'           \\  .-\\__  `-`  ___/-. /',
				"         ___`. .'  /--.--\\  `. . __",
				'      ."" \'<  `.___\\_<|>_/___.\'  >\'"".',
				'     | | :  `- \\`.;`\\ _ /`;.`/ - ` : | |',
				'     \\  \\ `-.   \\_ __\\ /__ _/   .-` /  /',
				"======`-.____`-.___\\_____/___.-`____.-'======",
				"                   `=---='",
				'^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^',
				'         佛祖保佑       永无BUG'
			].join('\n')
		)
		// provide the app's title in webpack's name field, so that
		// it can be accessed in index.html to inject the correct title.
		config.name = name
		config.resolve.alias = {
			'@': resolve('src')
		}
		if (process.env.NODE_ENV !== 'development') {
			config.optimization
			config.optimization.minimizer
				? (config.optimization.minimizer[0].options.terserOptions.compress.drop_console = true)
				: ''
		}
		if (process.env.NODE_ENV === 'production') {
			// 加入生成版本插件
			config.plugins.push(new VersionPlugin({}))
		}
	},
	chainWebpack(config) {
		config.plugins.delete('preload') // TODO: need test
		config.plugins.delete('prefetch') // TODO: need test

		// set svg-sprite-loader
		config.module
			.rule('svg')
			.exclude.add(resolve('src/icons'))
			.end()
		config.module
			.rule('icons')
			.test(/\.svg$/)
			.include.add(resolve('src/icons'))
			.end()
			.use('svg-sprite-loader')
			.loader('svg-sprite-loader')
			.options({
				symbolId: 'icon-[name]'
			})
			.end()

		// set preserveWhitespace
		config.module
			.rule('vue')
			.use('vue-loader')
			.loader('vue-loader')
			.tap((options) => {
				options.compilerOptions.preserveWhitespace = true
				return options
			})
			.end()

		config
			// https://webpack.js.org/configuration/devtool/#development
			.when(process.env.NODE_ENV === 'development', (config) =>
				config.devtool('cheap-source-map')
			)

		config.when(process.env.NODE_ENV !== 'development', (config) => {
			// 添加dll
			// dllReference(config)
			config
				.plugin('ScriptExtHtmlWebpackPlugin')
				.after('html')
				.use('script-ext-html-webpack-plugin', [
					{
						// `runtime` must same as runtimeChunk name. default is `runtime`
						inline: /runtime\..*\.js$/
					}
				])
				.end()
			config.optimization.splitChunks({
				chunks: 'all',
				cacheGroups: {
					libs: {
						name: 'chunk-libs',
						test: /[\\/]node_modules[\\/]/,
						priority: 10,
						chunks: 'initial' // only package third parties that are initially dependent
					},
					elementUI: {
						name: 'chunk-elementUI', // split elementUI into a single package
						priority: 20, // the weight needs to be larger than libs and app or it will be packaged into libs or app
						test: /[\\/]node_modules[\\/]_?element-ui(.*)/ // in order to adapt to cnpm
					},
					commons: {
						name: 'chunk-commons',
						test: resolve('src/components'), // can customize your rules
						minChunks: 3, //  minimum common number
						priority: 5,
						reuseExistingChunk: true
					}
				}
			})
			config.optimization.runtimeChunk('single')
		})
	}
}
