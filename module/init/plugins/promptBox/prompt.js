/**
 * Created by Administrator on 2017/3/24.
 */
;(function(window,$,undefined){
    var html = '<div class="showBox"> <div class="promptBox"><p>' +
        '<input type="text" name = "message" value = "[tips]"> </p>' +
        '<button>确定</button><button>取消</button></div></div>'


    var promptTask={
        render: function(str){
            this.hide();
            var tip = str || this.settings.tip;
            html = this.html.replace(/\[tips\]/,tip);
            this.el = document.createDocumentFragment().innerHTML = html;
            document.body.appendChild(this.el);

        },
        hide:function(){

        },
        alert:function(str){

            this.render();
        },
        confirm: function(str){

            this.render();
        },
        prompt:function(str){

            this.render();
        }
    }




})(window,jQuery);