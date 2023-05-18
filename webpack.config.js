const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = (env) => ({
    devtool: env.production ? "source-map" : "eval-source-map",
    mode: env.production ? 'production' : 'development',
    mode: 'development',
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name]-[hash].js',
        clean: true,
        assetModuleFilename: 'asset/[hash][ext]',
        environment: {
            // The environment supports arrow functions ('() => { ... }').
            arrowFunction: false,
      },
    },
    devServer: {
        static: {
        directory: path.join(__dirname, 'src'),
        },
        compress: true,
        port: 8080,
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'src', 'index.html')
        }),
        new MiniCssExtractPlugin({
            filename: '[name]-[hash].css',
        }),
    ],
    module: {
        rules: [
            // Babel
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                  loader: 'babel-loader',
                  options: {
                    presets: [
                      ['@babel/preset-env', { targets: "defaults" }]
                    ]
                  }
                }
              },
            // HTML plugin
            {
                test: /\.html$/i,
                loader: "html-loader",
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                  MiniCssExtractPlugin.loader,
                  "css-loader",
                  {
                    loader: "postcss-loader",
                    options: {
                      postcssOptions: {
                        plugins: [
                          [
                            "postcss-preset-env",
                            {
                                options:{
                                    postcssOptions: {
                                        plugins: [require('postcss-preset-env')]
                                    }
                                }
                            },
                          ],
                        ],
                      },
                    },
                  },
                  "sass-loader",
                ],
            },
            // Download less sze image
            {
                test: /\.(jpe?g|png|webp|gif|svg)$/i,
                use: [
                  {
                    loader: 'image-webpack-loader',
                    options: {
                      mozjpeg: {
                        progressive: true,
                      },
                      // optipng.enabled: false will disable optipng
                      optipng: {
                        enabled: false,
                      },
                      pngquant: {
                        quality: [0.65, 0.90],
                        speed: 4
                      },
                      gifsicle: {
                        interlaced: false,
                      },
                      // the webp option will enable WEBP
                      webp: {
                        quality: 75
                      }
                    }
                  }
                ],
                type: 'asset/resource'
              },
              {
                test: /\.woff2?$/i,
                type: 'asset/resource',
                generator: {
                  filename: 'fonts/[name][ext]'
                }
              },
        ],
    },

});