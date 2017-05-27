const path = require('path')
const utils = require('./utils')
const webpack = require('webpack')
const config = require('../config')
const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.conf')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')
const shellJs = require('shelljs')
const moment = require('moment')
const CleanPlugin = require('clean-webpack-plugin');

const build_time = moment().format('YYYYMMDDHHmmSS')

const NODE_ENV = process.argv[2] || 'production'

// const env = config.prd.env

//各个build测试环境和生产环境的参数
const sourceMap = NODE_ENV === 'production'? config.prd.productionSourceMap: config.stg.stagingSourceMap
const assetsRoot = NODE_ENV === 'production'? config.prd.assetsRoot: config.stg.assetsRoot
const assetsSubDirectory = NODE_ENV === 'production'? config.prd.assetsSubDirectory: config.stg.assetsSubDirectory
const index = NODE_ENV === 'production'? config.prd.index: config.stg.index
const useGzip = NODE_ENV === 'production'? config.prd.productionGzip: config.stg.stagingGzip
const useGzipExtensions = NODE_ENV === 'production'? config.prd.productionGzipExtensions: config.stg.stagingGzipExtensions
const bundleAnalyzerReport = NODE_ENV === 'production'? config.prd.bundleAnalyzerReport: config.stg.bundleAnalyzerReport

const nowEnv = NODE_ENV === 'production'? 'prd' : 'stg'

let webpackConfig = merge(baseWebpackConfig, {
    module: {
        rules: utils.styleLoaders({
            sourceMap: sourceMap,
            extract: true
        })
    },
    devtool: sourceMap ? '#source-map' : false,
    output: {
        path: assetsRoot,
        filename: utils.assetsPath('js/[name].[chunkhash].js'),
        chunkFilename: utils.assetsPath('js/[id].[chunkhash].js')
    },
    plugins: [
        //清理上次构建的文件
        new CleanPlugin([nowEnv], {
            root: path.join(__dirname, '../dist/')
        }),
        // http://vuejs.github.io/vue-loader/en/workflow/production.html
        new webpack.DefinePlugin({
            // 'process.env': env,
            'ENV': JSON.stringify(process.env.NODE_ENV || 'staging')
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            },
            sourceMap: true
        }),
        // extract css into its own file
        new ExtractTextPlugin({
            filename: utils.assetsPath('css/[name].[contenthash].css')
        }),
        // Compress extracted CSS. We are using this plugin so that possible
        // duplicated CSS from different components can be deduped.
        new OptimizeCSSPlugin({
            cssProcessorOptions: {
                safe: true
            }
        }),
        // generate dist index.html with correct asset hash for caching.
        // you can customize output by editing /index.html
        // see https://github.com/ampedandwired/html-webpack-plugin
        new HtmlWebpackPlugin({
            filename: index,
            template: 'index.html',
            inject: true,
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeAttributeQuotes: true
                    // more options:
                    // https://github.com/kangax/html-minifier#options-quick-reference
            },
            // necessary to consistently work with multiple chunks via CommonsChunkPlugin
            chunksSortMode: 'dependency'
        }),
        // split vendor js into its own file
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            minChunks: function(module, count) {
                // any required modules inside node_modules are extracted to vendor
                return (
                    module.resource &&
                    /\.js$/.test(module.resource) &&
                    module.resource.indexOf(
                        path.join(__dirname, '../node_modules')
                    ) === 0
                )
            }
        }),
        // extract webpack runtime and module manifest to its own file in order to
        // prevent vendor hash from being updated whenever app bundle is updated
        new webpack.optimize.CommonsChunkPlugin({
            name: 'manifest',
            chunks: ['vendor']
        }),
        // copy custom static assets
        new CopyWebpackPlugin([{
            from: path.resolve(__dirname, '../static'),
            to: assetsSubDirectory,
            ignore: ['.*']
        }]),
        //shelljs打gz包
        function () {
            this.plugin('done', function (stats) {
                if (stats.compilation.errors && stats.compilation.errors.length) {
                    console.log(stats.compilation.errors)
                    process.exit(1)
                }
                let zipFileName = `online_risk_admin_${build_time}.tar.gz`
                shellJs.cd(`dist/${nowEnv}`)
                shellJs.exec(`tar -zvcf  ./${zipFileName} ./online_risk_admin`)
                shellJs.cd('..')
                shellJs.cd('..')
            })
        }
    ]
})

//gzip压缩js和css，不使用
if (useGzip) {
    const CompressionWebpackPlugin = require('compression-webpack-plugin')

    webpackConfig.plugins.push(
        new CompressionWebpackPlugin({
            asset: '[path].gz[query]',
            algorithm: 'gzip',
            test: new RegExp(
                '\\.(' +
                useGzipExtensions.join('|') +
                ')$'
            ),
            threshold: 10240,
            minRatio: 0.8
        })
    )
}

if (bundleAnalyzerReport) {
    var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
    webpackConfig.plugins.push(new BundleAnalyzerPlugin())
}

module.exports = webpackConfig
