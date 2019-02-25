<template>
    <div>
        <ul>
            <li>
                <span>miao1</span>
                <p>妻子突然问丈夫：“你爱我吗？” “爱，当然爱！”丈夫毫不犹豫地回答。 妻子想了想又问：“你是不是怕伤害我才说的？” 丈夫连忙说：“不，不，我是怕你伤害我才说的</p>
            </li>
            <li>
                <span>miao2</span>
                <p>妻子突然问丈夫：“你爱我吗？” “爱，当然爱！”丈夫毫不犹豫地回答。 妻子想了想又问：“你是不是怕伤害我才说的？” 丈夫连忙说：“不，不，我是怕你伤害我才说的妻子突然问丈夫：“你爱我吗？” “爱，当然爱！”丈夫毫不犹豫地回答。 妻子想了想又问：“你是不是怕伤害我才说的？” 丈夫连忙说：“不，不，我是怕你伤害我才说的</p>
            </li>
            <li class="right">
                <span>miao</span>
                <p>妻子突然问丈夫：“你爱我吗？” “爱，当然爱！”丈夫毫不犹豫地回答。 妻子想了想又问：“你是不是怕伤害我才说的？” 丈夫连忙说：“不，不，我是怕你伤害我才说的</p>
            </li>
            <li>
                <span>miao3</span>
                <p>妻子突然问丈夫：“你爱我吗？” “爱，当然爱！”丈夫毫不犹豫地回答。 妻子想了想又问：“你是不是怕伤害我才说的？” 丈夫连忙说：“不，不，我是怕你伤害我才说的</p>
            </li>
            <li>
                <span>miao4</span>
                <p>妻子突然问丈夫：“你爱我吗？” “爱，当然爱！”丈夫毫不犹豫地回答。 妻子想了想又问：“你是不是怕伤害我才说的？” 丈夫连忙说：“不，不，我是怕你伤害我才说的</p>
            </li>
        </ul>
        <div class="send">
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
            name: null,
        }
    },
    created() {
        vm = this;
        vm.name = vm.$route.query.name;
    },
    methods: {
        send(){
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
    div{
        width: 100%;
        height: 100%;
    }
    ul{
        width: 100%;
        height: calc(100% - 160px);
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
        margin-top: 30px;
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
</style>

