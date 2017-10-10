const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = merge(common, {
	plugins: [
		//清理dist
		new CleanWebpackPlugin(resolve('./dist')),
		//自动生成index.html
		new HtmlWebpackPlugin({
			hash: true,
			template: 'src/index.tpl',
			filename: "index.html"
		}),
		//浏览器加内核前缀
		new webpack.LoaderOptionsPlugin({
			minimize: true
		}),

		// 将 CSS 从主应用程序中分离
		new ExtractTextPlugin({
			filename: "[name].style.[hash].css"
		}),

		// 将模块分离到单独的文件
		new webpack.optimize.CommonsChunkPlugin({
			name: ['main'],
			minChunks: Infinity,
		}),

		// 代码压缩
		new UglifyJSPlugin({
			compress: {
				warnings: false
			},
			sourceMap: false,
			test: /\.js($&#124;\?)/i
		}),

		new webpack.DefinePlugin({
			'process.env':{
				NODE_ENV:JSON.stringify('production')
			}

		})
	]
});