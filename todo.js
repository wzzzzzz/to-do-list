import * as todoitem from "./todoitem.js";
    export default {
        name:"todo",
        components:{todoitem},
        data:function(){
            return{
                newtodotext:"",
                alltodo:[
                    {
                        text:"学习js哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈和哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈",
                        done:false,
                    },
                    {
                        text:"学习css",
                        done:false,
                    },
                    {
                        text:"学习vue",
                        done:false,
                    },
                    {
                        text:"学习vue",
                        done:false,
                    }
                ],
                isadding:false,
                editingindex:-1,
                showall_d:true,
                showdone_d:false,
                hidedone_d:false,
            }
        },
        computed:{
            todocount:function () {
                return this.alltodo.length;
            },
            countnotdone:function () {
                return this.alltodo.filter(function (todo) {
                    return !todo.done
                }).length;
            }
        },
        watch:{
            isadding:function (val) {
                if(val==false){
                    this.newtodotext="";
                }
            }
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
        },
        template:`<div id="mytodo" >
        <p>筛选：
            <button v-on:click="showall" v-bind:class="{butpredded:showall_d}">显示全部</button>
            <button v-on:click="hidedone" v-bind:class="{butpredded:hidedone_d}">只显示未完成</button>
            <button v-on:click="showdone" v-bind:class="{butpredded:showdone_d}">只显示已完成</button>
        </p>
        <p>批量处理：
            <button v-on:click="alldone">全部标为完成</button>
            <button v-on:click="allnotdone">全部标未完成</button>
            <button v-on:click="deleteall" >清除全部</button>
            <button v-on:click="deletedone" >清除已完成</button>
        </p>

        <ol>
            <todoitem v-if="showall_d||(hidedone_d&&(!todo.done))||(showdone_d&&todo.done)" v-for="(todo,index) in alltodo" v-bind:key="index" v-bind:text="todo.text" v-bind:ind="index" v-bind:done="todo.done" v-on:editdone="edited" v-on:donethis="todo.done=true" v-on:notdonethis="todo.done=false" v-on:deletethis="deletethis($event)"></todoitem>
        </ol>

        <p id="fenge">待完成个数：{{countnotdone}}</p>
        <p id="editp">
            <button v-on:click="adding" >增加新事务</button>
            <span v-show="isadding" >
                <input type="text" v-model="newtodotext" v-on:keyup.enter="toadd" id="addbutton" v-on:keyup.esc="isadding=false" v-on:blur="isadding=false"></input>
                <button v-on:click="toadd">增加</button>
                <button v-on:click="isadding=false">取消</button>
            </span>
        </p>
    </div>`
}