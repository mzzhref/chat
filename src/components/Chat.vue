<template>
    <div>
        <h3>{{ name }}</h3>
        <ul id="chat">
            <li v-for="(item, index) in data" :key="index" :class="{'right': item.people_id == people_id}">
                <span>{{item.name}}</span>
                <p>{{item.content}}</p>
            </li>
        </ul>
        <div class="send">
            <input type="text" placeholder="来聊天哦" v-model="content">
            <a href="javascript:;" @click="send">send</a>
        </div>
    </div>
</template>
<script>
import io from 'socket.io-client'
var socket = io('//' + window.location.hostname + ':3000');
var vm = null;
export default {
    data() {
        return {
            people_id: null,
            name: null,
            content: null,
            data: null,
        }
    },
    created() {
        vm = this;
        vm.init();
        vm.people_id = vm.$route.query.id;
        vm.name = vm.$route.query.name;
    },
    methods: {
        boxScroll(tag){
            tag.scrollTop = tag.scrollHeight;
        },
        init(){
            this.$axios.get(vm.$api.config.api.chat).then(function (res) {
                console.log(res.data);
                if(res.data.status){
                    vm.data = res.data.result;
                    setTimeout(function(){
                        vm.boxScroll(document.getElementById("chat"));
                    }, 1)
                }else{
                    alert(res.data.info)
                }
            }).catch(function (err) {
                console.log(err);
            });
        },
        send(){
            this.$axios.post(vm.$api.config.api.chat_insert, vm.$qs.stringify({
                people_id: vm.people_id,
                name: vm.name,
                content: vm.content,
                chat_time: vm.$utils.timeStamp()
            })).then(function (res) {
                console.log(res.data);
                if(res.data.status){
                    socket.emit('chat message', {
                        people_id: vm.people_id,
                        name: vm.name,
                        content: vm.content
                    });
                    vm.data.push({
                        people_id: vm.people_id,
                        name: vm.name,
                        content: vm.content
                    })
                    setTimeout(function(){
                        vm.boxScroll(document.getElementById("chat"));
                    }, 1)
                }else{
                    alert(res.data.info)
                }
            }).catch(function (err) {
                console.log(err);
            });
        }
    },
    mounted() {
        socket.on('return message', function (msg) {
            console.log(msg)
            vm.data.push(msg)
            setTimeout(function(){
                vm.boxScroll(document.getElementById("chat"));
            }, 1)
        });
    },
}
</script>
<style scoped>
    div{
        width: 100%;
        height: 100%;
    }
    h3{
        line-height: 60px;
    }
    ul{
        width: 100%;
        height: calc(100% - 120px);
        overflow: auto;
    }
    /*滚动条样式*/
    ul::-webkit-scrollbar {/*滚动条整体样式*/
        width: 4px;     /*高宽分别对应横竖滚动条的尺寸*/
        height: 4px;
    }
    ul::-webkit-scrollbar-thumb {/*滚动条里面小方块*/
        border-radius: 5px;
        -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
        background: rgba(0,0,0,0.2);
    }
    ul::-webkit-scrollbar-track {/*滚动条里面轨道*/
        -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
        border-radius: 0;
        background: rgba(0,0,0,0.1);
    }
    li{
        list-style: none;
        line-height: 30px;
        text-align: left;
        background: #ccc;
        margin-bottom: 10px;
        padding: 4px 20px;
        width: 60%;
        float: left;
    }
    li.right{
        float: right;
    }
    span{
        color: blue;
    }
    .send{
        width: 100%;
        height: 60px;
        text-align: right;
    }
    a{
        width: 100px;
        height: 60px;
        display: inline-block;
        text-decoration: none;
        line-height: 60px;
        text-align: center;
        background: #ccc;
    }
    input{
        display: inline-block;
        height: 60px;
        width: calc(100% - 100px);
        box-sizing: border-box;
        float: left;
        outline: none;
        font-size: 30px;
        resize: none;
        padding: 0 10px;
    }
</style>

