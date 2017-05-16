/**
 * Created by Administrator on 2017/5/16.
 */
var request = require('superagent'),
    fs = require('fs');
/*
* search function
 * @param {String}  search query
 * @param {Function} callback
 * @api public
*/
//这里出现问题 request 里没有data方法
module.exports = function search(query,fn){
        request
            .get('http://suggest.taobao.com/sug')
            .query({code : 'utf-8'})
            .query({q : query})
            .accept('json')
            .end(function(err,res){
                   // console.log(res);
                    fs.writeFile('data.txt',JSON.stringify(res),'utf8',function(){
                        console.log(arguments);
                    })
                var result = JSON.parse(res.text).result;
                if(result){
                      return fn(null,result);
                }
                fn(new Error('oo  bad bad 1'))
            })
}