/**
 * Created by Administrator on 2017/5/9.
 */
var http = require('http');
var qs = require('querystring');

http.createServer(function(req,res){
    console.log(req.url);
    if('/' == req.url){
        res.writeHead(200,{"Content-Type":'text/html'});

        res.end([
            '<form method="POST" action="/url">',
            '<h1>My form</h1>',
            '<fieldset>',
            '<label>Personal information</label>',
            '<p>what is your name ?</p>',
            '<input type="text" name="name">',
            '<p> <button>Submit</button> </p>',
            '</form>'
        ].join(''));
    }else if('/url' == req.url && "POST" == req.method){


        var body = '';
        req.on('data',function(chunk){
            body+=chunk;
        });
        req.on('end',function(){
            res.writeHead(200,{"Content-Type":'text/html'});
            res.end('<p>Content-Type:'+req.headers['content-type']+'</p>' + '<p>Data:</p><pre>'+qs.parse(body).name + '</pre>');
        })


    }else{
        res.writeHead(404);
        res.end('Not Found');
    }



}).listen(3000);