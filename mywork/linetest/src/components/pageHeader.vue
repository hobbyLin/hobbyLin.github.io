<template>
    <div class="main-header">
        <div class="main-header-wrap">
            <div class="main-header-left" @click="leftBtn">
                <!-- <img src="../assets/images/common/icon-back.svg" alt="" width="150%" height="100%"> -->
            </div>
            <div class="main-header-content">
                <p class="main-header-title">{{ config.title }}</p>
            </div>
            <div class="main-header-right" @click="rightBtn">
                <slot></slot>
            </div>
        </div>
    </div>
</template>

<script>
import * as ald from "../util/ald";
    export default{
        props: {
            config: {
                type: Object,
                default: {
                    title: '',
                    leftButtonCallback: () => {
                    },
                    
                }
            }
        },
        data(){
            return{

            }
        },
        methods: {
            leftBtn(){
                if(this.config.leftButtonCallback == undefined){
                    ald.nav.back();
                } else {
                    this.config.leftButtonCallback();
                }
            },
            rightBtn(){
                
            }
        }
    }
</script>