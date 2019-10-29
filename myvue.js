Vue.component('todoitem',{
    data:function(){
        return {
            editingind:-1,
            oldtext:""
        }
    },
    props:{
        text:String,
        ind:Number,
        done:Boolean
    },
    // computed:{
    //     inputlistener:function () {
    //         var vm=this;
    //         return Object.assign({},this.$listeners,{
    //             keyup:function (event) {
    //                 vm.$emit('','hhhh');
    //             }
    //         })
    //     }
    // },
    methods:{
        editcancled:function (event) {
            if(event!=undefined){
                this.$data.editingind=-1;
                if(event.target.tagName=="SPAN"){
                    event.target.innerHTML=this.$data.oldtext;
                    event.target.blur();
                }
                else{
                    let span=event.target.previousElementSibling.previousElementSibling;
                    span.innerHTML=this.$data.oldtext;
                    span.blur();
                }
            }
            else{
                let span=this.$el.childNodes[0];
                span.innerHTML=this.$data.oldtext;
                span.blur();
            }
        },
        startedit:function (event) {
            if(this.$data.editingind!=this.$props.ind){
                this.$data.editingind=this.$props.ind;
                this.$data.oldtext=this.$props.text;
            }
            this.$data.oldtext=event.target.innerHTML;
        },
        edited:function (event) {
            event.preventDefault();
            let text;
            if(event.target.tagName=="SPAN"){
                text=event.target.innerHTML;
                event.target.blur();
            }
            else{
                let span=event.target.previousElementSibling;
                text=span.innerHTML;
                span.blur();
            }
            if(text==""){
                alert("请输入内容！");
                this.editcancled();
            }
            else{
                this.$emit('editdone',text,this.$props.ind);
                this.$data.editingind=-1;
            }
        }
    },
    template:`<li>
                    <span id="textarea" contenteditable="true" v-bind:class="{completed:done}" v-on:click="startedit" v-on:keypress.enter="edited" v-on:keyup.esc="editcancled">{{text}}</span>
                    <button v-if="editingind==ind" v-on:click="edited">编辑完成</button>
                    <button v-if="editingind==ind" v-on:click="editcancled">取消编辑</button>
                    <button v-if="!done" v-on:click="$emit('donethis')">标记为完成</button>
                    <button v-if="done" v-on:click="$emit('notdonethis')">标记未完成</button>
                    <button v-on:click="$emit('deletethis',ind)">删除</button>
                  </li>`
});

Vue.component('todo',{
    props:{
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
    },
    computed:{
        todocount:function () {
            return this.$props.alltodo.length;
        },
        countnotdone:function () {
            return this.$props.alltodo.filter(function (todo) {
                return !todo.done
            }).length;
        }
    },
    watch:{
        isadding:function (val) {
            if(val==false){
                this.$props.newtodotext="";
            }
        }
    },
    methods:{
        adding:function (event) {
            this.props.isadding=true;
            let input=event.target.nextElementSibling.childNodes[0];
            event.target.nextElementSibling.style.display="inline";
            input.focus();
        },
        toadd:function () {
            var newtodo={
                text:"",
                done:false
            }
            if(this.props.newtodotext==""){
                alert("请输入内容！");
            }
            else{
                newtodo.text=this.newtodotext;
                newtodo.index=this.todocount;
                this.props.alltodo.push(newtodo);
                this.props.newtodotext="";
                this.props.isadding=false;
            }
        },
        deletethis:function (message) {
            this.props.alltodo.splice(message,1);
        },
        alldone:function () {
            for(var i=0;i<this.props.alltodo.length;i++){
                this.props.alltodo[i].done=true;
            }
        },
        allnotdone:function(){
            for(var i=0;i<this.props.alltodo.length;i++){
                this.props.alltodo[i].done=false;
            }
        },
        showall:function () {
            this.props.showall_d=true;
            this.props.hidedone_d=false;
            this.props.showdone_d=false;
        },
        hidedone:function () {
            this.props.hidedone_d=true;
            this.props.showall_d=false;
            this.props.showdone_d=false;
        },
        showdone:function () {
            this.props.showdone_d=true;
            this.props.showall_d=false;
            this.props.hidedone_d=false;
        },
        deleteall:function () {
            for(let i=0;i<this.alltodo.length;){
                this.props.alltodo.splice(i,1);
            }
        },
        deletedone:function () {
            for(let i=0;i<this.props.alltodo.length;i++){
                if(this.props.alltodo[i].done==true){
                    this.props.alltodo.splice(i,1);
                    i--;
                }
            }
        },
        edited:function (text,ind) { //这个参数（数据或者事件），不用在组件实例的v-on里写出来，而是在emit里写出来。v-on只要写出调用的这个函数名就行了
            this.props.alltodo[ind].text=text;
        }
    },
    template: `<div id="content">
                                <p  id="header">my-to-do-list</p>
                                <!--<div id="app"></div>-->
                                <div id="mytodo" >
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
                                </div>
                                <p id="footer">@lwz</p>
                                <!--<footer>@lwz</footer>-->
                            </div>`
});

var todo=new Vue({
    el: "#mytodo",
    component:{todo},
    template:`<todo></todo>`
});