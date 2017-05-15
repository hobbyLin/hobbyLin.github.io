/**
 * Created by Administrator on 2017/5/12.
 */
/*
* 模块依赖
*/

var http = require('http'),
    fs = require('fs');
/*
*  创建服务器
*/
var server = http.createServer(function(req,res){
    if(req.method == "GET" && req.url.substr(0,7) =='/images' && req.url.substr(-4) == '.jpg' ){
        //
        fs.stat(__dirname + req.url,function(err,stat){
            if(err || !stat.isFile()){
                res.writeHead(400);
                res.end('Not Found');
            }
            serve(__dirname + req.url, "application/jpg")
        })
    }else if(req.method == "GET" && '/' == req.url){
        //
        serve(__dirname + '/index.html' , 'text/html');
    }else{
        res.writeHead(404);
        res.end("Not Found");
    }
    function serve(path,type){
        res.writeHead(200, {"Content-type": type});
        fs.createReadStream(path).pipe(res);
    }

});

/*
*  监听
*/
server.listen(3000);