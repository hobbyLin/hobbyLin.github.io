/**
 * Created by Administrator on 2017/5/15.
 */

var connect = require('connect'),
    time = require('./request-time');
    server = connect.createServer();
/*
*  处理静态文件
*/
server.use('/ddd',connect.static(__dirname + '/website'));
console.log(__dirname);
console.log(process.cwd());
/*
*  监听
*/
server.listen(3000,function(){
    console.log('listen to port 3000 ')
});