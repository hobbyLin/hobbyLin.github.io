/**
 * Created by Administrator on 2017/2/28.
 */
/*
* MainCore 切面日志适配器
*/
define(function(){
    /*
    * 切面日志记录
    */
    function recordlog(){
        var methods = this.constructor.prototype, recorded = this.constructor.__recorded__,
            forbids = {'initialize':0, 'model' :0,'constructor':0};
        //类实例化的时候做切面日志 如果已经实例化过一次的类就不用做切面日志了
        if(this.constructor.__recorded__) return;
        //
        this.constructor.__recorded__ = true;
        for(var name in methods){
            if(methods.hasOwnProperty(name) && typeof methods[name] === 'function' && !(name in forbids) && name.charAt(0) !== '_'){
                var method = methods[name];
                methods[name] = (function(name,method){
                    return function(){
                        if(this.__logCnf__){
                            logger.i(this.__logCnf__.moduleName,'类：',this.__logCnf__.className,"的方法：","被调用");
                           // logger.e(this.__logCnf__.moduleName,'类：',this.__logCnf__.className,"的方法：","被调用");
                        }
                        var result = method.apply(this,arguments);
                        if(this.__logCnf__){
                            logger.i(this.__logCnf__.moduleName,'类：',this.__logCnf__.className,"的方法：","调用结束");
                        }
                        return result;
                    }

                })(name,method);
            }
        }
    }
    /*
    * 配置各个切面日志 模块及类名
    */
    MainCore.MainCoreController.prototype.__logCnf__ = {moduleName : "MainCore" ,className: 'MainCoreController'};
    MainCore.MainCoreCollection.prototype.__logCnf__ = {moduleName : "MainCore" ,className: 'MainCoreCollection'};
    MainCore.MainCoreModel.prototype.__logCnf__ = {moduleName : "MainCore" ,className: 'MainCoreModel'};
    MainCore.MainCoreView.prototype.__logCnf__ = {moduleName : "MainCore" ,className: 'MainCoreView'};
    /*
    * 包装切面日志
    */
    MainCore.MainCoreController.prototype.__recordlog__
            = MainCore.MainCoreCollection.prototype.__recordlog__
            = MainCore.MainCoreModel.prototype.__recordlog__
            = MainCore.MainCoreView.prototype.__recordlog__
            = recordlog;

})
