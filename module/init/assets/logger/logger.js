/**
 * Created by Administrator on 2017/2/28.
 */
define(['helper/date'],function(){
    var emptyFn = function (){

    };
    //存放错误
   var  nowErrMsg = {};
    if(!window.console){
        window.console = {
            log : emptyFn,
            error :emptyFn,
            info :emptyFn,
            debug :emptyFn,
            warn : emptyFn,
            assert :emptyFn
        }
    }

    function Logger(options){
        var self = this;

        var _globalErrorHandler = window.onerror || emptyFn;
        window.onerror = function(msg,url,line ){
            try{
                _globalErrorHandler(msg,url,line);
                nowErrMsg['errInfo'] = msg + '';
                nowErrMsg['lineNumber']=line;
                throw new Error('logger' + msg + ' ' + url + ':' + line);
            }catch(error){
                logger.e('logger',error.stack);
            }
        }

        var _globalUnloadHandler = window.onbeforeunload || emptyFn;
        window.onbeforeunload = function(e){
            _globalUnloadHandler(e);
            if(!!self.userDefineLogHandler){
                self.userDefineLogHandler(self.logQueue);
            }else{
                self.sendLogToServer();
            }
        };
        this.setCnf(options || {});

    }

    Logger.prototype = {
        constructor : Logger,
        VERBOSE : 0,
        DEBUG : 1,
        ASSERT:2,
        INFO : 3,
        WARN : 4,
        ERROR : 5,
        level : 3, // 默认日志级别INFO
        LABELS :['VERBOSE','DEBUG','ASSERT','INFO','WARN','ERROR'],
        CLIENT_LOG_TYPES:{VERBOSE:'log',DEBUG:'debug',ASSERT:'assert',INFO:'info',WARN:'warn',ERROR:'error'},
        logServer:false,
        userDefineLogHandler: null,
        logQueue:[],
        maxLogCache:5,
        log:function (level,info){ // 向日志列队添加日志
            var fullLogInfo = {
                modulName : 'URI：'+ location.pathname + location.hash,
                time:(new Date()).format('Y/m/d'),
                level : this.LABELS[level],
                info :[].slice.call(info,0).join('') + "调用堆栈：\n" + (new Error).stack.split("\n").slice(4,9).join("\n")
            };
            if(level == 5){
                var infoArr = fullLogInfo['info'].split('/app/'),
                    length = infoArr.length,
                    modelStr = 'app/';
                if(length == 1){
                    infoArr = fullLogInfo['info'].split('/init/');
                    modelStr = 'init/';
                }
                var fileName = modelStr +  infoArr[1].split(':')[0];
                nowErrMsg['fileName'] = fileName;
                nowErrMsg['time'] = fullLogInfo['time'];
                App.getFromLocal(['login-PaMobileBizUserName'],_.bind(function(results){
                    nowErrMsg['um'] = results['login-PaMobileBizUserName'];
                    var model = 'init';
                    if(modelStr.indexOf('app') > -1){
                        model = fileName.split('/')[1];
                    }
                    App.getVersion(model,_.bind(function(version){
                        nowErrMsg['version'] = version;
                        App.uploadErrorInfo(nowErrMsg);
                    },this));

                },this));
            }
            this.consoleLog(fullLogInfo);
            this.logQueue.push(fullLogInfo);
            if(this.logQueue.length >= this.maxLogCache || this[fullLogInfo.level] >= this['ERROR']){
                if(!!this.userDefineLogHandler){
                    this.userDefineLogHandler(this.logQueue);
                }else{
                    this.sendLogToServer();
                }
            }

        },
        switchServer:function (logServer){ // 切换服务器
            this.logServer = logServer;
        },
        v:function(){  // 写verbose级别的日志
            this.level <= this.VERBOSE && this.log(this.VERBOSE,arguments);
        },
        d: function (){ // 写debug级别的日志
            this.level <= this.DEBUG && this.log(this.DEBUG,arguments);
        },
        a:function(){  // 写assert级别的日志
            this.level <= this.ASSERT && this.log(this.ASSERT,arguments);
        },
        i:function(){ // 写info级别的日志
            this.level <= this.INFO && this.log(this.INFO,arguments);
        },
        w:function(){ // 写warn级别的日志
            this.level <= this.WARN && this.log(this.WARN,arguments);
        },
        e : function (){ // 写error级别的日志
            this.level <=  this.ERROR && this.log(this.ERROR,arguments);
        },
        setCnf : function(options){ // 修改日志对象配置
            var fields = this.constructor.prototype;
            for(var key in options){
                fields.hasOwnProperty(key) && key !== 'constructor' && (this[key] = options[key]);
            }
        },
        sendLogToServer : function (){ // 将客户端日志发送到服务器
            var self = this, loggers = self.logQueue;
            self.logServer && $.ajax({
                url : self.logServer,
                data:{logs : JSON.stringify(loggers), userAgent : navigator.userAgent},
                type:'POST',
                success: function(data){
                    self.logQueue = [];
                },
                error :function(xhr){  // 发送日志到服务器时发送错误
                    self.maxLogCache += 2  // 将缓存区长度再增加2，纪录本次发送日志失败信息
                    logger.e('Logger',xhr);
                }
            })
        },
        consoleLog: function(fullLogInfo){ // 将客户端日志打印到控制台
            console.log("ddd")
            console[this.CLIENT_LOG_TYPES[fullLogInfo.level]]('Logger',fullLogInfo.level,fullLogInfo.time,fullLogInfo.modulName,fullLogInfo.info,"\n");
        }
    }
    var logger = window.logger = new Logger();
    return logger;
})