var express = require('express');
var router = express.Router();
var fs = require('fs');
var path = require('path');

var config = require('./config.js')();
var routers = [];

var errjson = {"responseCode":"901001","responseMsg":"服务器出错了"};

function configRouter(filename, method, fullpath, readpath){
    router.all(fullpath,function(req,res){
        // read file api/filename
        var file = fs.readFile(readpath,'utf8',function(err,data){
            if(err) {
                // throw err;
                res.status(500).json(errjson)
            }
            obj = JSON.parse(data);
            // console.log('read',obj);
            res.status(200).json(obj)
        });
        // send filecontent
    });
}

for(var i=0;i<config.length;i++){
    var obj;
    var filename = config[i]['name'];
    var method = config[i]['method'] || 'get';
    //var method = 'get';
    //var fullpath = config[i]['path']+"/"+filename+".do";
    var fullpath = config[i]['path'];
    var readpath = path.join(__dirname,'./api/'+filename+'.json');
    // console.log(fullpath)
    configRouter(filename, method, fullpath, readpath)
}


module.exports = router;
