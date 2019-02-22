<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <input type="text" v-model="name">
    <input type="text" v-model="txt">
    <a href="javascript:;" @click="submitFn()">发送</a>
  </div>
</template>

<script>
import io from 'socket.io-client'
var socket = io('http://172.10.180.32:2223');
var vm = null;
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      txt: null,
      vm: null,
      name: null,
    }
  },
  created() {
    vm = this;
  },
  methods: {
    submitFn(){
      socket.emit('chat message', {
        name: vm.name,
        txt: vm.txt
      });
    }
  },
  mounted() {
    socket.on('return message', function (msg) {
      console.log('message: ' + JSON.stringify(msg));
      vm.msg = msg.name +':'+ msg.txt;
    });
  },
}
</script>

<style scoped>

</style>
