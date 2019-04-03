<template>
    <div>
        <h3>聊天室</h3>
        <br >
        <input type="text" v-model="name" placeholder="用户名">
        <br >
        <br >
        <input type="password" v-model="psd" placeholder="密码" @keyup.enter="login">
        <br >
        <br >
        <a href="javascript:;" @click="login">登录</a>
        <a href="javascript:;" @click="sign">去注册</a>
    </div>
</template>
<script>
var vm = null;
export default {
    data() {
        return {
            name: null,
            psd: null,
        }
    },
    created() {
        vm = this;
    },
    methods: {
        login(){
            if(!!!vm.name || vm.name == 'null' || vm.name == 'undefined' || vm.name == 'NAN' || vm.name == '0'){
                alert('name不可为空，null，undefined，NAN，0');
                return false
            }
            if(!!!vm.psd){
                alert('请输入密码');
                return false
            }
            // login
            this.$axios.post(vm.$api.config.api.login, vm.$qs.stringify({
                name: vm.name,
                psd: vm.psd,
                login_time: vm.$utils.timeStamp()
            })).then(function (res) {
                console.log(res.data);
                if(res.data.status){
                    vm.chat(res.data.result[0].id, res.data.result[0].name);
                }else{
                    alert(res.data.info)
                }
            }).catch(function (err) {
                console.log(err);
            });
        },
        sign(){
            this.$router.push({
                path: "/sign",
                
            })
        },
        chat(id, name){
            this.$router.push({
                path: "/chat",
                query: {
                    id: id,
                    name: name
                }
            })
        }
    }
}
</script>
<style scoped>
div{
    margin-top: 60px;
}
</style>
