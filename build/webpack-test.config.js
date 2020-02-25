/**
 * webpack test configuration
 */
// externalizing dependencies to improve test boot up speed
const nodeExternals = require("webpack-node-externals");
const { VueLoaderPlugin } = require("vue-loader");
const { DEV_PORT, resolvePathDir } = require("./helpers");

module.exports = {
  resolve: {
    extensions: [".vue", ".js", ".json"],
    alias: {
      styles: resolvePathDir("src/assets/styles/"),
      "@/components": resolvePathDir("src/components/"),
      '@/utils': resolvePathDir('src/utils/'),
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: resolvePathDir("node_modules"),
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: [
                [
                  "@babel/preset-env",
                  {
                    useBuiltIns: "usage",
                    corejs: 3,
                    targets: {
                      firefox: "64"
                    }
                  }
                ]
              ]
            }
          }
        ]
      },
      {
        test: /\.vue$/,
        loader: "vue-loader"
      },
      {
        test: /\.scss$/,
        use: ["vue-style-loader", "css-loader", "sass-loader"]
      }
    ]
  },
  devtool: "inline-cheap-module-source-map",
  externals: [nodeExternals()],
  plugins: [new VueLoaderPlugin()]
};
