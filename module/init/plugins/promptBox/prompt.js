/**
 * Created by Administrator on 2017/3/24.
 */
;(function(){
    function MyModule() {

        var Prompt,
            // 插入的html代码  [tips]用于标记
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

        function buttonEvent(e){
            var ele = e.target,
                output;
            if(ele.tagName.toUpperCase() === "SPAN"){
                Prompt.hide();
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

                Prompt._callback.call(null,output);

            }
        }

        function bindAllEvent(){
            document.querySelector('.promptInner').addEventListener('click',buttonEvent,false );
        }
        // 弹出原型
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
                this.el && document.body.removeChild(this.el);
                this.el = null;
            },
            show:function(mesg,type,fun){
                this.hide();
                this._callback = fun;
                this._type = type;
                this.render(mesg,type,bindAllEvent);
            },
        };
        Prompt = Object.create(promptTask);

        // 私有属性设置
        Prompt.settings = settings;
        Prompt.html = html;
        Prompt.el = null;
        Prompt._callback=null;
        Prompt._type = '';
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