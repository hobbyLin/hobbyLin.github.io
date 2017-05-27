import Vue from 'vue';
import MsgboxC from './msgbox.vue';

const Msgbox = Vue.extend(MsgboxC);
let instance;

export default {
    open(options = {}) {
        if (!instance) {
            instance = new Msgbox({
                el: document.createElement('div')
            });
        }
        if (instance.visible){
            return;
        }
        
        instance.text = options.text ? options.text : '';
        instance.title = options.title ? options.title : '温馨提示';

        document.body.appendChild(instance.$el);

        Vue.nextTick(() => {
            instance.visible = true;
        });
    }
};
