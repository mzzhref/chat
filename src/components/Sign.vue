<template>
    <div>
        <h3>聊天室</h3>
        <input type="text" v-model="name" placeholder="用户名">
        <br >
        <br >
        <input type="text" v-model="psd" placeholder="密码">
        <br >
        <br >
        <input type="text" v-model="psd_sure" placeholder="确认密码">
        <br >
        <br >
        <a href="javascript:;" @click="login">login</a>
        <a href="javascript:;" @click="sign">sign</a>
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
            
        }
    }
}
</script>
<style scoped>

</style>

