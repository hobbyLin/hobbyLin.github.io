<template>
    <!-- <transition name="zntg-loading"> -->
        <div class="zntg-loading" v-show="visible">
            <div class="zntg-loading-mask">
                <div class="zntg-loading-outter">
                    <div class="zntg-loading-wrap">
                        <div class="zntg-loading-ring"></div>
                    </div>
                    <div class="zntg-loading-rect"></div>
                    <div class="zntg-loading-text">{{text}}</div>
                </div>
            </div>
        </div>
    <!-- </transition> -->
</template>
<script>
export default {
    data() {
        return {
            visible: false
        };
    },
    
    props: {
        text: {
            type: String,
            default: '正在加载...'
        }
    }
};
</script>
