<template lang="html">

<div class="">
  <h4 :id="id"> <a :href="'#'+id"># endpoints@{{id}}({{args}})</a>
    <button @click="show = !show">Toggle</button>
  </h4>
  <p>{{description}}</p>
  <div class="cloak" v-if="show">
    <div class="invis" v-for="(value, key) in result" >
      <li>
        <span>
          <div class="prop" v-for="s in scopes"><strong>{{s}}:</strong> {{
            value[s]
          }}
        </div>
        </span>
      </li>
    </div>
  </div>
</div>

</template>

<script>
export default {
  props: ["uri", "id", "description", "scope", "args", "request"],
  data(){
    return {
      result: {},
      scopes: [],
      show: false
    }
  },
  mounted(){
    this.scopes = this.scope.split(' ')
    axios[this.request](this.uri).then(res => {
      this.result = res.data
    })
  }
}
</script>

<style lang="scss">
h4 button {
  font-size: 0.7em;
  outline: none !important;
  padding: 3px 20px;
  transform: translateY(-2px);
  margin-left: 20px;
  border-radius: 9999px;
  border: 2px solid #2196F3;
  background: transparent;
  cursor: pointer;
  color: #2196f3;
}
h4 a {
  color: #2196f3;
}
h4 a:hover, h4 button:hover {
  color: lighten(#2196f3, 10%);
  text-decoration: none;
}
.endpoints {
  padding: 20px;
  .cloak{
    background: #f2f2f2;
    min-height: 0px;
    max-height: 200px;
    display: inline-block;
    border: 1px solid;
    overflow: auto;
    padding: 10px;
  }
  .invis {
    height: 30px;
    overflow: hidden;
    li {
      list-style: none;
      overflow-x: auto;
      span {
        display: flex;
        align-items: center;
        justify-content: flex-start;
        max-width: 1000%;

        .prop {
          margin: 4px;
          padding: 2px 10px;
          font-size: 0.8em;
          max-width: 350px;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          border: 1px solid;
          background: #fff;
        }
      }
    }
  }
}

</style>
