module.exports = {
	presets: ['@vue/app'],
	plugins: [
		[
			'import',
			{
				libraryName: 'umy-ui',
				styleLibraryName: 'theme-chalk'
			}
		]
	]
}
