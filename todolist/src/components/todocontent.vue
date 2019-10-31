<template>
    <span id="items">
        <p id="header">
            <span contenteditable="true" v-on:click="startedit" v-on:keypress.enter="editdone" v-on:keyup.esc="editcancle" v-on:blur="editdone">{{title}}</span>
            <span id="countnotdone">{{countnotdone}}</span>
        </p>
        <todo v-bind:alltodo="todo"></todo>
        <!--p id="footer">@lwz</p>-->
        <!--<footer>@lwz</footer>-->
    </span>
</template>

<script>
    import todo from "./todo";
    export default {
        name: "todocontent",
        components:{todo},
        data:function () {
            return{
                oldtitle:""
            }
        },
        props:{
            title:String,
            todo:Array
        },
        computed:{
            countnotdone:function () {
                return this.todo.filter(function (todos) {
                    return !todos.done
                }).length;
            }
        },
        methods:{
            startedit:function () {
                this.oldtitle=this.title;
            },
            editdone:function (event) {
                //这里blur因为可能是被其他函数调用的，所以要检查event，!=undefined说明不是被调用而是事件响应的
                if(event!=undefined){
                    event.preventDefault();
                    let newtitle=event.target.innerHTML;
                    if(newtitle==""){
                        alert("请输入组名");
                        this.editcancle();
                    }
                    else {
                        if(newtitle.length>50){
                            alert("组名不能过长");
                            event.target.innerHTML=this.oldtitle;
                            event.target.blur();
                        }
                        else{
                            this.$emit('titlechanged', newtitle);
                            event.target.blur();
                        }
                    }
                }
            },
            editcancle:function (event) {
                event.target.innerHTML=this.oldtitle;
                event.target.blur();
            }
            // todochanged:function (val) {
            //     this.$emit('todochange',val);
            // }
        }
    }
</script>

<style scoped>
    @media screen and (orientation: landscape) {
        #items{
            width: 80%;
        }
    }
    @media screen and (orientation: portrait) {
        #items{
            width: 100%;
        }
    }
    #items{
        float: right;
        height: 100%;
        box-sizing: border-box;
        padding-top: 30px;
        padding-bottom: 35px;
        background-color: white;
    }
    p#header{
        border-bottom: solid 1px lightgray;
        width: calc(100% - 50px);
        height: 25px;
        padding-left: 50px;
        font-size: 18px;
        padding-bottom: 10px;
        margin: 0;
    }
    p#header span:first-child {
        height: 25px;
        line-height: 32px;
        width: calc(100% - 100px);
        display: inline-block;
        overflow: hidden;
        text-overflow: ellipsis;
        -o-text-overflow: ellipsis;
        white-space:nowrap;
    }
    #countnotdone{
        display: inline-block;
        background-color: lightslategrey;
        width: 20px;
        height: 20px;
        line-height: 20px;
        border-radius: 10px;
        font-size: 11px;
        text-align: center;
        margin-left: 10px;
        margin-bottom: 15px;
        color: white;
    }
    /*#footer{*/
    /*    background-color: lightblue;*/
    /*    text-align: center;*/
    /*    vertical-align: center;*/
    /*    height: 15px;*/
    /*    width: 75%;*/
    /*    font-size: 12px;*/
    /*    color: ivory;*/
    /*    position: absolute;*/
    /*    bottom: 20px;*/
    /*    margin: 0px;*/
    /*}*/
    /*footer{*/
    /*    background-color: lightblue;*/
    /*    text-align: center;*/
    /*    color: ivory;*/
    /*    font-size: 12px;*/
    /*    position: fixed;*/
    /*    bottom: 20px;*/
    /*    width: 60%;*/
    /*}*/

</style>