import api from '../api/urls';

const ua = navigator.userAgent;

// 291001～291007
export function getForwardUrl(){
    // let a = api.onelogin;
    let prefix='',search='',hash='',param = '';
    let url = location.href;
    let urls = url.split('#');
    url = urls[0];
    hash = urls[1]?urls[1]:'';
    url = url.split('?');
    search = url[1]?url[1]:'';
    prefix = url[0];
    if(hash){
        // search加在单页hash后面如：index.html?aa&bb&cc/#/a?b&c&d
        hash = hash.split('?');
        hash = hash[0];
        param = hash[1]?hash[1]:'';
    }
    let returnUrl = prefix+(search ? '?'+ search : '' ) + (param?'&'+param:'')+hash;
    let forwardUrl = api.onelogin;
    forwardUrl = forwardUrl.split('#');
    return forwardUrl[0] + '?returnURL='+ encodeURIComponent(returnUrl)+(forwardUrl[1]?'#'+forwardUrl[1]:'');
}

// 检测是否需要replace跳转
const replaceList = ['pay.html'];
export function checkReplace(){
    let p = location.pathname;
    let a;
    if(p.length>1){
        a = p.substr(p.lastIndexOf('/')+1,p.length-1);
        if(replaceList.indexOf(a) != -1){
            return true;
        }
        return false;
    }else{
        return false;
    }
}

// 检测是否登录，此方法不能正式用，待完善。。。
export function checkLogin(cb){
    let isLogin = false;
    let cookies = aladdin.http.getCookie(location.host,'OMM',function(err,cookie){
        if(err){
            isLogin = false;
        }else{
            islogin = true;
        }
        if(typeof(cb) == 'function'){
            cb(cookie);
        }else{
            return isLogin;
        }
    });
}

// 登录
export function tryLogin(){
    // App内？
    // 是否登录
    // 未登录弹出native登录

    // App外？
    // 是否有cookie or statusCode == 291001?
    // 跑#/onelogin
    if(ua.indexOf("AladdinHybrid") != -1){
        aladdin.auth.synLogout(function(err) {
            if(err) {
                console.log("登出异常！");
                // return;
            }
            console.info("登出成功！");
            aladdin.auth.launchLogin(function(err,data){
                //待处理
                // if(err){
                //     Toastr.info(err.message || '登录失败');
                // }
                // ald.nav.forwardTo(refererUrl)
            });
        });
    }else{
        //
        if(checkReplace()){
            location.replace(getForwardUrl());
        }else{
            location.href = getForwardUrl();
        }
    }
}

export function myTryLogin(returnUrl){
    if(ua.indexOf("AladdinHybrid") != -1){
        aladdin.auth.synLogout((err)=>{
            if(err) {
                return;
            }
            // 退出成功，再唤起登录
            aladdin.auth.launchLogin((err, data) => {
                if (err) {
                    return;
                }
                if (data.state + '' === '0') {
                    location.replace(returnUrl);
                    return;
                } else if (data.state + '' === '1') {
                    
                }
            })
        })
    } else {
        let forwardUrl = api.onelogin;
        forwardUrl = forwardUrl.split('#');
        forwardUrl = `${forwardUrl[0]}?returnURL=${encodeURIComponent(returnUrl)}${(forwardUrl[1]?'#'+forwardUrl[1]:'')}`;
        location.replace(forwardUrl);
    }
}

// 检测处理邦卡
export function checkCard(){
    //
}

// 检测身份验证
export function checkAuth(){
    //
}
