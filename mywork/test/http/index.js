/**
 * Created by Administrator on 2017/5/9.
 */
var fs = require('fs');
require('http').createServer(function(req,res){
    res.writeHead(200,{'Content-Type':'image/jpg'});
    // res.write('goodgoodstudy');
    // setTimeout(function(){
    //     res.end('hellow <b> world </b>');
    // },5000)
    var stream =fs.createReadStream('img.jpg');
    stream.on('data',function(data){
        res.write(data);
    });
    stream.on('end',function(){
        res.end();
    })


}).listen(3000,function(){
    console.log('listen 3000')
});
