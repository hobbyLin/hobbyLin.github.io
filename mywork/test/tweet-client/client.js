/**
 * Created by Administrator on 2017/5/11.
 */

var http = require('http'),
    qs = require('querystring');


function send(theName){
    http.request({
        host:"127.0.0.1",
        port:3000,
        url:'/',
        method:"POST"
    },function(res){
        var body = '';
        res.setEncoding('utf8');
        // res.on('data',function(chunk){
        //     body += chunk;
        // });
        res.on('end',function(){
            console.log('\r\n  request complete!!');
            process.stdout.write('\r\n your name: ')
        })
    }).end(qs.stringify({name : theName}));
}
process.stdout.write('\r\n your name:');
process.stdin.resume();
process.stdin.setEncoding('utf8');
process.stdin.on('data',function(name){
    send(name.replace("\r\n",''));
})