const path = require('path');
const webpack = require('webpack');

const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

function resolve(dir) {
	return path.join(__dirname, '..', dir);
}

module.exports = {
	entry: './src/main.js',//入口文件路径
	output: {
		publicPath: "/",
		path: path.resolve(__dirname, './dist'),//存放打包后文件的路径
		filename: 'build.js'
	},
	plugins: [
		new CleanWebpackPlugin(['./dist']),
		new ExtractTextPlugin({
			filename: "style.css"
		}),
		// new HtmlWebpackPlugin({
		// 	hash: true,
		// 	template: './src/index.tpl',
		// 	filename: "index.html"
		// }),

	],
	resolve: {
		//常用位置别名
		alias: {
			'vue': 'vue/dist/vue.js',
			'pages': resolve('src/pages'),
			'base': resolve('src/base')
		}
	},
	module: {
		rules: [
			{
				test: /\.vue$/,
				use: {
					loader: 'vue-loader',
					options: {
						loaders: {
							css: ExtractTextPlugin.extract({
								use: 'css-loader',
								fallback: 'vue-style-loader'
							}),
							less: ExtractTextPlugin.extract({
								use: 'css-loader!less-loader',
							})
						}
					}
				}
			},
			{
				test: /\.js$/,
				loader: 'babel-loader',
				exclude: /node_modules/
			},
			{
				test: /\.css$/,
				use: [
					'style-loader',
					'css-loader'
				]
			},
			{
				test: /\.less$/,
				use: [
					'less-loader'
				]
			},
			{
				test: /\.(eot|woff|woff2|ttf)$/,
				use: {
					loader: 'file-loader',
				}
			},
			{
				test: /\.(png|jpg|gif|svg)$/,
				use: {
					loader: 'file-loader',
				}
			}
		]
	},
	devServer: {
		historyApiFallback: true,
		noInfo: true,
		proxy: {
			"/lease": {
				target: "http://leaset.loverqi.cn:8080",
				changeOrigin: true
			},
		}
	},
	performance: {
		hints: false
	},
	devtool: '#eval-source-map',
}

if (process.env.NODE_ENV === 'production') {
	module.exports.devtool = '#source-map'
	// http://vue-loader.vuejs.org/en/workflow/production.html
	module.exports.plugins = (module.exports.plugins || []).concat([
		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: '"production"'
			}
		}),
		new webpack.optimize.UglifyJsPlugin({
			sourceMap: true,
			compress: {
				warnings: false
			}
		}),
		new webpack.LoaderOptionsPlugin({
			minimize: true
		})
	])
}