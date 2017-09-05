<template>
   <div class="Example" ref="mainEl">
    <button @click="logToServer">Log on server</button>
    <button @click="logToClient">Log on client</button>
    <h4>About:</h4>
    <p>Each component can be in it's own scope. It's almost like writing object oriented html/css. Open the <pre>resources/js/component/example.vue </pre> file to check it out!</p>
  </div>
</template>

<script>
    export default {
        props: [],
        data () {
          return {
            mycolor: ''
          }
        },
        mounted() {
          // run this code when the component is completly loaded
          this.$refs.mainEl.style.background = this.randomHex()
        },
        methods: {
          randomHex: function () {
            return `hsl(${_.random(0,359)}, 64%, ${_.random(64,75)}%)`
          },
          logToClient() {
            console.log(`this components id is ${this._uid}`);
          },

          logToServer() {
            axios.post('/api/example', {
              id: this._uid,
              message: 'hello server!'
            })
            .then((response) => {
              console.log(response.data)
            })
          }
        }
    }
</script>

<style media="screen" scoped>
  .Example {
    width: 300px;
    border: 1px solid;
    padding: 20px;
    margin: 10px;
    display: inline-block;
  }
  button {
    background: rgba(255,255,255,0.4);
    border: 1px solid ;
    outline: none;
    border-radius: none;
    padding: 4px 20px;
    display: block;
    margin: 10px 0;
  }
  h4{
    font-family: cursive;
    border-bottom: 1px dashed;
    padding-top: 20px;
    margin-bottom: 10px;
  }
  p {
    font-family: sans-serif;
  }
  pre {
    display: inline-block;
    margin: 0;
    background: rgba(0,0,0,0.25);
    font-family: monospace;
    color: white
  }
</style>
