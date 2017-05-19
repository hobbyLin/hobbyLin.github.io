# 口袋银行理财模块

## 快速开始

### 安装依赖包，推荐使用yarn
```
yarn
```
### 快速启动web
```
npm start（npm run serve）
```

### 编译 stg 环境 web包
```
npm run stg:web
```
### 编译 stg 环境 native包(本项目暂未使用)
```
npm run stg:native
```

### 编译 prd 环境 web包
```
npm run prd:web
```
### 编译 prd 环境 native包(本项目暂未使用)
```
npm run prd:native
```


## 开发规范
 * 通用组件放components
 * 页面以文件夹形式存放于container目录下，一个page一个目录
 * 每个页面的文件夹需包含入口文件(`index.js`)、页面模版(`index.html`)，程序会自动扫描container目录下的文件夹`index.js`进行程序打包合并
 * index.html的css和js从入口文件`index.js`引入
 * 兼容普通写法和ES6写法
 * 应用自动支持`sessionStorage`或`localStorage`存储方案，可在页面或组件中进行数据共享

## 开发快速开始
 * **三个必备文件**：
  * [页面文件夹]/index.js
  * [页面文件夹]/index.html
  * scss/theme/[default]/[页面文件夹同名].scss (index.js要引入此文件)
* index.js需要引入必备的scss文件
  * scss/theme/[default]/common.scss
  * scss/theme/[default]/[页面文件夹同名].scss


## 代码规范
 1、 请求后端接口和第三方页面跳转url统一放 **api/urls.js** 维护.
   * 后端接口放
      ```javascript
      //---------------------- API 接口开始 -----------------------
      ...
      //---------------------- API 接口结束 -----------------------
      ```
   
   * 口袋native跳转url放下面之间.

      ```javascript
      //------------------- 前端跳转口袋2.0App地址 开始 ---------------
      ...
      //------------------- 前端跳转口袋2.0App地址 结束 ---------------
      ```
   
   * h5跳转url放下面之间

      ```javascript
      //---------------------- 前端跳转H5地址 开始 -----------------------
      ...
      
      ```

## 版本管理
   * 稳定版本分支是master分支
   * 版本开发的时候，从master拉取稳定版本代码，并开辟新的开发分支，进行下一版本开发或修复，分支命名如下：
       * `feature/yymmdd`
       * `hotfix/yymmdd`
   * 发版上线稳定后，合并开发分支到master，并打上tag（prd/yymmdd,prd/hotfix/yymmdd）
   

## 参考文档
 * aladdin: http://10.20.20.177/wiki/wiki/index.html
 * vuejs: https://vuejs.org
 * vuex: http://vuex.vuejs.org
 * vue-router: http://router.vuejs.org/zh-cn/
