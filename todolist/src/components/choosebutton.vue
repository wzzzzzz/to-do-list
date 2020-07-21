<template>
    <p>筛选：
        <button v-on:click="$emit('showall_e')" v-bind:class="{butpredded:showall}">显示全部</button>
        <button v-on:click="$emit('hidedone_e')" v-bind:class="{butpredded:hidedone}">只显示未完成</button>
        <button v-on:click="$emit('showdone_e')" v-bind:class="{butpredded:showdone}">只显示已完成</button>
    </p>
</template>

<script>
    export default {
        name: "choosebutton",
        props:[
            'showall',
            'showdone',
            'hidedone'
        ]
    }
</script>

<style scoped>
    p{
        margin: 0px;
        line-height: 25px;
        padding-top: 15px;
        color: lightslategray;
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
        min-width: fit-content;
    }
    .butpredded{
        background-color: lightslategray;
        color: white;
    }
</style>