/**
 * Created by Administrator on 2017/3/16.
 */
define(['text!template/indexHead.html','MainCoreAll'],function(template){
   var   headView = MainCore.MainCoreView.extend({
         className: 'header',
         name : 'header',
         tagName : 'header',
         _template : _.template(template),
         //  初始化
         events : {

         },
         init: function(){
             this.render();
         },
         render: function(){
             var html = this._template();
             this.$el.html(html);
         },
         navigator : function(e){
             //获取标签里的属性 根据属性跳转
         },
         // 设置按钮地址
         btnArray : {
             '' : [["按钮"],['按钮对应地址'],['头部名称']],
             "dwa/dwa/N" :[]
         },
         button: function(hash){
             var head = this.btnArray[hash];
             // 末尾有个N,用于需要根据编号来显示的页面
             var hash2 = hash.replace(hash.split('/')[hash.split('/').length - 1],'');
             var head2 = this.btnArray[hash2+"N"];
             if(!head){
                 if(!head2){
                     return;
                 }else{
                     head= head2;
                 }
             }

             // 如果列表里没有对应按钮参数，默认为没有按钮
             var a = this.$el.find('.headBtn');
             if(head[0] == null){
                 a.html("");
                 return;
             }
             var btn = head[0], hash = head[1], title = head[2],aHTML = '';
             $(".headTitle").html(title);

             for(var i = 0, l = btn.length ; i < l ; i++ ){
                 if(hash[i].indexOf("javascritpt:") < 0 ){
                     aHTML += "<a href='javascript:void(0)' hash='"+hash[i]+ "' class='"+btn[i]+"' >"+(head[3] && head[3][i] || '' )+"</a>"
                 }else{
                     aHTML += "<a href='"+hash[i]+"' class='"+ btn[i]+"' >"+ (head[3] && head[3][i] || '' )+"</a>"
                 }
             }
             a.html(aHTML);
         },
         setButton: function(hash){
             this.button(hash)
         },
         destroy : function(){
             this.remove();
         }
    });
     return headView;
});