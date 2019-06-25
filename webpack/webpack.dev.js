const merge = require('webpack-merge');
const common = require('./webpack.common.js');

 module.exports = merge(common, {
       mode: 'development',
       devtool: 'inline-source-map',
       devServer: {
        // ให้เว็บเรียก url ตรงๆ ได้
        // host: '0.0.0.0',
        // port: 8080,
        // noInfo: true,
        // historyApiFallback: true,
        // hot: true
        historyApiFallback: true,
        noInfo: true,
        contentBase: '../dist',
        host: '127.0.0.1',
        hot: true,
        open: true,
        inline: true
      }
     });