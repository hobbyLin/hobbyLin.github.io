/**
* Created by EX_WLJR_YANLIHUI on 2017/05/03
* 开心每一天！
**/

//mock数据模拟

module.exports =  function(){
    return [
        {'method':'get','name':'querySettingList','path':'/admin/querySettingList'},
        {'method':'get','name':'addSetting','path':'/admin/addSetting'},
        {'method':'get','name':'updateSetting','path':'/admin/updateSetting'},
        {'method':'get','name':'querySetting','path':'/admin/querySetting'}
    ];
}