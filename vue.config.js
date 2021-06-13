const path = require('path')
function resolve(dir) {
  return path.join(__dirname, dir)
}

const IS_PROD = ['production', 'prod'].includes(process.env.NODE_ENV)
const VERSION = require('./package.json').version
const SERVER_PATH = process.env.SERVER_PATH

const BASE_PATH = process.env.VUE_APP_BASE_PATH

const TITLE = process.env.VUE_APP_TITLE

const GenerateAssetPlugin = require('generate-asset-webpack-plugin') // 打包后生成独立文件
// 压缩
const CompressionWebpackPlugin = require('compression-webpack-plugin')
const productionGzipExtensions = ['js', 'css']

console.info(`当前版本：${VERSION}`)
console.info(`当前服务器地址：${SERVER_PATH}`)
console.log(`当前NODE_ENV：${process.env.NODE_ENV}`)
module.exports = {
  publicPath: './',
  outputDir: 'dist',
  assetsDir: 'assets',
  indexPath: 'index.html',
  productionSourceMap: IS_PROD ? false : true,
  filenameHashing: true, //文件Hash值
  lintOnSave: true,
  devServer: {
    port: 8080,
    open: true,
    proxy: IS_PROD
      ? {}
      : {
          // 服务端
          [BASE_PATH]: {
            target: SERVER_PATH,
            changeOrigin: true,
            pathRewrite: {
              ['^' + BASE_PATH]: '',
            },
          },
        },
  },
  configureWebpack: (config) => {
    config.plugins.push(
      new GenerateAssetPlugin({
        filename: 'VERSION',
        fn: (compilation, cb) => {
          cb(null, VERSION)
        },
      })
    )
    config.plugins.push(
      new GenerateAssetPlugin({
        filename: 'SERVER_PATH',
        fn: (compilation, cb) => {
          cb(null, SERVER_PATH)
        },
      })
    )
    config.plugins.push(
      new CompressionWebpackPlugin({
        // filename: '[path].gz[query]', // 目标资源名称。
        algorithm: 'gzip', // 可以是 function(buf, callback) 或者字符串。对于字符串来说依照 zlib 的算法(或者 zopfli 的算法)。默认值是 "gzip"。
        test: new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$'), // 所有匹配该正则的资源都会被处理。默认值是全部资源。
        threshold: 1024, // 只有大小大于该值的资源会被处理。单位是 bytes。默认值是 0
        minRatio: 0.8, // 只有压缩率小于这个值的资源才会被处理。默认值是 0.8。
        deleteOriginalAssets: false, // 是否删除源文件
      })
    )
  },
  chainWebpack: (config) => {
    config.resolve.alias.set('@', resolve('src'))
    config.plugin('html').tap((args) => {
      args[0].title = TITLE
      return args
    })
  },
  css: {
    loaderOptions: {
      less: {
        lessOptions: {
          modifyVars: { 'primary-color': '#2860fa' },
          javascriptEnabled: true,
        },
        additionalData: ` @import "@/theme/theme.less"; `,
      },
      postcss: {
        plugins: [
          require('autoprefixer')({
            overrideBrowserslist: ['last 20 versions'],
          }),
        ],
      },
    },
  },
}
