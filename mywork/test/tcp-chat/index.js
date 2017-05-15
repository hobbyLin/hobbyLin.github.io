/**
 * Created by Administrator on 2017/5/5.
 */
/*
* 模块依赖
*/
var net = require('net');
/*
* 追踪连接数
*/
var count = 0,
    users = {},
    testO = {};
/*
* 创建服务器
*/
var server = net.createServer(function(conn){
    console.log('\033[90m  new connection \033[39m');
    conn.write(
        '\r\n > welcome to node-chat!' +'\r\n  >'+count+ '  other people are connected at this time.' +'\r\n  >please write your name and press enter:'
    );
    conn.setEncoding('utf8');
    var nickname ,
        data ='',
        finalResult;

    testO[count] = count;
    function broadCast(msg,exceptMyself){
        for(var i in users){
            if(!exceptMyself || i != nickname){
                users[i].write(msg);
            }
        }
    }


    conn.on('data',function(chunk){
        data += chunk;
        var result = /(.)+\r\n$/.exec(data);
        //console.log(data.charCodeAt(data.length - 1));
        // if(data.charCodeAt(data.length - 1) == '10'){
        //     console.log(data.slice(0,data.length - 1));
        // }
        //     data = '';

        if(result){
            console.log(result);
            finalResult = result[0].replace('\r\n','');
            if(finalResult === nickname){
                conn.write('the name has been used!')
            }
            if(!nickname){
                if(users[finalResult]){
                    conn.write('\033[93m \r\n  > nickname already in use ,try again : \033[39m ');
                }else{
                    nickname = finalResult;
                    users[nickname] = conn ;
                    // console.log(users);
                    // for(var i in users){
                    //     users[i].write('\033[90m \r\n  > ' + nickname + '  joined the room \033[39m \r\n')
                    // }
                    broadCast('\033[90m \r\n  > ' + nickname + '  joined the room \033[39m \r\n')


                }
            }else{
                // for(var i in users){
                //     if(i != nickname){
                //         users[i].write(' \033[96m \r\n  > '+nickname+': \033[39m' +finalResult+'\r\n');
                //     }
                // }
                broadCast(' \033[96m \r\n  > '+nickname+': \033[39m' +finalResult+'\r\n')
            }
        }

    })
    conn.on('end',function(){
        console.log(users);
    })
    conn.on('close',function(){
        count--;
        delete users[nickname]
        broadCast(' \033[96m \r\n  > '+nickname+' left the room \r\n');
    })
    count++;
});
/*
* 监听
*/
server.listen(3000,function(){
    console.log(' \033[96m server listening on *: 3000 \033[39m');
})