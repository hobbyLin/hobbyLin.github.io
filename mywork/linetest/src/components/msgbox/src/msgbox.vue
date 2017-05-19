<template>
	<div class="modal-mask" v-show="visible">
        <div class="modal-wrapper">
            <div class="modal-container">
                <h3 class="modal-header">{{ title }}</h3>
                <div class="modal-body" v-html="text">
                </div><i class="modal-close" @click="close"></i></div>
        </div>
    </div>
</template>
<script>
export default{
	props: {
        title: {
          type: String,
          default: '温馨提示'
        },
        text: {
          type: String,
          default: ''
        }
    },
	data() {
  		return {
  			visible: false,
  		}
	},
	methods: {
        close(){
            this.visible = false;
        }
	},
}
</script>