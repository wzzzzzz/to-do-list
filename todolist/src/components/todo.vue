<template>
    <div id="mytodo" >
        <choosebutton v-on:showall_e="showall" v-on:hidedone_e="hidedone" v-on:showdone_e="showdone" v-bind:showall="showall_d" v-bind:hidedone="hidedone_d" v-bind:showdone="showdone_d"></choosebutton>
        <handlebutton v-on:alldone_e="alldone" v-on:allnotdone_e="allnotdone" v-on:deleteall_e="deleteall" v-on:deletedone_e="deletedone"></handlebutton>

        <ul>
            <todoitem v-show="showall_d||(hidedone_d&&(!todo.done))||(showdone_d&&todo.done)" v-for="(todo,index) in alltodo" v-bind:key="index" v-bind:text="todo.text" v-bind:ind="index" v-bind:done="todo.done" v-on:editdone="edited" v-on:donethis="todo.done=true" v-on:notdonethis="todo.done=false" v-on:deletethis="deletethis"></todoitem>
        </ul>

        <p id="editp">
            <button v-on:click="adding" >增加新事务</button>
            <span v-show="isadding"  v-on:blur="isadding=false" >
                <input type="text" v-model="newtodotext" v-on:keyup.enter="toadd" id="addbutton" v-on:keyup.esc="isadding=false"/>
                <button v-on:click="toadd">增加</button>
                <button v-on:click="isadding=false">取消</button>
            </span>
        </p>
    </div>
</template>

<script>
    import todoitem from "./todoitem";
    import choosebutton from "./choosebutton";
    import handlebutton from "./handlebutton";
    export default {
        name:"todo",
        components:{choosebutton, todoitem ,handlebutton},
        data:function(){
            return {
                newtodotext: "",
                isadding:false,
                editingindex:-1,
                showall_d:true,
                showdone_d:false,
                hidedone_d:false,
            }
        },
        props:[ 'alltodo' ],
        computed:{
            todocount:function () {
                return this.alltodo.length;
            }
        },
        watch:{
            isadding: {
                handler(val){
                    if(val==false) {
                        this.newtodotext = "";
                    }
                }
            }
            // alltodo:{
            //     handler (val) {
            //         this.$emit('todochange', val);
            //     }
            // }
        },
        methods:{
            adding:function (event) {
                this.isadding=true;
                let input=event.target.nextElementSibling.childNodes[0];
                event.target.nextElementSibling.style.display="inline";
                input.focus();
            },
            toadd:function () {
                var newtodo={
                    text:"",
                    done:false
                }
                if(this.newtodotext==""){
                    alert("请输入内容！");
                }
                else{
                    newtodo.text=this.newtodotext;
                    newtodo.index=this.todocount;
                    this.alltodo.push(newtodo);
                    this.newtodotext="";
                    this.isadding=false;
                }
            },
            deletethis:function (message) {
                this.alltodo.splice(message,1);
            },
            alldone:function () {
                for(var i=0;i<this.alltodo.length;i++){
                    this.alltodo[i].done=true;
                }
            },
            allnotdone:function(){
                for(var i=0;i<this.alltodo.length;i++){
                    this.alltodo[i].done=false;
                }
            },
            showall:function () {
                this.showall_d=true;
                this.hidedone_d=false;
                this.showdone_d=false;
            },
            hidedone:function () {
                this.hidedone_d=true;
                this.showall_d=false;
                this.showdone_d=false;
            },
            showdone:function () {
                this.showdone_d=true;
                this.showall_d=false;
                this.hidedone_d=false;
            },
            deleteall:function () {
                for(let i=0;i<this.alltodo.length;){
                    this.alltodo.splice(i,1);
                }
            },
            deletedone:function () {
                for(let i=0;i<this.alltodo.length;i++){
                    if(this.alltodo[i].done==true){
                        this.alltodo.splice(i,1);
                        i--;
                    }
                }
            },
            edited:function (text,ind) { //这个参数（数据或者事件），不用在组件实例的v-on里写出来，而是在emit里写出来。v-on只要写出调用的这个函数名就行了
                this.alltodo[ind].text=text;
            }
        }
    }
</script>

<style scoped>
    #mytodo{
        overflow: auto;
        height: calc(100% - 35px);
        box-sizing: border-box;
        padding-left: 50px;
        padding-right: 50px;
    }
    ul{
        list-style: none;
        padding-left: 0px;
    }
    #fenge{
        margin-top: 40px;
    }
    #editp{
        height: 25px;
    }
    #editp button{
        line-height: 18px;
        margin-top: 7px;
    }
    button{
        background-color: white;
        color: lightslategray;
        border: 1px solid lightslategray;
        border-radius: 3px;
        line-height: 18px;
        margin-right: 10px;
    }
    input{
        height: 18px;
        line-height: 18px;
        overflow: visible;
        font-size: 15px;
        margin-right: 10px;
    }
    #mytodo::-webkit-scrollbar{
        width: 10px;
        /*height: 100%;这里有点点问题*/
        background-color: white;
    }
    #mytodo::-webkit-scrollbar-thumb{
        background-color: lightgrey;
        border-radius: 4px;
    }
    /*#mytodo{*/
    /*    !*scrollbar-face-color: #333; !**!!*立体滚动条的颜色*!*!*/
    /*    !*scrollbar-highlight-color: #666; !**!!*滚动条空白部分的颜色*!*!*/
    /*    !*scrollbar-shadow-color: #999; !**!!*立体滚动条阴影的颜色*!*!*/
    /*    !*scrollbar-darkshadow-color: #666; !**!!*立体滚动条强阴影的颜色*!*!*/
    /*    scrollbar-track-color: white; !**!!*立体滚动条背景颜色*!*/
    /*    scrollbar-base-color:lightgrey; !**!!*滚动条的基本颜色*!*/
    /*}滚动条颜色有问题*/
</style>