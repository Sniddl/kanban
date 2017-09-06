require('./setup');

window.Vue = require('vue');
window.axios = require('axios')
window._ = require('lodash')
import VueSocketio from 'vue-socket.io'
Vue.use(VueSocketio, 'http://localhost:8000')

Vue.component('example', require('./components/Example.vue'));
Vue.component('endpoint', require('./components/endpoint.vue'));

const app = new Vue({
    el: '#app',
});
