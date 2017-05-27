const os = require('os')
const fs = require('fs')
const path = require('path')
const webpack = require('webpack')
const HappyPack = require('happypack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanPlugin = require('clean-webpack-plugin');
const HashedModuleIdsPlugin = require('./HashedModuleIdsPlugin');

var cssnano = require('cssnano');

const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length });

var env = process.env.NODE_ENV || process.argv[2] || 'dev';
env = env.replace(/--/g,'');
var client = process.argv[3] || 'web';
client = client.replace(/--/g,'');
console.log(process.env.NODE_ENV + ' | ' + process.argv[2] + ' | '+env + ' '+process.argv[3])

var common = [
    'webpack-hot-middleware/client?path=/robo-ad/online_risk/__webpack_hmr',
    //'babel-polyfill',
    'vue',
    //'vuex',
    'flexible',
    'fastclick',
    'authsdk',
    'authinit',
    //'aladdin',
    //'bow',
    //'ZDPAEBank',
];
const baseDir = '../src/container'
var entries = {
    'common':common,
    // 'app': ['webpack-hot-middleware/client?path=/robo-ad/aum_zntg/__webpack_hmr', '../src/app.js']
};
var chunks = [];
var entry = fs.readdirSync(path.join(__dirname, baseDir)).reduce((entries, dir) => {
    const fullDir = path.join(__dirname, baseDir + '/' + dir);
    console.log(dir) // finance
    // console.log(fullDir)
    const entry = path.join(fullDir, 'index.js')
    if (fs.statSync(fullDir).isDirectory() && fs.existsSync(entry)) {
        entries[dir] = ['webpack-hot-middleware/client?path=/robo-ad/online_risk/__webpack_hmr', entry]
        chunks.push(dir);
    }
    return entries;
}, {});
// console.log(entry);
var happyLoader = [
    new HappyPack({
        id: 'js',
        tempDir: '.happypackDev/',
        loaders: [ 'babel' ],
        threadPool: happyThreadPool,
        cache: true,
        verbose: true
    })
]

var plugins = [
    new CopyWebpackPlugin([
        { from: 'src/assets/lib/runtime-check.js', to: 'assets/js' },
        { from: 'src/assets/lib/aladdin.ibank.web.min.js', to: 'assets/js' },
        { from: 'src/assets/lib/aladdin.ibank.min.js', to: 'assets/js' },
        { from: 'src/container/rym.html', to: '' },
        { from: 'src/container/middle.html', to: '' },
    ]),
    new HashedModuleIdsPlugin(),
    new ExtractTextPlugin('assets/css/theme/default/style.css?[contenthash:8]', {
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
        chunks: ['common'],
        minChunks: Infinity
    }),
    new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify('development'),
        'ENV': JSON.stringify(process.env.NODE_ENV || 'dev')
    }),

    new webpack.ProvidePlugin({
        aladdin: "aladdin",
        //bow: "bow"
    })
];

// plugins.push(new HtmlWebpackPlugin({
//     filename: 'demo.html',
//     template: '../src/index.html',
//     chunks: [
//         'manifest', 'common', 'app'
//     ],
//     chunksSortMode: 'dependency',
//     env: 'dev'
//     // favicon: path.join(__dirname, 'assets', 'images', 'favicon.ico'),
// }))
chunks.forEach(function(name) {
    if (name !== 'app') {
        plugins.push(new HtmlWebpackPlugin({
            filename: (name=='finance'?'index':name) + '.html',
            template: path.join(__dirname, baseDir + '/' + name) + '/index.html',
            chunks: [
                'manifest', 'common', name
            ],
            chunksSortMode: 'dependency',
            env: env
            // favicon: path.join(__dirname, 'assets', 'images', 'favicon.ico'),
        }))
    }
})

module.exports = {

    devtool: '#eval-source-map',
    // entry:{
    //   app:['webpack-hot-middleware/client?path=/omm/mobile/__webpack_hmr','../src/app.js']
    // },
    entry: Object.assign({}, entries, entry),

    output: {
        path: path.join(__dirname, ''),
        filename: 'assets/js/[name].js',
        chunkFilename: 'assets/js/[name].chunk.js',
        publicPath: ''
    },

    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'happypack/loader?id=js'
            }, {
                test: /\.vue$/,
                loader: 'vue'
            }, {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract("style", 'css!postcss')
            }, {
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
            }
            // , {
            //     test: /\.svg(\?.*)?$/,
            //     loader: 'url?prefix=fonts/&name=assets/fonts/[name].[ext]&limit=10000&mimetype=image/svg+xml'
            // }
            , {
                test: /.*\.(gif|png|jpe?g|svg)$/i,
                loader: 'url?context=client&name=assets/images/[name].[ext]?[hash:8]&limit=1&publicPath=/robo-ad/online_risk/&outputPath=assets/images/'
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
            includePaths: [path.resolve(__dirname, "../src")]
        },
    resolve: {
        extensions: ['', '.js','.vue','.css','.scss'],
        alias: {
            'flexible': path.resolve(__dirname, '../src/assets/lib/flexible.js'),
            'fastclick': path.resolve(__dirname, '../src/assets/lib/fastclick.js'),
            'authsdk': path.resolve(__dirname, '../src/assets/lib/auth-sdk.wuat2.js'),
            'authinit': path.resolve(__dirname, '../src/assets/lib/authinit.js'),
        }
    },

    externals: {
        aladdin: "aladdin",
    },

    plugins: plugins.concat([
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin()
    ], happyLoader)

}
