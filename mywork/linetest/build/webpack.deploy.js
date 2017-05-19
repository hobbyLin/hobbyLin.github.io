const fs = require('fs')
const path = require('path')
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanPlugin = require('clean-webpack-plugin');
const HashedModuleIdsPlugin = require('./HashedModuleIdsPlugin');
const ZipPlugin = require('./ZipWebpackPlugin');
const moment = require('moment');
var cssnano = require('cssnano');

const build_time = moment().format('YYYYMMDDHHmmSS');

var env = process.env.NODE_ENV || process.argv[2] || 'prd';
env = env.replace(/--/g, '');
var client = process.argv[3] || 'web';
client = client.replace(/--/g, '');
console.log(process.env.NODE_ENV + ' | ' + process.argv[2] + ' | ' + env + ' ' + process.argv[3])

const publicPath = {
    'dev': '',
    'stg': '', // bank-static-stg.pingan.com.cn:8040/omm/mobile
    'prd': '' // bank-static.pingan.com.cn/omm/mobile
};

var common = [
    'vue',
    'flexible',
    'fastclick',
    'authsdk',
    'authinit',
];
const baseDir = '../src/container'
var entries = {
    'common': common
    // 'app': './src/app.js'
};
var chunks = [];
var entry = fs.readdirSync(path.join(__dirname, baseDir)).reduce((entries, dir) => {
    const fullDir = path.join(__dirname, baseDir + '/' + dir)
    // console.log(dir) // finance
    // console.log(fullDir)
    const entry = path.join(fullDir, 'index.js');
    
    if (fs.statSync(fullDir).isDirectory() && fs.existsSync(entry)) {

        //native只打包首页
        if(client == 'native'){
            if(dir == 'finance'){
                entries.finance = entry;
                chunks.push(dir);
            }
        }else{
            entries[dir] = entry;
            chunks.push(dir);
        }



    }
    return entries
}, {});
// console.log(entry);

var plugins = [
    new CopyWebpackPlugin([
        { from: 'src/assets/lib/runtime-check.js', to: 'assets/js' },
        { from: 'src/assets/lib/aladdin.ibank.web.min.js', to: 'assets/js' },
        { from: 'src/assets/lib/aladdin.ibank.min.js', to: 'assets/js' },
    ]),
    new HashedModuleIdsPlugin(),
    new ExtractTextPlugin('assets/css/style.css?[contenthash:8]', {
        disable: false,
        allChunks: false
    }),
    new webpack.optimize.CommonsChunkPlugin({
        name: 'common',
        minChunks: Infinity
        // children: true,
        // chunks: chunks,
        // minChunks: chunks.length // 提取所有entry共同依赖的模块
    }),
    new webpack.optimize.CommonsChunkPlugin({
        name: 'manifest',
        chunks: ['common']
    }),
    new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify('production'),
        'ENV': JSON.stringify(process.env.NODE_ENV || 'dev')
    }),
    new webpack.optimize.UglifyJsPlugin({
        compress: { warnings: false }
    }),
    new webpack.ProvidePlugin({
        aladdin: "aladdin",
        //bow: "bow"
    })
];

chunks.forEach(function (name) {
    if (name !== 'app') {
        // console.log(name,name=='finance',typeof(name))
        plugins.push(new HtmlWebpackPlugin({
            filename: (name == 'finance' ? 'index' : name) + '.html',
            template: path.join(__dirname, baseDir + '/' + name) + '/index.html',
            chunksSortMode: 'dependency',
            chunks: [
                'manifest',
                'common',
                name
            ],
            env: env
            // favicon: path.join(__dirname, 'assets', 'images', 'favicon.ico'),
        }))
    }
})

const imgloader = client == 'native' ? 'file?context=client&name=assets/images/[name].[ext]&publicPath=../../&outputPath=assets/images/' : 'url?context=client&name=assets/images/[name].[ext]?[hash:8]&limit=1&publicPath=/robo-ad/online_risk/&outputPath=assets/images/'

module.exports = {

    devtool: env == 'prd' ? '': 'cheap-source-map',
    entry: Object.assign({}, entries, entry),

    output: {
        path: path.join(__dirname, '../dist/' + env + '/robo-ad/online_risk'),
        filename: 'assets/js/[name].js?[chunkhash:8]',
        chunkFilename: 'assets/js/[id].chunk.js?[chunkhash:8]',
        publicPath: ''
    },

    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel'
            }, {
                test: /\.vue$/,
                loader: 'vue'
            }
            , {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract("style", "css!postcss")
            }
            , {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract("css!postcss!sass")
            }, {
                test: /\.woff(\?.*)?$/,
                loader: 'url?prefix=fonts/&name=assets/fonts/[name].[ext]&limit=10000&mimetype=application/font-woff'
            }, {
                test: /\.woff2(\?.*)?$/,
                loader: 'url?prefix=fonts/&name=assets/fonts/[name].[ext]&limit=10000&mimetype=application/font-woff2'
            }, {
                test: /\.otf(\?.*)?$/,
                loader: 'file?prefix=fonts/&name=assets/fonts/[name].[ext]&limit=10000&mimetype=font/opentype'
            }, {
                test: /\.ttf(\?.*)?$/,
                loader: 'url?prefix=fonts/&name=assets/fonts/[name].[ext]&limit=10000&mimetype=application/octet-stream'
            }, {
                test: /\.eot(\?.*)?$/,
                loader: 'file?prefix=fonts/&name=assets/fonts/[name].[ext]'
            },
            {
                test: /.*\.(gif|png|jpe?g|svg)$/i,
                loader: imgloader
                // loader: 'url?context=client&name=assets/images/[name].[ext]?[hash]&limit=8192'
            }
        ]
    },
    postcss: [
        cssnano({
            autoprefixer: {
                add: true,
                remove: true,
                browsers: ['> 0%']
            },
            discardComments: {
                removeAll: true
            },
            discardUnused: false,
            mergeIdents: false,
            reduceIdents: false,
            safe: true,
            sourcemap: true
        })
    ],
    sassLoader: {
            includePaths: [path.resolve(__dirname, "./src")]
        },
    resolve: {
        extensions: ['', '.js','.vue','.css','.scss'],
        alias: {
            'flexible': path.resolve(__dirname, '../src/assets/lib/flexible.js'),
            'fastclick': path.resolve(__dirname, '../src/assets/lib/fastclick.js'),
            'authsdk': path.resolve(__dirname, env == 'prd' ? '../src/assets/lib/auth-sdk.js' : '../src/assets/lib/auth-sdk.wuat2.js'),
            'authinit': path.resolve(__dirname, '../src/assets/lib/authinit.js'),
        }
    },

    plugins: plugins.concat([
        new CleanPlugin([env], {
            root: path.join(__dirname, '../dist/')
        }),
        new webpack.optimize.OccurenceOrderPlugin(),
        // new webpack.HotModuleReplacementPlugin(),
        new ZipPlugin({
            path:path.join(__dirname,'../dist/' + env),
            pathPrefix: 'robo-ad/online_risk',
            filename: `online-risk-${env}-web-${build_time}`
        }),
        new webpack.NoErrorsPlugin()
    ]),

    externals: {
        aladdin: "aladdin"
    }

}
