<template>
    <div id="content">
        <div id="groups">
            <ul ref="lis">
                <li v-for="(group,index) in allgroup" v-bind:key="group.id" v-bind:ind="index" v-bind:class="{actived:group.active}" >
                    <span class="title" v-on:click="changeshowind">{{group.title}}</span>
                    <button v-on:click="deletethis"></button>
                </li>
                <li  v-on:click="addgroup" >
                    <img id="addimg" src="../image/add.png" />
                    <span class="title">增加</span>
                </li>
            </ul>
        </div>
        <todocontent v-bind:todo="allgroup[showind].todo" v-bind:title="allgroup[showind].title" v-on:titlechanged="changetitle" ></todocontent>
    </div>
</template>

<script>
    import todocontent from "./todocontent";
    //import router from "../router";
    import axios from 'axios';
    export default {
        name: "group",
        components: {todocontent},
        data: function () {
            return {
                showind:0,
                getallgroup:[],
                nextid:1,
                allgroup:[
                    {
                        id:0,
                        active:true,
                        title: "生活",
                        todo: [{
                                text:"学习js1111111111111111",
                                done:false,
                            },
                            {
                                text:"学习css",
                                done:false,
                            },
                            {
                                text:"学习vue",
                                done:false,
                            }],
                    },
                    // {
                    //     active:false,
                    //     title: "学习",
                    //     todo: [{
                    //             text:"学习js222222222222222",
                    //             done:false,
                    //         },
                    //         {
                    //             text:"学习css",
                    //             done:false,
                    //         }],
                    // },
                    // {
                    //     active:false,
                    //     title: "工作",
                    //     todo: [{
                    //             text:"学习js3333333333333",
                    //             done:false,
                    //         }],
                    // },
                    // {
                    //     active:false,
                    //     title: "运动",
                    //     todo: [{
                    //             text:"学习js444444444444444",
                    //             done:false,
                    //         },
                    //         {
                    //             text:"学习css",
                    //             done:false,
                    //         },
                    //         {
                    //             text:"学习vue",
                    //             done:false,
                    //         },
                    //         {
                    //             text:"学习vue",
                    //             done:false,
                    //         }],
                    // }
                ]
            }
        },
        methods: {
            addhistory:function(i){
                let newPath=this.allgroup[i].title;
                // i++;//为了newPath后面的数字
                // if(newPath=="新分组"){
                //     newPath+=i;
                // }
                // i--;
                window.history.pushState(this.allgroup[i].id,"",newPath);
                this.$root.currentPath=newPath;
            },
            changeshowind:function (event,newind) {
                let t=this.showind;
                this.allgroup[t].active=false;
                let i=0;
                if(event==null){
                    i=newind;
                }
                else{
                    i=event.target.parentElement.getAttribute("ind");
                    this.addhistory(i);
                }

                this.showind=i;
                this.allgroup[i].active=true;
            },
            addgroup:function () {
                let newgroup={
                    id:this.nextid,
                    title: "新分组",
                    todo:[],
                    active:true
                };
                this.nextid++;
                this.allgroup.push(newgroup);
                this.allgroup[this.showind].active=false;
                this.showind=this.allgroup.length-1;
                this.allgroup[this.allgroup.length-1].active=true;

                this.addhistory(this.allgroup.length-1);
            },
            changetitle:function (msg) {
                this.allgroup[this.showind].title=msg;
            },
            deletethis:function (event) {
                let i=event.target.parentElement.getAttribute("ind");
                if(i==0&&this.allgroup.length==1){
                    alert("请保留至少一个分组！");
                    return;
                }
                this.allgroup.splice(i,1);
                if(this.showind==i){
                    //this.allgroup[i].active=false;
                    this.showind=0;
                    this.allgroup[0].active=true;

                    //let newPath=this.allgroup[0].title;
                    window.history.replaceState(this.allgroup[0].id,"",this.allgroup[0].title);
                    this.$root.currentPath=this.allgroup[0].title;
                }
                else if(this.showind>i){
                    this.showind--;
                }
            }
        },
        created() {
            axios.get("http://101.132.35.12:8080/todolist/todolistServlet").then((response)=>{
            // axios.get("http://localhost:8080/todolist/todolistServlet").then((response)=>{
                //json转为json对象
                let data=response.data;
                //console.log(data);
                for(var i=0;i<data.length;i++){
                    //console.log(data[i]);
                    this.$set(this.allgroup,i,data[i]);
                }
                for(let i=0;i<this.allgroup.length;i++){
                    this.allgroup[i].active=false;
                }
                this.showind=0;
                this.allgroup[0].active=true;
                this.nextid=this.allgroup[this.allgroup.length-1].id+1;
                //console.log(this.allgroup.length);

                this.$root.currentPath=this.allgroup[0].title;
            });
        },
        beforeDestroy(){
            //console.log(newval);
            var json = JSON.stringify(this.allgroup);
            //console.log(json);
            //axios.post("http://localhost/todolist:8080/todolistServlet", json);
            axios.post("http://101.132.35.12:8080/todolist/todolistServlet", json);
        },
        watch:{
            allgroup:{
                handler(newval)
                {
                    //console.log(newval);
                    var json = JSON.stringify(newval);
                    //console.log(json);
                    //axios.post("http://localhost:8080/todolist/todolistServlet", json);
                    axios.post("http://101.132.35.12:8080/todolist/todolistServlet", json);
                },
                //deep:true
            }
        }
    }
</script>

<style scoped>
    @media screen and (orientation: landscape) {
        #content{
            flex-direction: row;
            -webkit-flex-direction: row;
            -ms-flex-direction: row;
            width: 70%;
            min-width: 760px;
        }
        li{
            border-top: lightgray solid 1px;
            line-height: 65px;
        }
        #groups{
            float: left;
            width: 20%;
            padding-top: 65px;
            padding-bottom: 35px;
        }
        button{
            background-position-y: bottom;
            -ms-background-position-y: bottom;
        }
    }
    @media screen and (orientation: portrait){
        #content{
            flex-direction: column;
            -webkit-flex-direction: column;
            -ms-flex-direction: column;
            width: 100%;
        }
        #groups{
            flex-basis: 50px;
            -webkit-flex-basis: 50px;
            width: 100%;
        }
        ul{
            white-space: nowrap;
            height: 50px;
            width: 100%;
            overflow-x: auto;
            -ms-overflow-x: auto;
            overflow-y: hidden;
            -ms-overflow-y: hidden;
        }
        li{
            display: inline-block;
            width: 152px;
            border-right: lightgray solid 1px;
            line-height: 50px;
        }
        button{
            background-position-y: center;
            -ms-background-position-y: center;
        }
    }
    #content{
        display: flex;
        display: -moz-flex;
        display: -ms-flex;
        display: -o-flex;
        display: -webkit-flex;
        justify-content: center;
        margin: auto;
        height: 100%;
        box-sizing: border-box;
        position: relative;
        overflow: hidden;
    }
    ul{
        list-style: none;
        margin: 0;
        padding-left: 0;
    }
    li{
        height: 50px;
        font-size: 18px;
        color: lightgray;
        padding-left: 10px;
        overflow: hidden;
    }
    .actived{
        color: white;
    }
    .title{
        display: inline-block;
        width:100px;
        text-overflow: ellipsis;
        -o-text-overflow: ellipsis;
        white-space:nowrap;
    }
    #addimg{
        display: inline-block;
        width: 15px;
        height: 15px;
        margin-right: 10px;
    }
    button{
        background-color: transparent;
        background-image: url("../image/delete1.png");
        -moz-background-image: url("../image/delete1.png");
        -o-background-image: url("../image/delete1.png");
        -webkit-background-image: url("../image/delete1.png");
        background-repeat: no-repeat;
        background-size: 16px 16px;
        -moz-background-size: 16px 16px;
        -o-background-size: 16px 16px;
        -webkit-background-size: 16px 16px;
        background-position-x: center;
        -ms-background-position-x: center;
        border: 0;
        width: 30px;
        height: 30px;
        margin-right: 10px;
        float: right;
        margin-top: 10px;
    }
    #groups::-webkit-scrollbar{
        width: 10px;
        background-color: lightslategrey;
    }
    #groups::-webkit-scrollbar-thumb{
        background-color: lightgrey;
        border-radius: 4px;
        -moz-border-radius: 4px;
        -webkit-border-radius: 4px;
    }
</style>