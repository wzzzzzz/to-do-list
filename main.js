import * as todo from "./todo.js";

// Vue.component('todoitem',{
//     data:function(){
//         return {
//             editingind:-1,
//             oldtext:""
//         }
//     },
//     props:{
//         text:String,
//         ind:Number,
//         done:Boolean
//     },
//     // computed:{
//     //     inputlistener:function () {
//     //         var vm=this;
//     //         return Object.assign({},this.$listeners,{
//     //             keyup:function (event) {
//     //                 vm.$emit('','hhhh');
//     //             }
//     //         })
//     //     }
//     // },
//     methods:{
//         editcancled:function (event) {
//             if(event!=undefined){
//                 this.$data.editingind=-1;
//                 if(event.target.tagName=="SPAN"){
//                     event.target.innerHTML=this.$data.oldtext;
//                     event.target.blur();
//                 }
//                 else{
//                     let span=event.target.previousElementSibling.previousElementSibling;
//                     span.innerHTML=this.$data.oldtext;
//                     span.blur();
//                 }
//             }
//             else{
//                 let span=this.$el.childNodes[0];
//                 span.innerHTML=this.$data.oldtext;
//                 span.blur();
//             }
//         },
//         startedit:function (event) {
//             if(this.$data.editingind!=this.$props.ind){
//                 this.$data.editingind=this.$props.ind;
//                 this.$data.oldtext=this.$props.text;
//             }
//             this.$data.oldtext=event.target.innerHTML;
//         },
//         edited:function (event) {
//             event.preventDefault();
//             let text;
//             if(event.target.tagName=="SPAN"){
//                 text=event.target.innerHTML;
//                 event.target.blur();
//             }
//             else{
//                 let span=event.target.previousElementSibling;
//                 text=span.innerHTML;
//                 span.blur();
//             }
//             if(text==""){
//                 alert("请输入内容！");
//                 this.editcancled();
//             }
//             else{
//                 this.$emit('editdone',text,this.$props.ind);
//                 this.$data.editingind=-1;
//             }
//         }
//     },
//     template:`<li>
//                     <span id="textarea" contenteditable="true" v-bind:class="{completed:done}" v-on:click="startedit" v-on:keypress.enter="edited" v-on:keyup.esc="editcancled">{{text}}</span>
//                     <button v-if="editingind==ind" v-on:click="edited">编辑完成</button>
//                     <button v-if="editingind==ind" v-on:click="editcancled">取消编辑</button>
//                     <button v-if="!done" v-on:click="$emit('donethis')">标记为完成</button>
//                     <button v-if="done" v-on:click="$emit('notdonethis')">标记未完成</button>
//                     <button v-on:click="$emit('deletethis',ind)">删除</button>
//                   </li>`
// });
//
// var todo=new Vue({
//     el: "#mytodo",
//     data:{
//         newtodotext:"",
//         alltodo:[
//             {
//                 text:"学习js哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈和哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈",
//                 done:false,
//             },
//             {
//                 text:"学习css",
//                 done:false,
//             },
//             {
//                 text:"学习vue",
//                 done:false,
//             },
//             {
//                 text:"学习vue",
//                 done:false,
//             }
//         ],
//         isadding:false,
//         editingindex:-1,
//         showall_d:true,
//         showdone_d:false,
//         hidedone_d:false,
//     },
//     computed:{
//         todocount:function () {
//             return this.alltodo.length;
//         },
//         countnotdone:function () {
//             return this.alltodo.filter(function (todo) {
//                 return !todo.done
//             }).length;
//         }
//     },
//     watch:{
//         isadding:function (val) {
//             if(val==false){
//                 this.newtodotext="";
//             }
//         }
//     },
//     methods:{
//         adding:function (event) {
//             this.isadding=true;
//             let input=event.target.nextElementSibling.childNodes[0];
//             event.target.nextElementSibling.style.display="inline";
//             input.focus();
//         },
//         toadd:function () {
//             var newtodo={
//                 text:"",
//                 done:false
//             }
//             if(this.newtodotext==""){
//                 alert("请输入内容！");
//             }
//             else{
//                 newtodo.text=this.newtodotext;
//                 newtodo.index=this.todocount;
//                 this.alltodo.push(newtodo);
//                 this.newtodotext="";
//                 this.isadding=false;
//             }
//         },
//         deletethis:function (message) {
//             this.alltodo.splice(message,1);
//         },
//         alldone:function () {
//             for(var i=0;i<this.alltodo.length;i++){
//                 this.alltodo[i].done=true;
//             }
//         },
//         allnotdone:function(){
//             for(var i=0;i<this.alltodo.length;i++){
//                 this.alltodo[i].done=false;
//             }
//         },
//         showall:function () {
//             this.showall_d=true;
//             this.hidedone_d=false;
//             this.showdone_d=false;
//         },
//         hidedone:function () {
//             this.hidedone_d=true;
//             this.showall_d=false;
//             this.showdone_d=false;
//         },
//         showdone:function () {
//             this.showdone_d=true;
//             this.showall_d=false;
//             this.hidedone_d=false;
//         },
//         deleteall:function () {
//             for(let i=0;i<this.alltodo.length;){
//                 this.alltodo.splice(i,1);
//             }
//         },
//         deletedone:function () {
//             for(let i=0;i<this.alltodo.length;i++){
//                 if(this.alltodo[i].done==true){
//                     this.alltodo.splice(i,1);
//                     i--;
//                 }
//             }
//         },
//         edited:function (text,ind) { //这个参数（数据或者事件），不用在组件实例的v-on里写出来，而是在emit里写出来。v-on只要写出调用的这个函数名就行了
//             this.alltodo[ind].text=text;
//         }
//     }
// });