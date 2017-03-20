/**
 * Created by Administrator on 2017/2/28.
 */
//定义路径
require.config({
    baseUrl:'',
    shim:{
        'zepto':{
            exports : '$'
        },
        'jQuery':{
            exports:'jQuery'
        },
        'underscore':{
            exports:'_'
        },
        'backbone':{
            deps:['text','jQuery','underscore'],
            exports:'Backbone'
        },
        "backbone.localStorage":['backbone','helper/String'],
        'config':{
            deps:["jQuery"]
        },
        'MainCore':{
            deps:['backbone'],
            exports:'MainCore'
        },
        "MainCoreModel":{
            deps:['MainCore'],
            exports:'MainCoreModel'
        },
        "MainCoreCollection":{
            deps:['MainCore'],
            exports:'MainCoreCollection'
        },
        'MainCoreView':{
            deps:['MainCore'],
            exports:'MainCoreView'
        },
        "MainCoreRouter":{
            deps:['MainCore'],
            exports:'MainCoreRouter'
        },
        'MainCoreHistory':{
            deps:['MainCore'],
            exports:"MainCoreHistory"
        },
        "MainCoreController":{
            deps:['MainCore'],
            exports:"MainCoreController"
        },
        "MainCoreAll":{
            deps:['MainCore','MainCoreModel','MainCoreCollection','MainCoreView','MainCoreRouter','MainCoreHistory','MainCoreController'],
            exports:'MainCoreAll'
        },
        'MainCoreLoggerAdapter':{
            deps:['MainCoreAll']
        },
        logger:{
            deps:['backbone'],
            exports:'logger'
        },
        'common/config':['jQuery','logger'],
        'common/load':['common/config']
    },
    paths : {
        text : '../../init/assets/require/text',
        zepto : '../../init/assets/zepto/zepto.min',
        jQuery : '../../init/assets/jquery/jquery',
        underscore : '../../init/assets/underscore/underscore.min',
        logger:'../../init/assets/logger/logger',
        backbone: '../../init/assets/backbone/backbone-min',
        'backbone.localStorage':'../../init/assets/backbone/backbone.localStorage',
        MainCore:'../../init/assets/MainCore/MainCore',
        MainCoreModel:'../../init/assets/MainCore/MainCoreModel',
        MainCoreCollection:'../../init/assets/MainCore/MainCoreCollection',
        MainCoreView:'../../init/assets/MainCore/MainCoreView',
        MainCoreRouter:'../../init/assets/MainCore/MainCoreRouter',
        MainCoreHistory:'../../init/assets/MainCore/MainCoreHistory',
        MainCoreController:'../../init/assets/MainCore/MainCoreController',
        MainCoreRequest:'../../init/assets/MainCore/MainCoreRequest',
        MainCoreAll:'../../init/assets/MainCore/MainCoreAll',
        MainCoreLoggerAdapter:'../../init/assets/MainCore/MainCoreLoggerAdapter',
        plugins:'../../init/plugins',
        common:'../../init/common',
        helper:'../../init/plugins/helper',
        commonUI:'../../init/assets/UI',
        cordova:'../../init/assets/ios/cordova'



    }
});

define(['MainCoreAll','MainCoreLoggerAdapter','common/config','cordova','common/load'],function(MainCore){
   // window.DEBUG = App.debug && Boolean(App && App.config.section.indexOf('product') == -1);
   //  window.DEBUG = App.debug && Boolean(App && true);
   //  jQuery.fx.off = App.config.fxOff;
   //  !DEBUG && console.warn('DEBUG is %s',DEBUG);

    var HASH = "",h;
    if(window.sessionStorage.getItem('TargetHash')){
        h = window.sessionStorage.getItem('TargetHash');
        window.sessionStorage.removeItem("TargetHash");
        HASH = h;
    }
    MainCore.init({isSPA :true , defaultHash : HASH});

})