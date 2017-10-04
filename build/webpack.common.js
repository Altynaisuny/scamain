const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

function resolve(dir) {
	return path.resolve(__dirname, dir);
}

module.exports = {
	entry: {
		app:'./src/main.js',
	},
	externals: {
		'vue': 'Vue',
		'vue-router': 'VueRouter',
		'vuex': 'Vuex',
		'axios': 'axios',
	},
	output: {
		path: resolve('./dist'),//存放打包后文件的路径
		publicPath: "/",
		filename: '[name].build.[hash].js',
		chunkFilename: '[name].[chunkHash].js',
	},
	resolve: {
		//常用位置别名
		alias: {
			'vue$': 'vue/dist/vue.esm.js',
			'pages': resolve('../src/pages'),
			'build': resolve('../build'),
			'static': resolve('../static'),
		}
	},
	plugins: [
		//清理dist
		new CleanWebpackPlugin(resolve('./dist')),
		//自动生成index.html
		new HtmlWebpackPlugin({
			hash: true,
			template: 'src/index.tpl',
			filename: "index.html"
		}),
	],
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
				exclude: '/node_modules/'
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
				test: /\.(woff|woff2|eot|ttf|otf)$/,
				use: {
					loader: 'file-loader',
				}
			},
			{
				test: /\.(png|jpg|gif|svg)$/,
				use: {
					loader: 'file-loader',
					options: {
						name: '[name].[ext]?[hash]'
					}
				}
			}
		]
	}
};