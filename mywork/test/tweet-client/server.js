/**
 * Created by Administrator on 2017/5/11.
 */

var http = require('http'),
qs = require('querystring');

http.createServer(function(req,res){
    var body = "";
    req.on('data',function(chunk){
        body += chunk;
    });
    req.on('end',function(){
        res.writeHead(200);
        res.end('done');
        console.log('\r\n got name::'+qs.parse(body).name +"")
    });

}).listen(3000,function(){
    console.log('liseten to port 3000');
})