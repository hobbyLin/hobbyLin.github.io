const path = require('path')
const express = require('express')
const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')
const WebpackConfig = require('./build/webpack.dev.js')

const app = express(),
     mount = express();
const compiler = webpack(WebpackConfig)

const env = process.env.NODE_ENV || 'dev';
const publicPath = {
    'dev':'',
    // 'dev':'http://localhost:'+port+'/',
    'stg':'',
    'prd':''
};
app.use(webpackDevMiddleware(compiler, {
  publicPath:'',
  noInfo: true,
  stats: {
    colors: true,
    chunks: false
  }
}))

//app.use(webpackHotMiddleware(compiler))

let hotMiddleware = webpackHotMiddleware(compiler)
app.use(hotMiddleware)
compiler.plugin('compilation', function (compilation) {
  compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
    hotMiddleware.publish({ action: 'reload' })
    cb()
  })
})

// app.use(express.static(__dirname))
app.use(express.static(path.resolve(__dirname, "./"), {
	maxAge: 365 * 24 * 60 * 60
}));

mount.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
});

//与测试和native浏览地址保持一致
mount.use('/robo-ad/online_risk/', app);

// mock 数据
mount.use('/',require('./mockdata/handler.js'))

const port = process.env.PORT || 9998
module.exports = mount.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}, Ctrl+C to stop`)
})
