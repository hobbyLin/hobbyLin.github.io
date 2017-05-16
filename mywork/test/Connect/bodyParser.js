/**
 * Created by Administrator on 2017/5/15.
 */
var connect = require('connect'),
    users = require('./user')
//console.log(connect.bodyParser)
console.log(users);
var server = connect()
    .use(connect.logger('dev'))
    .use(connect.bodyParser())
    .use(connect.cookieParser())
    .use(connect.session({secret : 'my app secret'}))
    .use(function(req,res,next){
        // if('POST' == req.method){
        //     console.log('-------------body----------');
        //     console.log(req.body);
        //     console.log('-------------files------------');
        //     console.log(req.files);
        // }else{
        //     next();
        // }"

        if('/' == req.url && req.session.logged_in ){
            console.log('dd');
            res.writeHead(200,{'Content-Type' : 'text/html' });
            res.end(
                '你已经登录咯，宝宝！'+ req.session.name+
                    '<a href = "/logout"> logout</a>'
            )
        }else{
            console.log(req.url)
            console.log(req.method)
            next();
        }

    })
    .use(function(req,res,next){

        if('/' == req.url && 'GET' == req.method){
            res.writeHead(200,{'Content-Type' : 'text/html'});
            res.end([
                '<form action = "/login" method="POST">',
                '<fieldset>',
                '<legend>Please log in </legend>',
                '<p>User: <input type="text" name = "user"/> </p>',
                '<p>PassWord: <input type="password" name = "password"> </p>',
                '<button>Submit </button>',
                '</form>'
            ].join(''));
        }else{
            next();
        }
    })
    .use(function(req,res,next){

        if('/login' == req.url && "POST" == req.method){
            res.writeHead(200);
            console.log(req.body);
            if(!users[req.body.user] || req.body.password != users[req.body.user].password){
                res.end('Bad username/password');
            }else{
                req.session.logged_in = true;
                req.session.name = users[req.body.user].name;
                res.end('Authenticated!');
            }
        }else{
            next();
        }
    })
    .use(function(req,res,next){
        console.log('4')
        if('/logout' == req.url){
            req.session.logged_in = false;
            res.writeHead(200);
            res.end('Logged out');
        }else{
            next();
        }
    });

server.listen(3000,function(){
    console.log('listen to port 3000');
})