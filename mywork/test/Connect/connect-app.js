/**
 * Created by Administrator on 2017/5/15.
 */

var connect = require('connect'),
    time = require('./request-time');
server = connect.createServer();
/*
 *  纪录请求情况
 */
server.use(connect.logger('dev'));
/*
 *  实现中间件
 */
server.use(time({time:500}));
/*
*  挂载测试
*/
server.use('/aa',connect.static(__dirname+'/website'));
/*
*
* 使用logger
*/
server.use(connect.logger('dev'));

/*
*  快速响应
*/
server.use(function(req,res,next){
    console.log(req.query);
    if('/a' == req.url){
        res.writeHead(200);
        res.end("fast");
    }else{
        next();
    }
});
/*
* 慢速响应
*/
server.use(function(req,res,next){
    if('/b' == req.url){
        setTimeout(function(){
            res.writeHead(200);
            res.end('slow')
        },1000)
    }else{
        next();
    }
})


server.listen(3000,function(){
    console.log('listen to port 3000 ')
});