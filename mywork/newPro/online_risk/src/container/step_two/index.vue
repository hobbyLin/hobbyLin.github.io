<template>
    <div class="step-two">
        <hd :config="config"></hd>
        <div class="step-box step-two1">
            <dl>
                <dt><i></i></dt>
                <dd>校验业务员</dd>
            </dl>
            <dl>
                <dt><i></i></dt>
                <dd>上传身份证</dd>
            </dl>
            <dl>
                <dt><i></i></dt>
                <dd>视频认证</dd>
            </dl>
            <dl>
                <dt><i></i></dt>
                <dd>完成</dd>
            </dl>
        </div>
        <div class="step-two-text1 f-c666666">请上传有效二代身份证正反面</div>
        <div class="step-two-imgpic">
        <div class="step-two-emty1"></div>
            <input type="file" id="choose_face" accept="image/*" class="step-two-choose" @change="readFile('face')" />
            <div id="img_face" class="step-two-face">
                <img src="../../assets/images/pictures/identity_face.png" />
            </div>
            <div class="step-two-text2 f-c6c7684" id="face-text">点击上传身份证人像面</div>
            <div class="step-two-emty2"></div>
        </div>
        <div class="step-two-imgpic" style="margin-top: .22rem;">
                <div class="step-two-emty1"></div>
            <input type="file" id="choose_back" accept="image/*" class="step-two-choose" @change="readFile('back')"/>
            <div id="img_back" class="step-two-back">
                <img src="../../assets/images/pictures/identity_back.png" alt="" />
            </div>
            <div class="step-two-text2 f-c6c7684" id="back-text">点击上传身份证国徽面</div>
            <div class="step-two-emty2"></div>
        </div>
        <div class="step-two-example f-c666666">拍摄示例</div>
        <div class="step-two-notice">
            <img src="../../assets/images/pictures/upload_identity_notice.png" width="100%" alt="">
        </div>
        <div class="step-two-emty"></div>
        <div class="step-two-btn" @click="toSuccess">
            <div :class="{'step-two-gray-btn': !activeBtn, 'step-two-orange-btn': activeBtn}" id="stepTwoBtn">确认上传</div>
        </div>
    </div>
</template>

<script>
    import EXIF from "exif-js";
    import * as ald from '../../util/ald';
    import apis from '../../api/urls';
    import Toast from '../../components/toast/index';
    import service from '../../api/services';
    import hd from '../../components/pageHeader';
    export default {
        components: {
            hd
        },
        data () {
            return {
                activeBtn: false,
                Orientation: 1,
                direction: 'face',
                faceImgInformation: {},
                backImginformation: {},
                config: {
                    title: '远程视频身份认证'
                }
            }
        },
        created () {
            
        },
        // mounted () {
        //     ald.header.config({
        //         title: '远程视频身份认证',
        //         leftButtonCallback: () => {
        //             ald.nav.back();
        //         },
        //         rightButtonVisible: false,
        //         rightButtonCallback: () => {

        //         }
        //     })
        // },
        methods: {
            $(selector) {
                return document.querySelector(selector);
            },
            changeBtnColor(){
                if(this.faceImgInformation.result !== undefined && this.backImginformation.result !== undefined){
                    this.activeBtn = true
                }
            },
            readFile (dict) {
                this.direction = dict;
                // let chooseArray = this.$('#choose');
                let chooseArray = this.$(`#choose_${this.direction}`);
                if (!chooseArray.files.length){
                    return;
                }
                let file = chooseArray.files[0];//取第一张图片
                let fileSize = file.size;//上传图片字节数
                if (fileSize > 5 * 1048576) {
                    Toast.info('图片太大，无法上传，请选择小于5M的图片！');
                    return;
                }
                //检测你上传的是否为图片
                if (!/image\/\w+/.test(file.type)) return;
                let reader = new FileReader();
                EXIF.getData(file, () => {   
                    EXIF.getAllTags(file);     
                    this.Orientation = EXIF.getTag(file, 'Orientation');
                });
                reader.readAsDataURL(file);
                reader.onload = () => {
                    //result为二进制
                    let result = reader.result;
                    let img = new Image();
                    img.src = result;
                    //如果图片大小小于200kb，则直接上传
                    if (fileSize <= 200 * 1024) {
                        img = null;
                        this.$(`#img_${this.direction}`).innerHTML = `<img src="${result}"/>`;
                        this.$(`.step-two-${this.direction}`).setAttribute('class', `pic-box step-two-${this.direction}`);
                        this.$(`#${this.direction}-text`).innerText = ' ';
                        if(dict === 'face'){
                            this.faceImgInformation = {
                                result,
                                type: file.type
                            }
                        }else{
                            this.backImginformation = {
                                result,
                                type: file.type
                            }
                        }
                        this.changeBtnColor();
                        return;
                    }

                    let callback = () => {
                        let data = this.compress(img);
                        if(dict === 'face'){
                            this.faceImgInformation = {
                                result: data,
                                type: file.type
                            }
                        }else{
                            this.backImginformation = {
                                result: data,
                                type: file.type
                            }
                        }
                        this.changeBtnColor();
                        img = null;
                    }
                    //图片加载完毕之后进行压缩，然后上传
                    if (img.complete) {
                        callback();
                    } else {
                        img.onload = callback;
                    }

                }
            },

            //压缩图片
            compress (img) {
                let [initSize, width, height, ratio] = [img.src.length, img.width, img.height];
                let canvas = document.createElement("canvas");
                let ctx = canvas.getContext('2d');
                let expectWidth, expectHeight;
                if (width > height && width > 800) {  
                    expectWidth = 800;  
                    expectHeight = expectWidth * height / width;  
                } else if (height > width && height > 600) {  
                    expectHeight = 600;  
                    expectWidth = expectHeight * width / height;  
                }

                canvas.width = expectWidth;
                canvas.height = expectHeight;
                //铺底色
                ctx.fillStyle = "#fff";
                // context.fillRect(x,y,width,height);
                // x    矩形左上角的 x 坐标
                // y    矩形左上角的 y 坐标
                // width    矩形的宽度，以像素计
                // height   矩形的高度，以像素计
                ctx.fillRect(0, 0, expectWidth, expectHeight);
                //context.drawImage(img,x,y,width,height);
                //img   规定要使用的图像、画布或视频。
                //x 在画布上放置图像的 x 坐标位置。
                //y 在画布上放置图像的 y 坐标位置。
                //width 可选。要使用的图像的宽度。（伸展或缩小图像）
                //height    可选。要使用的图像的高度。（伸展或缩小图像)
                ctx.drawImage(img, 0, 0, expectWidth, expectHeight);
                //解决各个手机压缩图片旋转的bug
                if(this.Orientation != "" && this.Orientation != 1){    
                    switch(this.Orientation){  
                        case 6://需要顺时针（向左）90度旋转   
                            this.rotateImg(img, 'left', canvas, '90');  
                            break;  
                        case 8://需要逆时针（向右）90度旋转   
                            this.rotateImg(img, 'right', canvas, '90');
                            break;  
                        case 3://需要180度旋转  
                            this.rotateImg(img, 'right', canvas, '180');//转两次
                            break; 
                        default:
                            break; 
                    }         
                }     
                let ndata
                if (navigator.userAgent.match(/iphone|ipad|ipod/i)) {
                    ndata = canvas.toDataURL('image/jpeg', 0.1);
                } else {
                    ndata = canvas.toDataURL('image/jpeg', 0.6);
                }
                this.$(`#img_${this.direction}`).innerHTML = `<img src="${ndata}"/>`;
                this.$(`.step-two-${this.direction}`).setAttribute('class', `pic-box step-two-${this.direction}`);
                this.$(`#${this.direction}-text`).innerText = ' ';
                //将宽高还原
                canvas.width = canvas.height = 0;
                return ndata;
            },

            //图片上传，将base64的图片转成二进制对象，塞进formdata上传
            upload (basestr, type) {
                let imgInformation = [this.faceImgInformation, this.backImginformation];
                let formdata = new FormData();
                for(let i=0;i<imgInformation.length;i++){
                     let basestr = imgInformation[i].result, 
                        type = imgInformation[i].type;
                    let text = window.atob(basestr.split(",")[1]);
                    let buffer = new ArrayBuffer(text.length);
                    let ubuffer = new Uint8Array(buffer);
                    // let pecent = 0; 
                    // let loop = null;
                    for (let i = 0; i < text.length; i++) {
                        ubuffer[i] = text.charCodeAt(i);
                    }
                    let Builder = window.WebKitBlobBuilder || window.MozBlobBuilder;
                    let blob;
                    if (Builder) {
                        let builder = new Builder();
                        builder.append(buffer);
                        blob = builder.getBlob(type);
                    } else {
                        blob = new window.Blob([buffer], {type: type});
                    }
                    if(i == 0){
                        formdata.append('imageFace', blob, 'imageFace.jpeg');
                    } else if(i == 1){
                        formdata.append('imageBack', blob, 'imageBack.jpeg');
                    }
                }
                service.upload(formdata).then((data) => {
                    ald.nav.forward({
                        url: `${apis.innerStatic}upload_result.html`
                    });
                }, (error) => {
                    
                })
            },
            //对图片旋转处理
            rotateImg (img, direction, canvas, degree) {    
                if (img == null)return;    
                //img的高度和宽度不能在img元素隐藏后获取，否则会出错    
                let height = img.height;    
                let width = img.width;
                let step = parseInt(degree / 90);
                degree = degree * Math.PI / 180;  
                let ctx = canvas.getContext('2d');    
                switch (step) {
                    case 0:    
                        canvas.width = width;    
                        canvas.height = height;    
                        ctx.drawImage(img, 0, 0);    
                        break;    
                    case 1:    
                        canvas.width = height;    
                        canvas.height = width;    
                        ctx.rotate(degree);    
                        ctx.drawImage(img, 0, -height);    
                        break;    
                    case 2:    
                        canvas.width = width;    
                        canvas.height = height;    
                        ctx.rotate(degree);    
                        ctx.drawImage(img, -width, -height);    
                        break;    
                    case 3:    
                        canvas.width = height;    
                        canvas.height = width;    
                        ctx.rotate(degree);    
                        ctx.drawImage(img, -width, 0);    
                        break;    
                }    
            },
            toSuccess(){
                if(this.faceImgInformation.result == undefined){
                    Toast.info('未上传身份证正面');
                    return;
                }else if(this.backImginformation.result == undefined){
                    Toast.info('未上传身份证反面');
                    return;
                }
                this.upload();
            } 
        }
    }
</script>
