<template>
    <div>
        <h3>聊天室</h3>
        <input type="text" v-model="name" placeholder="用户名">
        <br >
        <br >
        <input type="text" v-model="psd" placeholder="密码">
        <br >
        <br >
        <a href="javascript:;" @click="login">login</a>
        <a href="javascript:;" @click="sign">sign</a>
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
            // 新增
            this.$axios.post(vm.$api.config.api.login, vm.$qs.stringify({
                name: vm.name,
                psd: vm.psd
            })).then(function (res) {
                console.log(res.data);
            }).catch(function (err) {
                console.log(err);
            });
        },
        sign(){
            this.$router.push({
                path: "/sign"
            })
        }
    }
}
</script>
<style scoped>

</style>
