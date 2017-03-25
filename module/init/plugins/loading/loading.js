/**
 * Created by Administrator on 2017/3/20.
 * 直接实例成window下的属性 window.loading （也可根据情况改变）
 * 方法有
 * show(tip) Param：{String} 显示加载 tip:加载提示 ，默认为 加载中...
 * hide() 隐藏
 * setLoadingTip(tip) Param :{String} 动态改变加载提示
 */
;(function(){
function myloading(){
    // 模板

    var template =[
            '<div class="loading-dialog [bg]">',
            '<div class="loading-inner">',
            '<div class="loading-content ">',
            '<div class="loading"></div>',
            '<div class="loading-tip">[tip]</div>',
            '</div>',
            '</div>',
            '<div class="loading-bg"></div>',
            '</div>'
        ],
        // 默认参数
        defaults = {
            tip : '加载中...'
        },
        //这个方法不够好
        isCellPhone = /ANDROID|IPAD|IPHONE/g.test(navigator.userAgent.toUpperCase());
    // loading 构造器
    var Loading = function(){
        // this.settings = $.extend(defaults,opt);
        this.settings = defaults;
        this.el = null;
    };
    function noMove (e){
        e.preventDefault();
    }
    function animation(){
        var canvas = document.createElement("canvas"),
            ctx = canvas.getContext('2d');
        canvas.setAttribute("width","64px");
        canvas.setAttribute("height","64px");
        if(!ctx){
            alert('请更新新版本浏览器');
            return;
        }
        // canvas 绘制
        ctx.clearRect(0,0,64,64); //画布清空
        ctx.fillStyle = "transparent";
        ctx.fillRect(0,0,64,64);
        ctx.fillStyle = '#ccc';
        var base = 0;
        setInterval(function(){
            ctx.save(); // 保存当前绘图状态
            ctx.clearRect(0,0,64,64); // 清空画布
            ctx.translate(32,32);
            base = (++base === 13) ? (base -12) : base; // 使用base来指示最大圆点所在的位置，实现旋转动画的效果；
            var angle = Math.PI / 6 ; // 画12个点每个点之间是30度；
            var beginAngle = angle * base ;
            for(var i = 1 ; i <= 12 ; i++){
                ctx.beginPath(); // 开始一个路径
                if(i == 1){
                    ctx.rotate(beginAngle);
                }else{
                    ctx.rotate(angle);
                }
                ctx.arc(0,-24,i*0.3+1,0,2*Math.PI,true);
                ctx.closePath();
                ctx.fill();
            }
            ctx.restore();
        },50);
        return canvas;
    };
    // Loading 原型
    Loading.prototype = Object.create({
        // 显示加载
        show:function(wall,tip){
            this.hide();
            var _tip = tip || this.settings.tip,
                wall = wall || false,
                html = template.join('').replace(/\[tip\]/,_tip);
            if(wall){
                html = html.replace(/\[bg\]/ , 'loading-bg-block');
            }
            // this.$el = $(html);
            // this.$el.find(".loading").append(animation());
            // $(document.body).append(this.$el);
            document.body.innerHTML += html;
            document.querySelector('.loading').appendChild(animation());
            this.el= document.querySelector('.loading-dialog');
            isCellPhone && document.addEventListener('touchmove',noMove,{passive : false })
        },
        setLoadingTip: function(tip){
            //this.$el.find('.loading-tip').html(tip);
            this.el.querySelector('.loading-tip').innerHTML = tip;
        },
        //隐藏
        hide : function(){
            this.el && document.body.removeChild(this.el);
            this.el = null;
            document.removeEventListener('touchmove',noMove);
        }
    });

    // loading单例
    Loading.getInstance = function(opt){
        if(!this._instance){
            this._instance = new Loading(opt);
            return this._instance;
        }
    }
    window.loading = new Loading();
    window.loading.show(true);
    return window.loading;
}
var loading = myloading();
if (typeof module !== 'undefined' && typeof exports === 'object' && define.cmd) {
    module.exports = myloading();
} else if (typeof define === 'function' && define.amd) {

} else {

}
}).call(function() {console.log(this);
    return this || (typeof window !== 'undefined' ? window : global);
});



