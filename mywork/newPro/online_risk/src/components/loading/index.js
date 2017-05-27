import Vue from 'vue';
import LoadingC from './src/loading.vue';

const Loading = Vue.extend(LoadingC);
let instance;

export default {
    open(options = {}) {
        if (!instance) {
            instance = new Loading({
                el: document.createElement('div')
            });
        }
        if (instance.visible) return;
        instance.text = typeof options === 'string' ? options : options.text || '正在加载...';
        document.body.appendChild(instance.$el);

        Vue.nextTick(() => {
            instance.visible = true;
        });
    },

    close() {
        if (instance) {
            instance.visible = false;
        }
    }
};
