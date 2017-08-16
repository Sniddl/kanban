require('./setup');

window.Vue = require('vue');

import VueSocketio from 'vue-socket.io'
Vue.use(VueSocketio, 'http://localhost:8000')
Vue.component('example', require('./components/example.vue'));

const app = new Vue({
    el: '#app'
});
