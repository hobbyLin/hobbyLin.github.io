/**
 * Created by Administrator on 2017/3/17.
 */
define(['MainCoreController'],function(MainCoreController){
    return MainCoreController.extend({
        // 模块名
        module: 'app1',
        //控制器名
        name : 'test',
        //actions
        actions:{
            '' : "Page1",
            'Page1': "Page1",
            'Page1/:param':"Page1",
            'Page2' :'Page2'
        },
        init:function(){
            var self = this;

            self.indexWrapView = MainCore.MainCoreView.shareViews.get('app1IndexWrapView');
        },
        Page1 : function(param){
            var self = this;
            param && console.log(param);

            self.setBodyView('Page1View',{controller:self});

        },
        Page2: function(param){
            var self = this;
            param && console.log(param);
            self.setBodyView('Page2View',{controller:self});

        },
        setBodyView : function(url, options, callback){
            var self = this;
            require(['view/test/' + url],function(view){
                // 把这个view作为控制器属性 方便返回调用
                self[url] = self.indexWrapView.setBody(view,options);
                if(callback && _.isFunction(callback)){
                    callback(self[url]);
                }
            })
        }

    })
})


