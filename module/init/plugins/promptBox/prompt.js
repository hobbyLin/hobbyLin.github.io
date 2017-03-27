/**
 * Created by Administrator on 2017/3/24.
 *
 * 本插件用Object.create方法。若是没有这个方法请参考
 * https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/create#Polyfill
 *
 * 一般情况下返回Prompt，作为window下的属性
 * Prompt对外API：show()和hide()
 * show(mes,type,callback)
 * Prama : mes {string} 字符串，显示出来的提示信息
 * Prama : type {string} 字符串，显示类型分别有三种 alert confirm prompt
 * Prama : Callback {function} 函数，执行完毕回调函数
 *
 *
 */
;(function(){
    function MyModule() {
        // 声明变量 初始化数据
        var Prompt,
            // 插入的html代码  [tips]用于转换添加内容
            html = '<div class ="promptInner">' +
                '<div class="promptBox">' +
                '<p>' +
                '[tips]<br><input type="text" name = "message" value = ""> ' +
                '</p>' +
                '<span class="btncf">确定</span><span class="btncs" >取消</span>' +
                '</div>' +
                '</div>',
            // 弹出框默认信息
            settings ={
                tip : '这是一个测试'
            };
        // 按钮事件
        function buttonEvent(e){
            var ele = e.target,
                output;
            if(ele.tagName.toUpperCase() === "SPAN"){
                // 不同类项返回不同数据
                switch(Prompt._type){
                    case 'alert':
                        output = null;
                        break;
                    case 'confirm':
                        if(ele.className === 'btncf'){
                            output = true;
                        }else{
                            output = false;
                        }
                        break;
                    case 'prompt':
                        output={};
                        if(ele.className === 'btncf'){
                            output.text =ele.parentNode.querySelector('input').value;
                            output.value = true;
                        }else{
                            output.text='';
                            output.value = false;
                        }
                        break;
                }
                Prompt._callback && Prompt._callback.call(null,output);
                Prompt.hide();
            }
        }
        // 绑定事件
        function bindAllEvent(){
            document.querySelector('.promptBox').addEventListener('click',buttonEvent,false );
        }
        //取消touchmove事件
        function noMove(e){
            e.preventDefault();
        }


        // 委托原型
        var promptTask={
            render: function(mesg,type,fun){
                var tip = mesg || this.settings.tip;
                html = this.html.replace(/\[tips\]/,tip);
                this.el = document.createElement('div');
                this.el.innerHTML = html;
                this.el.className =type;
                document.body.appendChild(this.el);
                fun();
            },
            hide:function(){
                this.isCellPhone && document.removeEventListener('touchmove',noMove);
                this.el && document.body.removeChild(this.el);
                this.el = null;
                this._callback=null;
                this._type = '';
            },
            show:function(mesg,type,fun){
                this.hide();
                this._callback = fun;
                this._type = type;
                this.render(mesg,type,bindAllEvent);
                // 适应谷歌新版本 百度（Making touch scrolling fast by default）
                this.isCellPhone  &&  document.addEventListener('touchmove',noMove ,{ passive : false });
            }
        };
        // 委托创建Prompt对象
        Prompt = Object.create(promptTask);
        // 私有属性设置
        Prompt.settings = settings;
        Prompt.html = html;
        Prompt.el = null;
        Prompt._callback=null;
        Prompt._type = '';
        // 这里调用了config文档里的App属性 判断是否为手机端
        Prompt.isCellPhone =App.touchMove;
        // 返回
        window.Prompt = Prompt;
        return Prompt;
    }
    var Prompt = MyModule;
    if (typeof module !== 'undefined' && typeof exports === 'object' && define.cmd) {
        module.exports = Prompt();
    } else if (typeof define === 'function' && define.amd) {
        define(function() { return Prompt(); });
    } else {
        this.Prompt = Prompt();
    }
}).call(function() {
    return this || (typeof window !== 'undefined' ? window : global);
});