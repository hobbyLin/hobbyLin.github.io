// 获取Date对象
// @param {String} s
Date.get = function (s){
    if(!s){
        return new Date();
    }
    if(typeof s == 'date'){
        return s
    }
    if(/^\d+$/.test(s)){
        return new Date(parseInt(s));
    }
    var date = new Date(Date.parse(s));
    if(isNaN(date)){
        s = s.replace(/:/g, '-');
        s = s.replace(' ','-');
        s = s.replace('.','-');
        var arys = s.split('-');
        switch (arys.length){
            case 7 :
                date = new Date(arys[0],--arys[1],arys[2],arys[3],arys[4],arys[5],arys[6]);
                break;
            case 6 :
                date = new Date(arys[0],--arys[1],arys[2],arys[3],arys[4],arys[5]);
                break;
            default:
                date = new Date(arys[0],--arys[1],arys[2]);

        }
    }
    return date;
}

// 获取一个日期的时间戳
// @param {Date} date
Date.time = function (date){
    return Date.get(date).getTime();
}
Date.prototype.copy = function (){
    return Date.get(Date.time(this));
}

//星期几
Date.prototype.getCurWeek = function(){
    var curDay = this.getDay();
    return Date._unit[3] + Date._str.D[curDay];
}

// 使用表达式格式化日期
// @param {String} exp

Date.prototype.format = function(exp){
    if(!exp){
        return this.format('Y-m-d H:i:s');
    }
    exp = exp.toString().split('');
    var c,str='';
    for(var i = 0, len = exp.length; i < len ; i++){
        c= exp[i];
        str += (undefined !== Date._convert[c] ? Date._convert[c].call(this) : c);
    }
    return str;
}
Date._lang = 'cn';
//en or cn
Date._unit = ['年','月','日','周'];
// en or cn
Date._str = {
    F : ["January","February","March","April","May","June","July","August","September","October","November","December"],
    M : ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],
    D : ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],
    l : ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],
    a : ["am","pm"],
    A : ["AM","PM"]
};
if(Date._lang == 'en'){
    Date._str.F = ["一", "二", "三", "四", "五", "六", "七", "八", "九", "十", "十一", "十二"],
    Date._str.M = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"],
    Date._str.D = ["日", "一", "二", "三", "四", "五", "六"]
}

Date._convert = {
    //get date , zero before number less than 10.   from 01 to 31
    d : function(){
        var day = this.getDate();
        return day < 10 ? '0' + day : day;
    },
    // get day , 3 characters , form  Mon to Sun
    D : function (){
        return Date._str.D[this.getDay()];
    },
    // get date, no zero before , from 1 to 31
    j : function (){
        return this.getDate();
    },
    // get day ,full character , from Sunday to Saturday
    l : function (){
        return Date._lang == 'en' ? Date._str.l[this.getDay()]: Date._unit[3] + Date.str.D[this.getDay()]
    },
    // ISO-8601 get day , with number 1(Monday) to 7(Sunday)
    N : function (){
        var week = this.getDay();
        return (0 == week ? 7 : week )
    },
    // get day , with number 0(Sunday) to 6(Saturday)
    w : function (){
        return this.getDay();
    },
    // get day of the year , number from 0 to 366
    z : function (){
        return Math.ceil((this - new Date(this.getFullYear(),0,1))/ 86400000);
    },
    // ISO-8601 get the week of the year, week start from Monday
    W : function (){
        return Math.ceil((this - new Date(this.getFullYear(),0,1))/ 604800000);
    },
    // get full character month, from January to December
    F : function (){
        return Date._str.F[this.getMonth()];
    },
    // get month with number, zero before less than 10 ;  form 01 to 12;
    m :function (){
        var month = this.getMonth();
        month += 1;
        return (month < 10 ? '0'+ month : month);
    },
    // get Month with three character; form Jan to Dec
    M :function (){
        return Date._str.M[this.getMonth()];
    },
    // get Month with number ,from 1 to 12;
    n : function (){
        return this.getMonth()+1;
    },
    // get days of the month ;28 to 31;
    t : function (){
        var month = this.getMonth();
        month ++;
        if (month < 7){
            if(month == 2){
                return (1 == Date._convert.L.call(this) ? 29 :28);
            }else{
                return (0 == month % 2 ? 30 :31);
            }
        }else{
            return (0 == month % 2 ? 31 : 30 );
        }
    },
    // if LeapYear,get 1,otherwise 0;
    L :function (){
        var year = this.getFullYear();
        return ((0 == year % 400) || (0 == year % 4 && 0 != year % 100) ? 1 : 0)
    },
    // get full year with 4 number , like 1990 or 2003
    Y : function (){
        return this.getFullYear();
    },
    // get year with 2 number ,like 88 or 08
    y : function () {
        return this.getFullYear().toString().substring(2,4);
    },
    //lowercase am or pm
    a : function (){
        return (this.getHours()<12 ? Date._str.a[0] : Date._str.a[1]);
    },
    //upercase AM or PM
    A :function (){
        return (this.getHours() < 12 ? Date._str.A[0] : Date._str.A[1]);
    },
    // Swatch Internet : form 000 to 999
    B : function (){
        var time ,hour = this.getHours(),minutes = this.getMinutes(),seconds = this.getSeconds();
        hours  = hours * 60 * 60 * 1000;
        minutes = minutes * 60 * 1000;
        seconds = seconds * 1000;
        time = hours + minutes + seconds + this.getMilliseconds();
        time = ~~ (time / 86400);
        return time;
    },
    //get hour  from 1 to 12
    g : function (){
        var time, hour = this.getHours();
        time = hours < 13 ? hours : hours -12;
        if ( 0 == time ){
            time = 12;
        }
        return time;
    },
    //get hour  from 0 to 23;
    G : function (){
        return this.getHours();
    },
    // get hour from 01 to 12
    h : function (){
        var time, hour = this.getHours();
        time = hours < 13 ? hours : hours -12;
        if ( 0 == time ){
            time = 12;
        }
        time = time < 10 ? '0'+ time : time ;
        return time;
    },
    // get hour  from 00 to 23
    H : function (){
        var hours =  this.getHours();
        return hours < 10 ? '0'+hours : hours;
    },
    // gei minutes  from 00 to 59
    i : function (){
        var minutes = this.getMinutes();
        return minutes < 10 ? '0'+ minutes : minutes;
    },
    // get seconds from 00 to 59
    s : function (){
        var seconds = this.getSeconds();
        return seconds < 10 ? '0' + seconds : seconds;
    }
}

Date.prototype._getMaxDay = function (year, month){
    if(month < 7){
        if(month == 2){
            return (1 == ((0 == year % 400 ) || (0 == year % 4 && 0 != year % 100) ? 1 : 0) ? 29 :28);
        }else{
            return  month & 1 ? 31 : 30;
        }
    }else{
        return month & 1 ? 30 : 31;
    }
}

// 时间计算器 @ param {Number} value ,default :1   @param {String} unit, default :d
// unit format : y|m|d|h|i|s|ms

Date.prototype.addtime = function (value,unit){
    var result = null , year = this.getFullYear(), month = this.getMonth()+1;
    value = ~~value;

    switch(unit){
        case 'm':
            var newMonth = month + value;
            var oldDay = this.getDate(),newDay = this._getMaxDay(year,newMonth);
            result = Date.get(year + '-' + newMonth + '-' + (oldDay> newDay ? newDay : oldDay)).format('Y-m-d H:i:s');
            break;
        case 'y':
            result = Date.get((year + value) + '-' + month + '-' + this.getDate()).format('Y-m-d H:i:s');
            break;
        default :
            var multiple ={
                ms : 1,
                s :1000,
                i : 60000,
                h : 3600000,
                d : 86400000
            }
            // something wrong with this !!!!!
            result = this.getTime() + value * multiple[unit || 'd'];
            break;
    }
    return Date.get(result);
}
// 日期检查
// @param init  month   @param init day @param init year  @return  boolean

Date.checkdate = function (month,day,year){
    year = parseInt(year);
    month = parseInt(month);
    day = parseInt(day);
    var myDate = new Date(year,month-1,day);
    if ((MyDate.getMonth()+1 != month ) || (myDate.getDate() != day) || (myDate.getFullYear() != year))
        return false;
    else
        return true;
}