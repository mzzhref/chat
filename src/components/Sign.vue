<template>
    <div>
        <input type="text" v-model="name">
        <br >
        <input type="text" v-model="name">
        <br >
        <input type="text" v-model="name">
        <br >
        <a href="javascript:;" @click="sign"></a>
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
        sign(){

        }
    }
}
</script>
