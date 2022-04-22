// vue.config.js
module.exports = {
	chainWebpack: config => {
		config.module.rule('vue').use('vue-loader').loader('vue-loader').tap(options => {
			const compile = options.compiler.compile
			options.compiler.compile = (template, ...args) => {
				if (args[0].resourcePath.match(/^pages/)) {
					template = template.replace(/[\s\S]+?<[\d\D]+?>/, _ => `${_}
					  <tm-message ref="toast" />
					`)
				}
				return compile(template, ...args)
			}
			return options
		})
	}
}
