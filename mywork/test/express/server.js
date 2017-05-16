/**
 * Created by Administrator on 2017/5/16.
 */
var express = require('express'),
     search = require('./search');
var app = express.createServer();
app.configure('production',function(){
    console.log('生产模式');
    app.enable('view cache');
});
app.configure('development',function(){
    console.log('开发模式') ;
})
/*
* 配置
*/
app.set('view engine','ejs');
app.set('view',__dirname+'/views');
app.set('view options',{layout:false});
 console.log(app.set('views'));

app.get('/',function(req,res,next){
    res.render('index');
});
app.get('/search',function(req,res,next){
    search(req.query.q , function(err,tweets){
        if(err) return next(err);
        res.render('search',{results:tweets,search:req.query.q});
    })
});
// app.put('/post/:name',function(req,res,next){
//
// })
// app.post('/signup',function(req,res,next){})
// app.del('/user/:id',function(req,res,next){})
// app.patch('/user/:id',function(req,res,next){})
// app.head('/user/:id',function(req,res,next){})

app.listen(3000,function(){
    console.log('listen to port 3000');
})