require('./setup');

window.Vue = require('vue');
window.axios = require('axios')
window._ = require('lodash')
import VueSocketio from 'vue-socket.io'
Vue.use(VueSocketio, 'http://localhost:8000')

Vue.component('example', require('./components/Example.vue'));
Vue.component('endpoint', require('./components/endpoint.vue'));

// UI
Vue.component('ui-hero', require('./components/ui/hero.vue'));
Vue.component('ui-menu', require('./components/ui/menu.vue'));
Vue.component('ui-nav', require('./components/ui/nav.vue'));

const app = new Vue({
    el: '#app',
});
