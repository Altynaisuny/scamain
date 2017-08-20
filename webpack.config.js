var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

function resolve(dir) {
  return path.join(__dirname, '..', dir);
}

module.exports = {
  entry: './src/main.js',//入口文件路径
  output: {
    path: path.resolve(__dirname, './dist'),//存放打包后文件的路径
    publicPath: '/dist/',
    filename: 'build.js'
  },
  plugins: [
    new ExtractTextPlugin("style.css")
  ],
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          // other vue-loader options go here
          css: ExtractTextPlugin.extract({
            use: 'css-loader',
            fallback: 'vue-style-loader'
          }),
          less: ExtractTextPlugin.extract({
            use: 'css-loader!less-loader',
          })
        }
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      { test: /\.css$/,
        loader: "style-loader!css-loader"
      },
      { test: /\.(eot|woff|woff2|ttf)$/,
        loader: "file-loader"
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]?[hash]'
        }
      }
    ]
  },
  resolve: {
    //常用位置别名
    alias: {
      'vue': 'vue/dist/vue.js',
      'pages': resolve('src/pages'),
      'base' : resolve('src/base')
    }
  },
  devServer: {
    historyApiFallback: true,
    noInfo: true
  },
  performance: {
    hints: false
  },
  devtool: '#eval-source-map'
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
