/**
 * Created by Administrator on 2017/5/11.
 */
var http = require('http'),
    qs = require('querystring');
var search = process.argv.slice(2).join('').trim();
if(!search.length){
    return console.log('Usage : node getInfo <search term>');
}


http.request({
    host:'www.baidu.com',
    path:'/s?'+qs.stringify({wd : search })
},function(res){
    var body = '';
    res.setEncoding('utf8');
    res.on('data',function(chunk){
        body += chunk;
    });
    res.on('end',function(){
        var obj = body || JSON.parse(body);
        console.log(obj);
    })
}).end();