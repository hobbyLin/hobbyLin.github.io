/**
 * Created by Administrator on 2017/4/27.
 */
// var http = require('http');
// var serv = http.createServer(function(req,res){
//     res.writeHead(200,{'content-type' : 'text/html'});
//     res.end('<head>goood bye baby </head>');
// });
// serv.listen(3000);


var net = require('net');
var server = net.createServer(function(conn){
    console.log(conn);
    console.log( '\033[9m new connection! \033[39m   ')
});


server.listen(3000,function(){
    console.log(' \033[96m  server listening on *:3000 \033[39m')
})