/**
 * Created by Administrator on 2017/3/20.
 */
/**
 * Created by Administrator on 2017/3/20.
 */
define(['text!template/test/Page2.html'],function(template){console.log(template)
    var Page1View = MainCore.MainCoreView.extend({
        $el : $('.mainContent'),
        el:$('.mainContent')[0],
        _template: _.template(template),
        events:{

        },
        //初始化
        init:function(option){
            var self = this;
            console.log(self.$el)
            self.render();
        },
        render:function(){
            var self = this;
            var html = self._template({where:'第二个页面'});
            self.$el.html(html);
        }

    });
    return Page1View;


})
