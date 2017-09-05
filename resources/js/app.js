require('./setup');

window.Vue = require('vue');
window.axios = require('axios')
window._ = require('lodash')
import VueSocketio from 'vue-socket.io'
Vue.use(VueSocketio, 'http://localhost:8000')
Vue.component('example', require('./components/Example.vue'));

const app = new Vue({
    el: '#app',
    data: {
      endpoints: {
        mysubreddits: {}
      }
    },
    mounted() {
      this.getEndpoints()
    },
    methods: {
      getEndpoints() {
        axios.get('/api/mysubreddits')
        .then(res => {
          this.endpoints.mysubreddits = res.data
          // console.log(res.data);
          console.log(typeof this.endpoints.mysubreddits, this.endpoints.mysubreddits);
        })
      }
    }
});
