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
            changeshowind:function (event) {
                //console.log(event);
                this.allgroup[this.showind].active=false;
                let i=event.target.parentElement.getAttribute("ind");
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
                }
            }
        },
        created() {
            axios.get("http://101.132.35.12:8080/todolist/todolistServlet").then((response)=>{
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
                //console.log(this.allgroup.length);
            });
        },
        beforeDestroy(){
            //console.log(newval);
            var json = JSON.stringify(this.allgroup);
            //console.log(json);
            axios.post("http://101.132.35.12:8080/todolist/todolistServlet", json);
        },
        // watch:{
        //     allgroup:{
        //         handler(newval)
        //         {
        //             //console.log(newval);
        //             var json = JSON.stringify(newval);
        //             //console.log(json);
        //             axios.post("http://101.132.35.12:8080/todolist/todolistServlet", json);
        //         },
        //         deep:true
        //     }
        // }
    }
</script>

<style scoped>
    @media screen and (orientation: landscape) {
        #content{
            flex-direction: row;
            width: 70%;
            min-width: 760px;
        }
        li{
            border-top: lightgray solid 1px;
        }
        #groups{
            float: left;
            width: 20%;
            padding-top: 65px;
            padding-bottom: 35px;
        }
    }
    @media screen and (orientation: portrait){
        #content{
            flex-direction: column;
            width: 100%;
        }
        ul{
            white-space: nowrap;
            height: 100%;
            width: 100%;
            overflow-x: auto;
            overflow-y: hidden;
        }
        li{
            display: inline-block;
            width: 152px;
            border-right: lightgray solid 1px;
        }
        #groups{
            height: 50px;
            width: 100%;
        }
    }
    #content{
        display: flex;
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
        line-height: 65px;
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
        display: inline;
        margin-right: 10px;
    }
    button{
        background-color: transparent;
        background-image: url("../image/delete1.png");
        background-repeat: no-repeat;
        background-size: 20px 20px;
        background-position-x: center;
        background-position-y: bottom;
        border: 0;
        width: 40px;
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
    }
</style>