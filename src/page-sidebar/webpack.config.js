var webpack = require("webpack");
var CopyWebpackPlugin = require('copy-webpack-plugin');

var isProdBuild = process.env.npm_lifecycle_event === 'build-prod';
module.exports = {
  entry: {
    "vendor": "./src/vendor",
    "app": "./src/boot"
  },
  output: {
    path: __dirname,
    filename: "./dist/[name].bundle.js"
  },
  resolve: {
    extensions: ['', '.ts', '.js']
  },
  devtool: isProdBuild ? null : 'source-map',
  module: {
    preLoaders: [
      {
          test: /\.ts$/,
          loader: "tslint"
      }
    ],
    loaders: [
      {
        test: /\.ts/,
        loaders: ['ts-loader', 'angular2-template-loader'],
        exclude: /node_modules/
      },
      {
        test: /\.html$/,
        loader: 'html?-minimize'
      },
      {
        test: /\.css$/,
        loader: 'raw-loader'
      },
      {
        test: /\.(jpg|png)$/,
        loader: 'file?name=./dist/images/[name].[hash].[ext]'
      },
      {
        test: /\.json$/,
        loader: "json-loader"
      }
    ]
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin("vendor", "./dist/vendor.bundle.js"),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': isProdBuild ?
        JSON.stringify('production') :
        JSON.stringify('development')
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      mangle: true,
      compress: {
          screw_ie8: true,
          warnings: false
      }
    }),
    new CopyWebpackPlugin([{
      from: 'node_modules/font-awesome/css/font-awesome.min.css',
      to: 'dist/'
    }])


  ]
};
