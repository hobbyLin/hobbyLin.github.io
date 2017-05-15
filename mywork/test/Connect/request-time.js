/**
 * Created by Administrator on 2017/5/15.
 */
/*
*  请求时间中间件
*  选项：
*   -'time'('Number'): 超时阈值（默认100）
*   @param {Object} options
*   @API public
*/
module.exports= function(opts){
    var time = opts.time || 100;
    return function(req,res,next){
        var timer = setTimeout(function(){
            console.log(
                'taking too long!',req.method,req.url
            )
        },time);
        var end = res.end;
        res.end = function(chunk,encoding){
            res.end = end;
            res.end(chunk,encoding);
            clearTimeout(timer);
        }
        next();
    }
}