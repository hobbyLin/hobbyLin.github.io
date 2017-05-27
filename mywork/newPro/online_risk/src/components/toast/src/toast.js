import Vue from 'vue';
import ToastC from './toast.vue';

const ToastConstructor = Vue.extend(ToastC);
let instance;

ToastConstructor.prototype.close = function() {
    this.visible = false;
    this.closed = true;
};

export default {
    info(options = {}){
        let duration = options.duration || 2000;
        if (!instance) {
            instance = new ToastConstructor({
                el: document.createElement('div')
            });
        }
        instance.closed = false;
        clearTimeout(instance.timer);
        instance.message = typeof options === 'string' ? options : options.message;
        instance.position = options.position || 'middle';

        document.body.appendChild(instance.$el);
        Vue.nextTick(function() {
            instance.visible = true;
            //instance.$el.removeEventListener('transitionend', removeDom);
            ~duration && (instance.timer = setTimeout(function() {
                if (instance.closed){
                    return;
                }
                instance.close();
            }, duration));
        });
    }
}