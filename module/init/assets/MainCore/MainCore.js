/**
 * Created by Administrator on 2017/2/28.
 */
//定义MC对象
define(['backbone','logger'],function(Backbone,logger){
    // MC原型引用为Backbone，便于调用
    var MainCoreConstructor = new Function();
    MainCoreConstructor.prototype = Backbone;
    MainCoreConstructor.prototype.constructor = MainCoreConstructor;

    // 创建扩展MainCore对象
    _.extend(window.MainCore = new MainCoreConstructor(),{
        //框架版本号
        VERSION : '0.0.0',
        // 上一次加载hash
        lastHash : '',
        // 初始化到Router对象
        /*
        * @param {Object} options 定义初始化参数
        * {
        *  isSPA：是否单页， true 单页； 否者多页 默认为false
        * pushState ： 是否使用history api 默认false
        * defaultHash ： 如果地址栏没有带hash的话 默认route到的
        */
        module : 'MainCore',
        init : function (options){
            var options = options || {};
            options.isSPA === undefined  && (options.isSPA = false);
            options.pushState === undefined && (options.pushState = false);
            options.defaultHash === undefined && (options.defaultHash = "index/index");
            this.router = new MainCore.MainCoreRouter();
            this.history.start({
                pushState : options.pushState
            });
            this.defaultHash = options.defaultHash;
            if(options.isSPA){
                MainCore.history.handlers.push({
                    callback : _.bind(this.autoload,this),
                    route : /^(.*)$/
                });
                this.navigate();
            }
            this.handleStatus.coreConfig = options.coreConfig;
        },
        //导航到当前的action
        navigate : function(fragment){
            var router = this.router, fragment = fragment || location.hash.substring(1) || this.defaultHash;
            router.navigate('',{
                trigger :false ,
                replace : true
            });
            router.navigate(fragment,{
                trigger:true,
                replace:true
            });
        },
        // 自动解析加载模块入口
        autoload:function(hash){console.log(hash)
            if(this.lastHash === hash){
                MainCore.routeStatus = 404;
                MainCore.handleStatus(MainCore.routeStatus,hash);
                throw Error('404 : not found uri :' + hash);
                return false;
            }
            this.lastHash = hash;
            var hashArr = hash.split('/');
            var module = hashArr.splice(0,1),controller= hashArr[0];
            if(module && module != 'common'){
                var mainPath = "main.js";
                require([mainPath],_.bind(function(moduleMain){
                    moduleMain();
                    this.navigate(hash);
                },this))
            }
        },
        /*
        * 增加过滤器
        * @param {Object} filterName 过滤器名
        * @param {Object} filterObj 过滤器
        * @param {Object} position 添加到过滤器的位置
        * @param {Boolean} prev or next  添加到position的前面还是后面 true 为前面
        */
        addFilter : function addFilter(filterName, filterObj , position, preOrNext){
            var filterChain = this.__filterChain__, // 责任链对象 这里不使用链表，用数组标识顺序
                // 拿到责任链标识顺序的数组
                sortedName = filterChain._sortedName,
                //拿到责任链的过滤器对象
                filters = filterChain._filters,
                // 查看当前要添加的过滤器在责任链中是否存在
                filterIndex = sortedName.indexOf(filterName);
                // 尾部添加
                isAddToTail = position === sortedName.length || undefined === position;
                //从头部添加标识
                isAddToHead = position === 0;
                // 从指定位置添加
                isAddAbsolute = typeof position === "string" && sortedName.indexOf(position);
                if(filterIndex !== -1){
                    throw new FilterAreadyInChainError(filterName);
                    return ;
                }
                if(isAddToTail){
                    sortedName.push(filterName);
                    filters[filterName] = filterObj ;
                }else if(isAddToHead){
                    sortedName.unshift(filterName);
                    filters[filterName] = filterObj;
                }else if(isAddAbsolute !== -1){
                    if(preOrNext){ // true 前面添加
                        if(isAddAbsolute === 0 ){ // 如果是第一个位置
                            sortedName.unshift(filterName);
                        }else{
                            // 使用splice插入
                            sortedName.splice(isAddAbsolute-1,0,filterName);
                        }
                    }else{ // 默认添加后面
                        sortedName.splice(isAddAbsolute,0,filterName);
                    }
                    filters[filterName]=filterObj;
                }
                return this;
        },
        /*
        *删除一个过滤器
         * @param {Object} filterName 过滤器名
        */
        removeFilter:function removeFilter (filterName){
            var filterChain = this.__filterChain__, // 责任链对象 这里不使用链表，用数组标识顺序
                // 拿到责任链标识顺序的数组
                sortedName = filterChain._sortedName,
                //拿到责任链的过滤器对象
                filters = filterChain._filters,
                // 查看当前要添加的过滤器在责任链中是否存在
                filterIndex = sortedName.indexOf(filterName);
            filterIndex !== -1 && sortedName.splice(filterIndex,1);
            return this;
        },
        /*
        *解析过滤器
         * @param {Object} routeReg route 的正则表示
          * @param {Object} fragment 当前帧
          * @param {Object} args 其余的参数信息
        */
        execFilter :function execFilter(routeReg,fragment,args,filterIndex ){
            var filterChain = this.__filterChain__, // 责任链对象 这里不使用链表，用数组标识顺序
                // 拿到责任链标识顺序的数组
                sortedName = filterChain._sortedName,
                //拿到责任链的过滤器对象
                filters = filterChain._filters;
            filterIndex = filterIndex || 0;
            // 拿到责任链当前的过滤器
            var currFilter = filters[sortedName[filterIndex]];
            if(!currFilter) return ;
            if(typeof currFilter === 'object'){
                for(var i = 0 ,len = currFilter.conditions.length; i < len ; i++){
                    if(currFilter.conditions[i].test(fragment)){
                        // 调用责任链的处理方法，filter只调用一次
                        currFilter.handler(routeReg,fragment,args,filterIndex);
                        break;
                    }
                }
                if(i === len){
                    currFilter.handler(routeReg,fragment,args,filterIndex+1);
                }
            }
            return this;
        },
        OK_STATUS:"200,304,201,204",
        __filterChain__:{
            _sortedName : [],
            _filters:{

            }
        },
        /*
        *根据状态码做对应处理
         * @param {Object} statusCode
        */
        handleStatus:function(statusCode, route, fragment, args){
            var handlers = this.handleStatus.coreConfig[statusCode], isContinue = true;
            if(!handler) return ;
            for(var i = 0 ,len = handlers.length; i < len ; i++){
                if(typeof handlers[i] === 'function'){
                    isContinue  = handlers[i](route, fragment, args);
                }
                if(isContinue === false){
                    return;
                }
            }
        }

    } );
    function FilterAreadyInChainError(filterName){
        var name = "FilterAreadyInChainError",
            message = "filter 添加失败，"+filterName+ "已经存在，请先remove之后再进行添加";
        var err = new Error(message);
        err.name = name;
        err.type = "MainCore_FILTER_ERROR";
        err.level = "中";
        return err;
    }

    return MainCore;
})