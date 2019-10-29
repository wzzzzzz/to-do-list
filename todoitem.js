export default {
        name: "todoitem",
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
    }