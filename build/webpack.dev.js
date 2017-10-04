const merge = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common,{
	devServer: {
		historyApiFallback: true,
		noInfo: true,
		proxy: {
			"/lease": {
				target: "http://lease.loverqi.cn:8080",
				changeOrigin: true
			},
		},
		contentBase: './dist'
	},
	performance: {
		hints: false
	},
	devtool: '#eval-source-map',
	// devtool: '#cheap-module-eval-source-map',
});