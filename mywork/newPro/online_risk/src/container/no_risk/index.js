import '../../util/common';

import Vue from 'vue'
import app from './index.vue'
import '../../assets/scss/theme/default/common';
import '../../assets/scss/theme/default/style';

new Vue({
    el: '#app',
    render: h => h(app)
})
