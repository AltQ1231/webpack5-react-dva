const path = require("path");
const WebpackBar = require("webpackbar");
const htmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  mode: "production", // 生产环境模式
  entry: "./src/index.js",
  resolve: {
    extensions: [".ts", ".tsx", ".json", ".js", ".jsx"],
  },
  output: {
    path: path.resolve(__dirname, "../dist"),
    filename: "[name].[contenthash:8].js",
    publicPath: "/",
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: ["file-loader"],
      },
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: "ts-loader",
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        options: {
          presets: ["@babel/react"],
        },
      },
      {
        test: /\.less$/,
        use: [
          {
            loader: "style-loader",
          },
          {
            loader: "css-loader",
          },
          {
            loader: "less-loader",
            options: {
              sourceMap: true,
              lessOptions: {
                javascriptEnabled: true,
              },
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new WebpackBar(),
    new CleanWebpackPlugin(),
    new htmlWebpackPlugin({
      title: "prod 生产环境",
      template: path.resolve(__dirname, "../public/index.html"),
    }),
  ],
  performance: {
    hints: "warning", // 抛出提示信息类型
    maxAssetSize: 30000000, // 入口起点的最大体积
    maxEntrypointSize: 50000000, // 生成文件的最大体积
    assetFilter: function (assetFilename) {
      // 只给出 js、css 文件的性能提示
      return assetFilename.endsWith(".css") || assetFilename.endsWith(".js") || assetFilename.endsWith(".jsx");
    },
  },
};
