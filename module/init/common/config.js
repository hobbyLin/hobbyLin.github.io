/**
 * Created by Administrator on 2017/2/28.
 */
// 公共配置文件 包括公共常量 配置方法
define(['plugins/helper/areaCode'],function(areaCode){
   //console.log(JSON.stringify(areaCode));

    // 初始化一个App对象
    window.App = {};

    //设备判断
    var ua = navigator.userAgent.toUpperCase();
    App.debug = true;
    App.IS_ANDROID= ua.indexOf("ANDROID") != -1;
    App.IS_IPAD =  ua.indexOf('IPAD') != -1;
    App.IS_IPHONE = ua.indexOf("IPHONE") != -1;
    App.clickDown = (App.IS_ANDROID ||  App.IS_IPAD || App.IS_IPHONE) ? "touchstart" : "mousedown";
    App.clickUp = (App.IS_ANDROID ||  App.IS_IPAD || App.IS_IPHONE) ? "touchend" : "mouseup";


    // 根据身份证获取相关信息
    var rid = /^(\d{6})(\d{4})(\d{2})(\d{2})(\d{3})(\d{1}|X|x)$/,
        parseID = function(ID) {
            if ( ID.length == 15 ) {
                // 升级为18位
                ID = ID.substr( 0, 6 ) + "19" + ID.substr( 6 );
                // 前17位对应的系数
                var rank = [
                    "7", "9", "10", "5", "8", "4", "2", "1", "6", "3", "7", "9", "10", "5", "8", "4", "2"
                ];
                // 前17为加权除以17后的余数对应的最后一位身份证号码
                var last = [
                    "1", "0", "X", "9", "8", "7", "6", "5", "4", "3", "2"
                ];
                // 加权和
                for ( var i = 0, sum = 0, len = ID.length; i < len; i++)
                    sum += ID[ i ] * rank[ i ];
                // 加上最后一位
                ID += last[ sum % 11 ];
            }
            if ( ID.length != 18 ) return null;

            var match = rid.exec( ID ),
                area,
                year,
                month,
                day,
                sex;
            if(!match){
                alert('匹配不到');
                return;
            }
            for(var i = 0 , l = areaCode.length; i < l ; i++ ){
                if(match[1] == areaCode[i].areaCode){
                    area =  areaCode[i].detail;
                    break;
                }
            };
            year = match[ 2 ];
            month = match[3];
            day = match[4];
            sex = match[5] % 2 =='1' ? '男' : '女';
            return match ? {
                    ID : ID,
                    area : area,
                    y : year,
                    m : month,
                    d : day,
                    sex : sex
                } : null;
        };
    App.getIdInfo= function(){
        return  parseID.apply(this,arguments);
    }



})




