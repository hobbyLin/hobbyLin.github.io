# 口袋银行理财模块

## 目录分解
* common是基础样式，独立生成common.css文件
* components是组件样式文件，需要用到的页面在样式文件里面import进去。如现金宝页面：

    ```scss
    /*
     * 现金宝
    */
    @import "../common/variables";
    @import "../components/card-chart";

    ```
* modules是每个样式文件[`为支持风格化，只使用一套代码，减少维护量`]
* theme是风格样式文件，一种风格一个文件夹，风格文件夹目录如下：
    * `_var.scss` - 风格定义常量，将会覆盖`common/_variables.scss`
    * `common.scss` - 公共样式文件，使用如下格式定义
        ```scss
        /*
         * common
        */
        @import "../../common/variables";

        // 重新定义风格文件
        @import "./var";

        @import "../../modules/common";

        ```
    * index.scss - 首页样式文件，格式定义如下：
        ```scss
        /*
         * 现金宝
        */
        @import "../../common/variables";

        // 重新定义风格文件
        @import "./var";

        @import "../../modules/xjb";

        ```
    * ...
* 风格文件将会编译成如下文件：
    * css
        * blue
            * common.css
            * detail.css
            * index.css
        * default
            * common.css
            * detail.css
            * index.css
        * ...
* 不需要编译成独立css文件的scss文件，以下划线`_`开始命名
* 图片放置在`assets/images`文件夹
* ...


##  代码规范
    * 命名简洁扼要，遵循一下通用规范：
        * 按钮： btn-[颜色、大小、样式、模块等] 如：btn-lg | btn-primary | btn-block
        * 图标： icon-[语义] 如：icon-close | icon-search
            * icon使用`:before`伪类定义背景图片或SVG或iconfont:
                ```scss
                .icon-more:before{
                    background-image: url("#{$image-path}/common/icon-more.svg");
                }

                ```
            * 使用时组合连个class使用，如:
                ```html
                更多<i class="icon icon-more"></i>

                ```
            * ...
        * 间距：mt10 mt20 mt25 mt30 mt40
        * 字体大小：f-[测量值] 如： f-24 f-26 f-28 f-30 f-32 f-34
        * 颜色：c-[颜色名称] 如：c-primary c-gray c-dgray ...
        * ...
    * 代码外面定义 icon 大小
    * 通用样式通过组合搭配使用，个性化样式尽量页面自定义
    * 间距最后使用padding或margin实现，拒绝使用行高设置间距，这样字体超出的时候折行布局不会乱
    * 行高使用倍数，如`line-height:1.5` 即字体大小的1.5倍行高，拒绝使用rem或px单位
    * ...
    * ...


## 为充分利用浏览器`缓存友好性`，项目css文件拆分为如下：
  * `common.scss` 重置样式，基本不变
  <!-- * `[page].scss` 页面样式，改版较多。如：finance_index.scss -->
  * `style.scss` 合并为一个文件



## 开始制作
### 如何引入scss样式文件：
  * 案例：（入口文件`index.js` import）
  ```js
      import '../../assets/scss/common';
      import '../../assets/scss/ext/swiper';
      import '../../assets/scss/finance_index';
  ```
  * 其中，`common`是必须引入文件

### 页面样式文件`[page].scss`需要引用常量文件
  * 案例：
  ```css
      @import "base/variable";
  ```

### 可复用组件抽取到`components`文件夹下，一个组件一个样式文件，需要调用的页面样式文件里import进去
  * 案例：
  ```css
      @import "components/card";
  ```

### 公共图标在`_icon.scss`定义
  * 案例：
  ```css
      .icon-arrow:before{
          background-image: url("#{$image-path}/common/arrow-right.svg");
      }
  ```

  * 使用：
  ```html
    <i class="icon icon-arrow"></i>
  ```

### 图片路径用`$image-path`匹配

### 样式只需按照标准的写法
  * 案例：
  ```css
  .Catalog {
      background: #fff;
      width: 100%;
      height: 0.7rem;
      line-height: 0.7rem;
      border: 1px solid #e7e7e7;
      box-sizing: border-box;
  }
  ```
  * 其中，box-sizing不需要写多个前缀



## 风格化
 * 服务端处理，客户端输出几套theme
