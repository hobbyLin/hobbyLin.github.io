# mockdata配置使用说明 

---

### 配置文件
1. 填写config.js配置文件，一个接口对应一条数据。
2. 例如添加一条登陆区外查询方案详情。
```
    //登陆区外查询方案详情
    {
        'method':'get', //暂无作用，默认支持get/post
        'name':'qrySchemeByIdUnSign', //api文件夹中的mock数据文件名
        'path':'/brop/pop/cust/brop_pop.iia-core-server.qrySchemeByIdUnSign',//服务端接口路径(除去域名)
    }

```
