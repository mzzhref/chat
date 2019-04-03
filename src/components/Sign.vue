<template>
    <div>
        <h3>聊天室</h3>
        <br >
        <input type="text" v-model="name" placeholder="用户名">
        <br >
        <br >
        <input type="password" v-model="psd" placeholder="密码">
        <br >
        <br >
        <input type="password" v-model="psd_sure" placeholder="确认密码" @keyup.enter="sign">
        <br >
        <br >
        <a href="javascript:;" @click="login">去登录</a>
        <a href="javascript:;" @click="sign">注册</a>
    </div>
</template>
<script>
var vm = this;
export default {
    data() {
        return {
            name: null,
            psd: null,
            psd_sure: null,
        }
    },
    created() {
        vm = this;
    },
    methods: {
        login(){
            this.$router.push({
                path: "/"
            })
        },
        sign(){
            if(!!!vm.name || vm.name == 'null' || vm.name == 'undefined' || vm.name == 'NAN' || vm.name == '0'){
                alert('name不可为空，null，undefined，NAN，0');
                return false
            }
            if(!!!vm.psd){
                alert('请输入密码');
                return false
            }
            if(vm.psd != vm.psd_sure){
                alert('请重新确认密码');
                return false
            }
            // sign
            this.$axios.post(vm.$api.config.api.sign, vm.$qs.stringify({
                name: vm.name,
                psd: vm.psd,
                sign_time: vm.$utils.timeStamp()
            })).then(function (res) {
                console.log(res.data);
                if(res.data.status){
                    vm.login();
                }else{
                    alert(res.data.info)
                }
            }).catch(function (err) {
                console.log(err);
            });
        }
    }
}
</script>
<style scoped>
div{
    margin-top: 60px;
}
</style>

