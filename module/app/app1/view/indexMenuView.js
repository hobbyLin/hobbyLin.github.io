/**
 * Created by Administrator on 2017/3/16.
 */
define(["text!template/indexMenu.html",'MainCoreAll'],function(template){
    var menuView =  MainCore.MainCoreView.extend({
        className: 'nav',
        name: "mainNav",
        tagName: 'nav',
        _template: _.template(template),
        events: {},
        init: function (options) {
            this.render();
        },
        // 主要菜单
        menuHashList:[
            'menu1',
            'menu2',
            'menu3'
        ],
        render:function(){
            var html = this._template();
            this.$el.html(html);
            this.menuLiIcon = this.$el.find("");
            this.menuliText = this.$el.find('');
        },
        //大标签事件
        menuShow:function(){console.log('大标签')},
        menuHide:function(){console.log('隐藏标签')},
        //子标签事件
        menuHash:function(){console.log('子标签')},
        //页面跳转变样式
        locationHash:function(){console.log('页面跳转改变标签显示')}


    });
    return menuView;
})