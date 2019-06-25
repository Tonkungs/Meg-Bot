const { resolve } = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const devMode = process.env.NODE_ENV !== 'production';
const UglifyJsPlugin = require('uglifyjs-webpack-plugin'); // อัดไฟล์เข้าไป
// const { BundleAnalyzerPlugin }= require("webpack-bundle-analyzer"); // ตรวจดูขนาดไฟล์
// const CompressionPlugin = require('compression-webpack-plugin'); // บีบอัดไฟล์
// const zopfli = require('@gfx/zopfli'); // อัลกอริทึมบีบไฟล์
const MomentLocalesPlugin = require('moment-locales-webpack-plugin');// เอาเฉพาะไฟล์ภาษาที่ต้องการจาก  moment
// สอนตั้งค่า css module
module.exports = {
  entry: "./src/index.js",
  output: {
    // filename: "bundle.js",
    path: resolve(__dirname, "../dist"),
    // chunkFilename: '[chunkhash:12].js',
    filename: '[name].[hash].bundle.js',
    // ไว้บอก path เริ่มต้น
    publicPath: '/'
  },
  resolve: {
    extensions: [".js", ".jsx"],
    alias: {
      'react-dom': '@hot-loader/react-dom'
    }
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"],
            plugins: ["react-hot-loader/babel"]
          }
        }
      },

      {
        test: /\.(js|map)$/,
        exclude: /node_modules/,
        use: ["source-map-loader"],
        enforce: "pre"
      },
      // สำหรับไฟล์ .map
      // { test: /\.js\.map$/, use: "source-map-loader", enforce: "pre" },
      // อันนี้คือแบบที่เค้าใช้งานกัน
      {
        test: /\.css$/,
        exclude: /(node_modules)/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' },
        ],
      },
      // ใช้กับ element.io
      // {
      //   test: /(\.css$)/,
      //   include: /(node_modules)/,
      //   loaders: ["style-loader", "css-loader"],
      // },
      // {
      //   loader: 'postcss-loader',
      //   options: {
      //     plugins: () => [require('autoprefixer')]
      //   }
      // },
      {
        test: /\.css$/,
        exclude: [/src/],
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true,
              importLoaders: 1,
              localIdentName: "[name]_[local]_[hash:base64]",
              sourceMap: true,
              minimize:false
            }
          }
        ]
      },
      // {
      //   test: /\.(sa|sc|c)ss$/,
      //   exclude: [/node_modules/],
      //   use: [
      //     devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
      //     {
      //       loader: 'css-loader',
      //       options: {
      //         importLoaders: 1,
      //         modules: true,
      //         localIdentName: '[path]___[name]__[local]___[hash:base64:5]', // Add naming scheme
      //       }
      //     }, // d
      //     // 'postcss-loader',
      //     'sass-loader',
      //   ],
      // },
      {
        test: /\.(png|woff|woff2|eot|ttf|svg)$/,
        loader: "url-loader?limit=100000"
      }
      // {
      //   test: /\.png$/,
      //   exclude: /(node_modules)/,
      //   use: [{ loader: "file-loader" }]
      // },
      // {
      //   test: /\.(ttf|eot|svg|woff|woff2)(\?.+)?$/,
      //   loader: "file-loader?name=[hash:12].[ext]"
      // }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    // new webpack.DefinePlugin({
    //   "process.env.NODE_ENV": JSON.stringify("production")
    // }),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      inject: true,
      template: "src/index.html"
    }),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: devMode ? '[name].css' : '[name].[hash].css',
      chunkFilename: devMode ? '[id].css' : '[id].[hash].css',
    }),
    // เลือกภาษา moment
    new MomentLocalesPlugin({
      localesToKeep: ['es-us', 'th'],
    }),
    // บีบไฟล์
    // new CompressionPlugin({
    //   algorithm: 'gzip'
    // }),
    // new CompressionPlugin({
    //   compressionOptions: {
    //      numiterations: 15
    //   },
    //   algorithm(input, compressionOptions, callback) {
    //     return zopfli.gzip(input, compressionOptions, callback);
    //   }
    // }),
    // ให้ดูที่อยู่ของ code ที่แท้จริงได้
    new webpack.SourceMapDevToolPlugin({}),
    // วิเคราะห์ขนาดไฟล์
    // new BundleAnalyzerPlugin()
  ],
  //   devServer: {
  //     // ให้เว็บเรียก url ตรงๆ ได้
  //     // host: '0.0.0.0',
  //     // port: 8080,
  //     // noInfo: true,
  //     // historyApiFallback: true,
  //     // hot: true
  //     historyApiFallback: true,
  //     noInfo: true,
  //     contentBase: './dist',
  //     host: '127.0.0.1',
  //     hot: true,
  //     open: true,
  //     inline: true
  //   },
  //   devtool: false,
  optimization: {
    minimizer: [new UglifyJsPlugin({
      parallel: true,  // บิวทีละหลายอัน
      extractComments: true // เอาคอมเม้นอออก
    })]
  }
}
