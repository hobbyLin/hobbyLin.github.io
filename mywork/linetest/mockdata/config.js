module.exports =  function(){
    return [
    	//yuan start
    	{'name':'queryRemoteRiskInfo','path':'/bron/ibank/cust/bron-ibank-pd/rrs/risk/queryRemoteRiskInfo.do'},
    	//yuan end

        ////验证短信接口
        {'name':'sendSms','path':'/bron/ibank/cust/bron-ibank-pd/rrs/sms/sendSms.do'},
        ////发送短信接口
        {'name':'verifySms','path':'/bron/ibank/cust/bron-ibank-pd/rrs/sms/verifySms.do'},
        ////影像上传接口
        {'name':'upload','path':'/bron/ibank/cust/bron-ibank-pd/rrs/image/upload.do'},
        //查询预约号业务员信息
        {'name':'queryCustInfo','path':'/bron/ibank/cust/bron-ibank-pd/rrs/risk/queryCustInfo.do'},
        //变更业务员接口
        {'name':'chgBusinessmanInfo','path':'/bron/ibank/cust/bron-ibank-pd/rrs/busiman/chgBusinessmanInfo.do'}
    ];
}