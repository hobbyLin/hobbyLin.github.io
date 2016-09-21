

$(function() {
        $('#allinone_thumbnailsBanner').allinone_thumbnailsBanner({
            numberOfThumbsPerScreen:7,
            width: 960,
            height: 384,
            thumbsReflection:0,
            defaultEffect: 'random'
        });     
        
    });







/* 鼠标移入事件*/
$(function () {             
    var index=0;
    $('#college_tv_main_cg ul li').mouseover(function () {
        index=$(this).index();
        run(index);
    });                     
        function run(a) {
            $('#college_tv_main_cg ul li').eq(a).addClass('color').siblings().removeClass('color');
            $('#college_tv_main_cg ul li').eq(a).children('img:eq(0)').addClass('img1').parents().siblings().children().removeClass('img1');
            $('#college_tv_main_cg ul li').eq(a).children('img:eq(1)').addClass('img2').parents().siblings().children().removeClass('img2');            
        };      
})
/* 鼠标移入事件*/
    
    
/* 图片淡入淡出*/ 
$(function(){
(function(id,t){
    if(!document.getElementById(id)){return false;}
    var doc = document,
        auto='',
        oId = doc.getElementById(id),
        IE = /msie (\d+\.\d)/i.test(navigator.userAgent),
        num = 0,
        bot = true,
        setOpacity = function(obj, opacity){
            if(IE){
                obj.style.filter = 'Alpha(Opacity=' + (opacity * 100) + ')';    
            }
            else{
                obj.style.opacity = opacity;
            };
        },
        setBottom = function(obj, bottom){
            obj.style.bottom = bottom + 'px';
        },
        fideIn = function(obj, timeLimit){
            if(obj.style.display === 'none'){
                obj.style.display = 'block';
            };
            setOpacity(obj, 0);
            obj.style.zIndex = 1;
            if(!timeLimit){
                timeLimit = 200;
            };
            var opacity = 0,
            step = timeLimit / 20;
            clearTimeout(fideInTime);
            var fideInTime = setTimeout(function(){
                bot = false;
                if(opacity >= 1){
                    bot = true;
                    return;
                };
                opacity += 1 / step;
                setOpacity(obj, opacity);
                fideInTime = setTimeout(arguments.callee, 20);
            },20);
        },
        fideOut = function(obj, timeLimit){
            if(!timeLimit){
                timeLimit = 200;
            };
            setOpacity(obj, 1);
            obj.style.zIndex = 0;
            var opacity = 1,
            step = timeLimit / 20;
            clearTimeout(fideOutTime);
            var fideOutTime = setTimeout(function(){
                if (opacity <= 0) {
                    setOpacity(obj, 0);
                    return;
                };
                opacity -= 1 / step;
                setOpacity(obj, opacity);
                fideOutTime = setTimeout(arguments.callee, 20);
        
            },20);
        },
        heightIn = function(obj, timeLimit){
            if(obj.style.display === 'none'){
                obj.style.display = 'block';
            };
            setBottom(obj, -40);
            if(!timeLimit){
                timeLimit = 200;
            };
            var bottom = -40,
            step = timeLimit / 20;
            clearTimeout(heightInTime);
            var heightInTime = setTimeout(function(){
                if(bottom >= 8){
                    setBottom(obj, 8);
                    return;
                };
                bottom += 28 / step;
                setBottom(obj, bottom);
                heightInTime = setTimeout(arguments.callee, 20);
            },20);
        },
        heightOut = function(obj, timeLimit){
            if(!timeLimit){
                timeLimit = 200;
            };
            setBottom(obj, 8);
            var bottom = 8,
            step = timeLimit / 20;
            clearTimeout(heightOutTime);
            var heightOutTime = setTimeout(function(){
                if(bottom <= -40){
                    setBottom(obj, -40);
                    return;
                };
                bottom -= 28 / step;
                setBottom(obj, bottom);
                heightOutTime = setTimeout(arguments.callee, 20);
            },20);
        },
        getClass = function(oElem, strTagName, strClassName){   
            var arrElements = (strTagName == '*' && oElem.all) ? oElem.all : oElem.getElementsByTagName(strTagName);
            var returnArrElements = new Array();   
            var oRegExp =  new RegExp('(^|\\s)' + strClassName + '($|\\s)');   
            for(var i=0; i<arrElements.length; i++){   
                if(oRegExp.test(arrElements[i].className)){   
                    returnArrElements.push(arrElements[i]);   
                }   
            }   
            return (returnArrElements);
        },
        createElement = function(tag, id, cla){
            var elem = document.createElement(tag);
            if(id && id !== ""){
                elem.id = id;
            }
            if(cla && cla !== ""){
                elem.className = cla;
            }
            return elem;
        },
        showImg = function(n,b){
            var turnPic = getClass(oId,'ul','turn-pic')[0];
            var oLi = turnPic.getElementsByTagName('li');
            var turnTit = getClass(oId,'ul','turn-tit')[0];
            var oLi2 = turnTit.getElementsByTagName('li');
            fideIn(oLi[n],300);
            heightIn(oLi2[n],300);
            if(b==true){
                if(n==oLi.length-1){
                    fideOut(oLi[0],300);
                    heightOut(oLi2[0],300);
                }
                if(n<oLi.length-1){
                    fideOut(oLi[n+1],300);
                    heightOut(oLi2[n+1],300);
                }
            }
            else{
                if(n>0){
                    fideOut(oLi[n-1],300);
                    heightOut(oLi2[n-1],300);
                }
                if(n==0){
                    fideOut(oLi[oLi.length-1],300);
                    heightOut(oLi2[oLi2.length-1],300);
                }
            }
        },
        addHtml = function(){
            var oBg = createElement('div','','turn-bg');
            var oTit = createElement('ul','','turn-tit');
            var oBtn = createElement('div','','turn-btn');
            var turnPic = getClass(oId,'ul','turn-pic')[0];
            var oA = turnPic.getElementsByTagName('a');
            var oImg = turnPic.getElementsByTagName('img');
            for(var i=0,len=oA.length;i<len;i++){
                oTit.innerHTML += '<li><a href="'+ oA[i].href +'">'+ oImg[i].title +'</a></li>';
            }
            oBtn.innerHTML = '<div class="lb"></div><div class="rb"></div><span></span>';
            oId.appendChild(oBg);
            oId.appendChild(oTit);
            oId.appendChild(oBtn);
        },
        init = function(){
            addHtml();
            showImg(0);
            var turnLoading = getClass(oId,'div','turn-loading')[0];
            oId.removeChild(turnLoading);
            oId.onmouseover = function(){
                clearInterval(auto);
            };
            oId.onmouseout = function(){
                auto = setInterval(autoTurn, t*1000);
            };
            var turnPic = getClass(oId,'ul','turn-pic')[0];
            var oLi = turnPic.getElementsByTagName('li');
            var oLb = getClass(oId,'div','lb')[0];
            var oRb = getClass(oId,'div','rb')[0];
            oLb.onmouseover = function(){
                this.style.backgroundPosition = '-12px 0';
            }
            oLb.onmouseout = function(){
                this.style.backgroundPosition = '0 0';
            }
            oRb.onmouseover = function(){
                this.style.backgroundPosition = '-18px 0';
            }
            oRb.onmouseout = function(){
                this.style.backgroundPosition = '-6px 0';
            }
        },
        autoTurn=function(){
            var turnPic = getClass(oId,'ul','turn-pic')[0];
            var oLi = turnPic.getElementsByTagName('li');
            if(num==oLi.length-1){
                num = 0;
            }
            else{
                num = num + 1;
            }
            showImg(num);
        };
        init();
        auto = setInterval(autoTurn, t*1000);
})('turn',3);           
});
/* 图片淡入淡出*/ 


/* 图片上下无缝滚动*/
$(function () {
//中间部分
//向上滚动代码开始
var speed=17;
var colee2=document.getElementById("colee2");
var colee1=document.getElementById("colee1");
var colee=document.getElementById("colee");
colee2.innerHTML=colee1.innerHTML; //克隆colee1为colee2
function Marquee1(){
//当滚动至colee1与colee2交界时
if(colee2.offsetTop-colee.scrollTop<=0){
 colee.scrollTop-=colee1.offsetHeight; //colee跳到最顶端
 }else{
 colee.scrollTop++
}
}
var MyMar1=setInterval(Marquee1,speed)//设置定时器
colee.onmouseover=function() {clearInterval(MyMar1)}//鼠标移上时清除定时器达到滚动停止的目的
colee.onmouseout=function(){MyMar1=setInterval(Marquee1,speed)}//鼠标移开时重设定时器
//向上滚动代码结束

//左边部分
var speed=17;
var colee_bottom2=document.getElementById("colee_bottom2");
var colee_bottom1=document.getElementById("colee_bottom1");
var colee_bottom=document.getElementById("colee_bottom");
colee_bottom2.innerHTML=colee_bottom1.innerHTML
colee_bottom.scrollTop=colee_bottom.scrollHeight
function Marquee2(){
if(colee_bottom1.offsetTop-colee_bottom.scrollTop>=0)
colee_bottom.scrollTop+=colee_bottom2.offsetHeight
else{
colee_bottom.scrollTop--
}
}
var MyMar2=setInterval(Marquee2,speed)
colee_bottom.onmouseover=function() {clearInterval(MyMar2)}
colee_bottom.onmouseout=function() {MyMar2=setInterval(Marquee2,speed)}

//右边部分
var colee_bottom3=document.getElementById("colee_bottom3");
var colee_bottom4=document.getElementById("colee_bottom4");
var colee_bottom5=document.getElementById("colee_bottom5");
colee_bottom5.innerHTML=colee_bottom4.innerHTML
colee_bottom3.scrollTop=colee_bottom3.scrollHeight
function Marquee3(){
if(colee_bottom4.offsetTop-colee_bottom3.scrollTop>=0)
colee_bottom3.scrollTop+=colee_bottom5.offsetHeight
else{
colee_bottom3.scrollTop--
}
}
var MyMar3=setInterval(Marquee3,speed)
colee_bottom3.onmouseover=function() {clearInterval(MyMar3)}
colee_bottom3.onmouseout=function() {MyMar3=setInterval(Marquee3,speed)}
});
/* 图片上下无缝滚动*/


/* 鼠标移动实现遮罩效果*/
$(function(){
    $('#banner div').css('opacity',0.3);
    $('#banner').hover(function(){      
        var el = $(this);
        el.find('div').stop().animate({width:400,height:400},'slow',function(){
            el.find('h5').fadeIn('fast');
        });
    },function(){
        var el = $(this);
        el.find('h5').stop(true,true).hide();
        el.find('div').stop().animate({width:60,height:60},'fast');
    });
});

$(function(){
    $('#banner2 div').css('opacity',0.3);
    $('#banner2').hover(function(){     
        var el = $(this);
        el.find('div').stop().animate({width:400,height:400},'slow',function(){
            el.find('h5').fadeIn('fast');
        });
    },function(){
        var el = $(this);
        el.find('h5').stop(true,true).hide();
        el.find('div').stop().animate({width:60,height:60},'fast');
    });
});

$(function(){
    $('#banner3 div').css('opacity',0.3);
    $('#banner3').hover(function(){     
        var el = $(this);
        el.find('div').stop().animate({width:400,height:400},'slow',function(){
            el.find('h5').fadeIn('fast');
        });
    },function(){
        var el = $(this);
        el.find('h5').stop(true,true).hide();
        el.find('div').stop().animate({width:60,height:60},'fast');
    });
});
/* 鼠标移动实现遮罩效果*/
