<template>
    <p>批量处理：
        <button v-on:click="$emit('alldone_e')">全部标为完成</button>
        <button v-on:click="$emit('allnotdone_e')">全部标未完成</button>
        <button v-on:click="$emit('deleteall_e')" >清除全部</button>
        <button v-on:click="$emit('deletedone_e')" >清除已完成</button>
    </p>
</template>

<script>
    export default {
        name: "handlebutton"
    }
</script>

<style scoped>
    p{
        color: lightslategray;
        line-height: 25px;
    }
    button{
        background-color: white;
        color: lightslategray;
        border: 1px solid lightslategray;
        border-radius: 3px;
        height: 20px;
        line-height: 15px;
        margin-right: 10px;
        font-size: 15px;
        width: 130px;
    }
</style>