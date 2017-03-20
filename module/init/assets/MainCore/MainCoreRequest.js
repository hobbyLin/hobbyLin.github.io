/**
 * Created by Administrator on 2017/2/28.
 */
define(['MainCore'],function(){
    var request = MainCore.request={
        _parameters :{},
        clear : function(){
            if(!_.isEmpty(this._parameters))
                this._parameters = {};
        },
        /*
         * 添加获取参数统一方法
         * @param args
         * 1 若args[0]为字符串，且只有一个参数，则取出key为arg[0]的参数值
         * 2 若args[0]为字符串，且有两个参数，则设置key为args[0]的参数值为
         * 3 若第一个参数是Object,则将Objec里所有key和value都复制到
         */
        param : function(){
            var arg = arguments , idx = 0 , len = arg.length;
            switch (len){
                case 1 :
                    if(typeof arg[0] === 'string'){
                        return _.clone(this._parameters[arg[0]]);
                    }else if(_.isObject(arg[0])){
                        _.extend(this._parameters,arg[0]);
                    }
                    break;
                case 2 :
                    if(typeof arg[0] === 'string'){
                        return this._parameters[arg[0]] = arg[1];
                    }else if(_.isObject(arg[0])){
                        _.extend(this._parameters,arg[0]);
                    }
                    break;
            }
            return _.clone(this._parameters);
        }
    };
    return request;
})
