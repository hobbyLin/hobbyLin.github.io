/**
 * Created by Administrator on 2017/3/20.
 */
define(['text!template/test/Page1.html'],function(template){console.log(template)
    var Page1View = MainCore.MainCoreView.extend({
        $el : $('.mainContent'),
        el:$('.mainContent')[0],
        _template: _.template(template),
        events:{
            'touchstart button':"buttonEvent"
        },
        //初始化
        init:function(option){
            var self = this;
            console.log(self.$el)
            self.render();
        },
        render:function(){
            var self = this;
            var html = self._template({myName:'按了跳转到Page2'});
            self.$el.html(html);
        },
        buttonEvent:function(e){
            console.log(e);
            MainCore.navigate('app1/test/Page2')

        }
    });
    return Page1View;


})
