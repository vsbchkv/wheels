const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const SpriteLoaderPlugin = require('svg-sprite-loader/plugin');
const ImageminPlugin = require('imagemin-webpack-plugin').default;
const imageminMozjpeg = require('imagemin-mozjpeg');
const TerserPlugin = require('terser-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');

const PATHS = {
  src: path.join(__dirname, '/src'),
  index: path.join(__dirname, '/src/js'),
  dist: path.join(__dirname, '/dist'),
  assets: 'assets/',
  views: path.join(__dirname, '/src/views'),
  styles: 'assets/styles/',
  js: 'js/',
}

module.exports = (env, argv) => {
  const isProd = argv.mode == 'production';
    return {
    devtool: isProd ? 'eval-source-map' : 'source-map',
      externals: {
      paths: PATHS,
      publicPath: '/'
    },
    entry: {
      main: PATHS.index,
    },
    output: {
      filename: `${PATHS.js}[name].js`,
      path: PATHS.dist,
    },
    devServer: {
      contentBase: PATHS.dist,
      port: 7071,
      overlay: {
        warnings: true,
        errors: true
      }
    },
    module: {
      rules: [
        {
        test: /\.pug$/,
          loader: 'pug-loader',
        },
        {
          test: /\.js$/,
          exclude: '/node_modules/',
          loader: 'babel-loader'
        },
        {
          test: /\.(woff(2)?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
          loader: 'file-loader',
          options: {
            name: '[name].[contenthash:8].[ext]'
          }
        },
        {
          test: /\.scss$/,
          use: isProd ? [
            MiniCssExtractPlugin.loader,
            {
              loader: "css-loader", options: {
                  sourceMap: true,
                  url: true
              }
            },
            'postcss-loader',
            {
              loader: "sass-loader", options: {
                  sourceMap: true
              }
            }
          ] : [
            {
              loader: "style-loader"
            },
            {
              loader: "css-loader", options: {
                  sourceMap: true
              }
            },
            {
              loader: "sass-loader", options: {
                  sourceMap: true
              }
            }
          ]
        },
        {
          test: /\.(png|jpg|gif)$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: file => {
                  let assetsDir = path.relative(path.join(__dirname, 'src'), path.dirname(file));
                  return `${assetsDir}/[name].[ext]`;
                }
              }
            }
          ]
        },
        {
          test: /\.svg$/,
          use:[
            {
              loader: 'svg-sprite-loader',
              options: {
                extract: false,
                spriteFilename: 'sprite.svg',
                publicPath: '/assets/media/',
                runtimeCompat: true
              },
            },
            'svgo-loader'
          ]
        },

      ]
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: isProd ? '[name].[contenthash:8].min.css' : '[name][contenthash:8].css',
        sourceMap: true
      }),
      new ImageminPlugin({
        disable: !isProd,
        pngquant: ({quality: 70 - 100}),
        plugins: [
          imageminMozjpeg (
            {
              quality: 70,
              progressive: true
            }
          )
        ]
      }),
      new HtmlWebpackPlugin({
        template: `${PATHS.views}/index.pug`,
        inject: true,
        minify: isProd ? {
          collapseWhitespace: true,
          removeComments: true,
          removeRedundantAttributes: true,
          removeScriptTypeAttributes: true,
          removeStyleLinkTypeAttributes: true,
          useShortDoctype: true
        } : false,
      }),
      new SpriteLoaderPlugin({
        plainSprite: isProd,
        spriteAttrs: {
          style: 'display: none'
        }
      }),
      new CompressionPlugin(),
      new CleanWebpackPlugin()
    ],
    optimization: {
      minimizer: [
        new TerserPlugin({
          cache: true,
          parallel: true,
          sourceMap: true,
          extractComments: false,
        }),
      ],
      splitChunks: {
        name: 'vendor',
        chunks: 'all',
      }
    }
  };
}