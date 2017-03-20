/**
 * Created by Administrator on 2017/3/20.
 */
define(['jQuery'],function($){
    // 模板
    var template =[
        '<div class="loading-dialog">',
           '<div class="loading-inner">',
             '<div class="loading-content">',
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
    };
    // loading 构造器
    var Loading = function(opt){
        this.settings = $.extend(defaults,opt);
    };
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
    $.extend(Loading.prototype,{
        // 显示加载
        show:function(tip){
            this.hide();
            var _tip = tip || this.settings.tip,
                html = template.join('').replace(/\[tip\]/,_tip);
            this.$el = $(html);
            this.$el.find(".loading").append(animation());
            $(document.body).append(this.$el);
        },
        setLoadingTip: function(tip){
            this.$el.find('.loading-tip').html(tip);
        },
        //隐藏
        hide : function(){
            this.$el && this.$el.remove();
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
    loading.show();
    return loading;

})