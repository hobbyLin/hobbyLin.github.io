/**
 * Created by Administrator on 2017/2/28.
 */

/*
*  划定区域 什么样的模块可以访问
*/
 App.debug && ( localStorage.setItem("login-guest",'{"10001":{"100011":{},"100012":{}},"10002":{},"10003":{}}'))
 localStorage.setItem('littleFriend',"徐信阳")

var UserRole = JSON.parse(localStorage.getItem('login-guest')),
    //获取能够进入权限的appid
    PermissionArr = Object.keys(UserRole);
 // 页面图标和文字配置信息
userInfo ={
    backbone :[{
        appId:'10001',
        name:'firstApp',
        appName:'第一个app'
    },{
        appId:'10005',
        name:'secondApp',
        appName:'第二个app'
    },{
        appId:'10002',
        name:'thirdApp',
        appName:'第三个app'
    }],
    angular:[{
        appId:'10009',
        name:'firstApp',
        appName:'第一个app'
    },{
        appId:'10003',
        name:'firstApp',
        appName:'第一个app'
    }],
    vue:[{
        appId:'10001',
        name:'firstApp',
        appName:'第一个app'
    }],
    react:[{
        appId:'10001',
        name:'firstApp',
        appName:'第一个app'
    }],
    plugin:[{
        appId:'10001',
        name:'firstApp',
        appName:'第一个app'
    }]

};
/*
* app上线控制
*/
// 处理角色信息 渲染 设置该app是否上锁
var userInfoProgress = function(key){
    for(var i = 0 ; i < userInfo[key].length; i++){
        PermissionArr.indexOf(userInfo[key][i].appId) === -1 ?userInfo[key][i].display= 'inline-block' : userInfo[key][i].display='none';
    }

};
userInfoProgress("backbone");
userInfoProgress("angular");
/*
* renderView
 * @param {string} elpos 要填充模板element元素jq选择表达方式
 * @param {string} tpName 所要使用模板jq选择表达式
 * @param {function} 渲染后执行的事件
 * @param {Object} data 渲染页面的数据
*/
var render = function(elPose , tplName ,bindE,data){
    var content = $(elPose),tpl=$(tplName).html();
    var html = _.template(tpl)(data)
    content.html(html);
    bindE && bindE();
}
/*
* [gtoApp 根据linkName跳转到相应App]
*/
function checkSccIsNineNumber(scc){
    if(scc == '' || !scc) return false;
    if(scc.length != 9 )return false;
    scc = scc+'';
    if(scc.match(/^\d+$/g) === null) return false;
    return true;
}
function gotoApp(){
    // 如果没有权限 阻止程序调到应用内
    // console.log(window.appId)
    // console.log(UserRole[window.appId])
    if(window.appId !== 'allUser' && window.appId !== '10008' && Object.keys(UserRole[window.appId]).length === 0){
        setTimeout(function(){
            Prompt.show("sorry guys, u don't have the permission access my blog",'alert',function(){});
        },200)
        return;
    }
    switch(window.linkName){
        case 'firstApp':
            // 进行验证
            console.log("firstApp")
            localStorage.setItem('mylove','yy')
            location.href = "../../app/app1/index.html"
            break;
        case 'secondApp':
            // 验证
            console.log("secondApp")
            //location.href = ""
            break;
    }
}
/*
* 点击应用图标的事件处理
*/
var gotoCorresponding = function(e){
    if(e.target.dataset.link && e.target.parentNode.parentNode.querySelector('.appMark').style.display !== 'inline-block'){
        e.target.classList.remove('app_icon_hover');
        window.linkName = e.target.dataset.link;
        window.appId = e.target.dataset.appid;
        testDiv.innerHTML+='<br/> <span style="color:green;">this is touchend </span> : style (blur) go, and get appid & linkName;'
    }else{
        //其他
        console.log("这是图标事件额");
        if(e.target.parentNode.parentNode.querySelector('.appMark').length > 0 ){
            testDiv.innerHTML+='<br/><span style="color:red;">this is touchend : and nothing change;</span>';
            Prompt.show("嘿，我发现一个bug",'alert',function(){});
        }
        return;
    }

    window.updateApp(window.linkName,gotoApp);

}
/*
* 切换应用大类的标签
*/
var toggleAppType = function(e){
    var appListDom = document.querySelectorAll("[data-app-list]"),
        appTypeButtonList = document.querySelectorAll('[data-app-type]');
    if(e.target.dataset.appType){
        for(var i = 0 ; i < appListDom.length; i++){
            appListDom[i].classList.add("dsn");
        }
        for(var i = 0 ; i < appTypeButtonList.length;i++){
            appTypeButtonList[i].classList.remove("curron");
        }
        e.target.classList.add('curron');
        document.querySelector('[data-app-list="'+e.target.dataset.appType+'"]').classList.remove('dsn');
    }

};
/*
* events  页面元素事件添加逻辑
 * 没有输入参数，每次render都会回调
*/
var bindEvents = function(){
    document.body.addEventListener(App.clickUp,gotoCorresponding,false);
    document.body.addEventListener(App.clickDown,function(e){

        if(e.target.dataset.link && e.target.parentNode.parentNode.querySelector('.appMark').style.display !== 'inline-block'){
            // 点击瞬间 改变图标颜色
          //  e.target.classList.add('app_icon_'+e.target.dataset.link + "_hover");
            testDiv.innerHTML += '<br/> <span style="color:green;">this is touchstart </span> : style (blur) come! '
            e.target.classList.add("app_icon_hover");
        }
    },false);
    // 标签加事件响应
    document.querySelector("#apptype").addEventListener(App.clickDown,toggleAppType,false );
};
// 打印localStorage到日志
var localStorageLog = function(){
    var log , json ={};
    for(var key in localStorage){
        json[key] = localStorage.getItem(key);
    }
    log = '[localStorage]:' + JSON.stringify(json);
    console.log(log);
};
/*
* 做一个时钟装逼
*/
// 做一个canvas钟
function clock(){
    var now = new Date();
    var ctx = document.querySelector(".logo").getContext('2d');
    ctx.save();
    ctx.clearRect(0,0,150,150);
    ctx.translate(75,75);
    ctx.scale(0.15,0.15);
    ctx.rotate(-Math.PI/2);
    ctx.strokeStyle = "black";
    ctx.fillStyle = "transparent";
    ctx.lineWidth = 8;
    ctx.lineCap = "round";

    // Hour marks
    ctx.save();
    for (var i=0;i<12;i++){
        ctx.beginPath();
        ctx.rotate(Math.PI/6);
        ctx.moveTo(100,0);
        ctx.lineTo(120,0);
        ctx.stroke();
    }
    ctx.restore();

    // Minute marks
    ctx.save();
    ctx.lineWidth = 5;
    for (i=0;i<60;i++){
        if (i%5!=0) {
            ctx.beginPath();
            ctx.moveTo(117,0);
            ctx.lineTo(120,0);
            ctx.stroke();
        }
        ctx.rotate(Math.PI/30);
    }
    ctx.restore();

    var sec = now.getSeconds();
    var min = now.getMinutes();
    var hr  = now.getHours();
    hr = hr>=12 ? hr-12 : hr;

    ctx.fillStyle = "black";

    // write Hours
    ctx.save();
    ctx.rotate( hr*(Math.PI/6) + (Math.PI/360)*min + (Math.PI/21600)*sec )
    ctx.lineWidth = 14;
    ctx.beginPath();
    ctx.moveTo(-20,0);
    ctx.lineTo(80,0);
    ctx.stroke();
    ctx.restore();

    // write Minutes
    ctx.save();
    ctx.rotate( (Math.PI/30)*min + (Math.PI/1800)*sec )
    ctx.lineWidth = 10;
    ctx.beginPath();
    ctx.moveTo(-28,0);
    ctx.lineTo(112,0);
    ctx.stroke();
    ctx.restore();

    // Write seconds
    ctx.save();
    ctx.rotate(sec * Math.PI/30);
    ctx.strokeStyle = "#D40000";
    ctx.fillStyle = "#D40000";
    ctx.lineWidth = 6;
    ctx.beginPath();
    ctx.moveTo(-30,0);
    ctx.lineTo(83,0);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(0,0,10,0,Math.PI*2,true);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(95,0,10,0,Math.PI*2,true);
    ctx.stroke();
    ctx.fillStyle = "rgba(0,0,0,0)";
    ctx.arc(0,0,3,0,Math.PI*2,true);
    ctx.fill();
    ctx.restore();

    ctx.beginPath();
    ctx.lineWidth = 14;
    ctx.strokeStyle = '#29343a;'
    ctx.arc(0,0,142,0,Math.PI*2,true);
    ctx.stroke();

    ctx.restore();

    window.requestAnimationFrame(clock);
}

/*
* 载入百度地图 获取城市相关信息
*  1、利用h5方法获取地理位置
*  2、利用百度api获取地理位置
*/
// 根据lat lon 实现百度地图
// param point {Object} 百度返回的 BMap.Point(lon,lat) 的实例
// param elem  {String}  对应的dom 元素
function getMap(point,elem){
    var mp,
        point = point || null,
        elem = elem || '';
     mp = new BMap.Map(elem);
     //设置地图样式
    mp.setMapStyle({style:'hardedge'});
    mp.centerAndZoom(point, 15);
}

// h5获取当前地理位置
function getPosition(fun){
    var lat , lon ;
    if (navigator.geolocation){
        navigator.geolocation.getCurrentPosition(function(position){
             lat = position.coords.latitude;
             lon = position.coords.longitude;
            console.log(lon + '--'+ lat);
            document.querySelector('[name = "h5-lon"]').value = lon;
            document.querySelector('[name = "h5-lat"]').value = lat;

            return fun.call(this,lon,lat);

        },function(error){
            alert('获取失败,默认上海咯');
             lon = 121.491;
             lat = 31.233;
            switch (error.code) {
                case 1:
                    alert("位置服务被拒绝。");
                    break;
                case 2:
                    alert("暂时获取不到位置信息。");
                    break;
                case 3:
                    alert("获取位置信息超时。");
                    break;
                default:
                    alert("未知错误。");
                    break;
            };
            return fun.call(this,lon,lat);
        }, { timeout: 20000, enableHighAccuracy: true })
    }else{
        alert('本浏览器不支持,只能默认上海咯');
        lon = 121.491;
        lat = 31.233;
        return fun.call(this,lon,lat);
    };


}

// ip 获取地理位置
function ipGetInfo(data){
    console.log('利用百度ip获取地理位置'+JSON.stringify(data));
    var data = data || {},
        content = data.content || {},
        address = content.address || '',
        addressDetail = content.address_detail || {},
        city = addressDetail.city || '',
        ipPoint = content.point || {},
        lon = ipPoint.x || '',
        lat = ipPoint.y || '';
    //将地理位置显示
    document.querySelector('[name = "ip-lon"]').value = lon;
    document.querySelector('[name = "ip-lat"]').value = lat;
    // 这里直接获取由ip得到的地址 ipPosition
    localStorage.setItem('ipPosition',JSON.stringify(data));
    console.log(lon + '--'+ lat);
    var point = new BMap.Point(lon,lat);
    var gc = new BMap.Geocoder();
    gc.getLocation(point,function(rs){
        var loInfo = rs.addressComponents;
        console.log('利用ip获取的经度纬度地理位置：'+JSON.stringify(loInfo));
        localStorage.setItem('iplatlonPosition',JSON.stringify(loInfo));
    });

    getMap(point,'mapIp');
    // var mp = new BMap.Map('mapIp');
    // mp.setMapStyle({style:'hardedge'});
    // mp.centerAndZoom(point, 15);
    //
    // 需要一个判断
    var weatherData = JSON.parse(localStorage.getItem('weather')),
        _dayList,
        _dayStr;
    if(!_.isEmpty(weatherData) &&
        !_.isEmpty(weatherData.today) &&
        !_.isEmpty(city) &&
        typeof city == "string" &&
        city.indexOf(weatherData.today.city) > -1){
        _dayList =  /^(\d{4})\D+(\d{1,2})\D+(\d{1,2})\D+$/.exec(weatherData.today.date_y);
        if(!_.isEmpty(_dayList)){
            _dayStr = _dayList[1]+'-'+ _dayList[2]+'-'+ _dayList[3];
            if((new Date()).toDateString() === Date.get(_dayStr).toDateString()){
                render('.weather','#tp04',null,weatherData);
            }else{
                ajaxWeather(city)
            }
        }
    }else{
        ajaxWeather(city)
    }
}

// 百度地图初始化
function initialize() {
    // h5获取地理位置
    var pos = getPosition(function(lon,lat){
        var point = new BMap.Point(lon,lat);
        var gc = new BMap.Geocoder();
        gc.getLocation(point,function(rs){
            var loInfo = rs.addressComponents;
            console.log('利用h5获取的地理位置：'+JSON.stringify(loInfo));
            localStorage.setItem('h5Position',JSON.stringify(loInfo));
        });
        getMap(point,'map');
    });
    // 利用ip获取地理位置
    $.ajax({
        type:'get',
        url:'https://api.map.baidu.com/location/ip?ak=AEsLIVDinYqlzP69208oPLk5cygwaoLi&coor=bd09ll',
        dataType:'jsonp',
        success:function(data,textStatus,jqXHR){
            console.log('dd');
            ipGetInfo(data);
        },
        error:function(jqXHR){
            console.log(JSON.stringify(jqXHR));

        }
    })

}
//获取天气数据
function ajaxWeather(city){
    var city = encodeURI(city);
    $.ajax({
        type:'get',
        url:'https://v.juhe.cn/weather/index?format=2&cityname='+city+'&key=aa540a01d200f64f33f55a48a7b14f3f',
        dataType:'jsonp',
        success : function(data){
            // 将天气数据存起来
            localStorage.setItem('weather',JSON.stringify(data.result))
            var renderData = data.result;
            render('.weather','#tp04',null,renderData)
        },
        error:function(){
            console.log('失败');
        }
    })
}


//跨域加载百度地图模板
function loadScript() {
    var scriptMap = document.createElement("script");
    scriptMap.src = "https://api.map.baidu.com/api?v=2.0&ak=AEsLIVDinYqlzP69208oPLk5cygwaoLi&s=1&callback=initialize";//此为v2.0版本的引用方式
    document.body.appendChild(scriptMap);
}


/*
* 渲染页面
*/


render("#content","#tp03",bindEvents,userInfo);
var testDiv = document.querySelector('.testInfo');
// 插入动画
window.requestAnimationFrame(clock);
// 插入百度地图
loadScript();
// 查看本地储存
//localStorageLog();
