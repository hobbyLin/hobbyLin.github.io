//工具类函数
import Vue from 'vue';
import axios from 'axios';
import urls from '../api/urls';

axios.interceptors.response.use(function (response) {
    //在这里增加登录拦截请求
    if(response.status == '200'){
        if (response.data.responseCode == '000000' || response.data.code == '000000') {
            return response;
        } else if (response.data.responseCode == '000807' || response.data.code == '000807') {
            //'该大类已经配置\uFF0C无法删除'
            return;
        } else if (response.data.responseCode == '000811' || response.data.code == '000811') {
            //res.msg
            return;
        } else if (response.data.responseCode == '900106' || response.data.code == '900106') {
            //拦截登录
            setTimeout(function () {
                window.top.location.href = urls.login;
            }, 2000);
            return;
        } else {
            
        }
    }
  }, function (error) {

    return Promise.reject(error);
  });

export default {

    http: {
        request(options, cb){
        	if (!options.headers){
        		options.headers = {}
        	}
            if(options.method === 'GET' || options.method === 'get'){
                axios.get(options.url, { 
                    params: {
                        ...options.qs
                    }
                    // headers: options.headers 
                }).then((res) => {
                    cb(res.data)
                }).catch((err) => {
                    
                })
            }else if(options.method === 'POST' || options.method === 'post'){
                axios.post(options.url, {
                        // params: options.qs,
                        // headers: options.headers
                        ...options.qs
                    }).then((res) => {
                        cb(res.data);
                    })
                    .catch((err) => {
                        
                    })
            }
        }
    }
}