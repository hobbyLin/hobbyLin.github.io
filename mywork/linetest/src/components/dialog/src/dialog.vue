<template>
    <div class="dialog-mask" v-show="visible">
        <div class="dialog-wraper">
            <div v-if="showInput" class="dialog-input-container">
                <div class="dialog-input-header" v-if="showTitle">{{ title }}</div>
                <div class="dialog-input-body">
                    <input id="inputValue" type="text" @input="changeBtnColor" :placeholder="inputPlaceholder" :value="inputValue" class="dialog-input-textbox">
                </div>
                <div class="dialog-input-btn">
                    <input class="dialog-input-btn-cancel f-c666666 dialog-b-right" type="button" @click="cancel" :value="cancelButtonText">
                    <input class="dialog-input-btn-confirm f-cdadada" id="inputConfirmBtn" type="button" @click="confirm" :value="confirmButtonText">
                </div>
            </div>
            <div class="dialog-container" v-else>
                <div class="dialog-header" v-if="showTitle">{{ title }}</div>
                <div class="dialog-body f-c666666">
                    <div>
                        <div v-if="useText" v-html="text"></div>
                        <div v-else>{{ message }}</div>
                    </div>
                </div>
                <div class="dialog-btn" v-if="showOneBtn">
                    <input type="button" class="dialog-one-btn f-cf37937" :value="oneBtnText" @click="oneBtn">
                </div>
                <div class="dialog-btn" v-else>
                    <input class="dialog-btn-cancel f-c666666 dialog-b-right" type="button" @click="cancel" :value="cancelButtonText">
                    <input class="dialog-btn-confirm f-cf37937" type="button" @click="confirm" :value="confirmButtonText">
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import DomTools from '../../../util/domTools';
export default{
	props: {
        title: {
          type: String,
          default: '温馨提示'
        },
        message: {
          type: String,
          default: ''
        },
        confirmButtonText: {
            type: String,
            default: '确定'
        },
        cancelButtonText: {
            type: String,
            default: '取消'
        },
        text: {
            type: String,
            default: ''
        }
    },
	data() {
  		return {
  			visible: false,
            showOneBtn: false,
            showTitle: true,
            showInput: false,
            useText: false
  		}
	},
	methods: {
        cancel(){
            if(this.showInput){
                let inputConfirmBtn = DomTools.$('#inputConfirmBtn');
                DomTools.setClass(inputConfirmBtn, 'dialog-input-btn-confirm f-cdadada');
            }
            this.visible = false;
            this.cancelButtonCallback();
        },
        confirm() {
            if(this.showInput){
                // let inputValue = document.querySelector('#inputValue').value;
                let inputValue = DomTools.$('#inputValue').value;
                // let inputConfirmBtn = document.querySelector('#inputConfirmBtn');
                let inputConfirmBtn = DomTools.$('#inputConfirmBtn');
                if(inputValue !== ''){
                    this.visible = false;
                    // inputConfirmBtn.setAttribute('class', 'dialog-input-btn-confirm f-cdadada');
                    DomTools.setClass(inputConfirmBtn, 'dialog-input-btn-confirm f-cdadada');
                    this.confirmButtonCallback(inputValue);
                }
            }else{
                this.visible = false;
                this.confirmButtonCallback();
            }
        },
        oneBtn() {
            this.visible = false;
            this.oneBtnCallback();
        },
        changeBtnColor(){
            // let inputValue = document.querySelector('#inputValue');
            let inputValue = DomTools.$('#inputValue');
            // let inputConfirmBtn = document.querySelector('#inputConfirmBtn');
            let inputConfirmBtn = DomTools.$('#inputConfirmBtn');
            if(inputValue.value !== ''){
                // inputConfirmBtn.setAttribute('class', 'dialog-input-btn-confirm f-cf37937');
                DomTools.setClass(inputConfirmBtn, 'dialog-input-btn-confirm f-cf37937');
            }else{
                // inputConfirmBtn.setAttribute('class', 'dialog-input-btn-confirm f-cdadada');
                DomTools.setClass(inputConfirmBtn, 'dialog-input-btn-confirm f-cdadada');
            }
        }
	},
}
</script>