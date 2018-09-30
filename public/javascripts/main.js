'use strict';

import Vue from 'vue';

import axios from 'axios';
axios.defaults.headers.common = {
    "X-Requested-With": "XMLHttpRequest",
    'Content-Type': 'form-data'
};


import App from './app';

Vue.prototype.$http = axios;

import VModal from 'vue-js-modal';

Vue.use(VModal);

import VeeValidate from 'vee-validate';

Vue.use(VeeValidate);

import FlagIcon from 'vue-flag-icon'

Vue.use(FlagIcon);

import VueClipboard from 'vue-clipboard2'

Vue.use(VueClipboard);
require('vue-animate/dist/vue-animate.min.css');

Vue.use(require('vue-moment'));

/*import methods from './mixins/methods.js';*/
import store from './store';
import router from './router';

new Vue({
    router,
    store,
    //mixins: [methods],
    el: '#app',
    components: {App}
});