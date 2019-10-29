<template>
    <div id="content">
        <div id="groups">
            <ul ref="lis">
                <li v-for="(group,index) in allgroup" v-bind:key="index" v-bind:ind="index" v-bind:class="{actived:group.active}" >
                    <span id="title" v-on:click="changeshowind">{{group.title}}</span>
                    <img id="deleteimg" src="../image/delete1.png" v-on:click="deletethis"/>
                </li>
                <li  v-on:click="addgroup" >
                    <img id="addimg" src="../image/add.png" />
                    <span>增加</span>
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
                allgroup:[
                    {
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
                //alert(event);
                this.allgroup[this.showind].active=false;
                let i=event.target.parentElement.getAttribute("ind");
                this.showind=i;
                this.allgroup[i].active=true;
            },
            addgroup:function () {
                var newgroup={
                    title: "新分组",
                    todo:[],
                    active:true
                }
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
                this.allgroup.splice(i,1);
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
        watch:{
            allgroup:{
                handler(newval)
                {
                    //console.log(newval);
                    var json = JSON.stringify(newval);
                    //console.log(json);
                    axios.post("http://101.132.35.12:8080/todolist/todolistServlet", json);
                },
                deep:true
            }
        }
    }
</script>

<style scoped>
    #content{
        margin: auto;
        height: 100%;
        width: 70%;
        min-width: 760px;
        box-sizing: border-box;
        position: relative;
        overflow: hidden;
    }

    #groups{
        float: left;
        width: 20%;
        padding-top: 65px;
        padding-bottom: 35px;
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
        border-top: lightgray solid 1px;
    }
    .actived{
        color: white;
    }
    span#title{
        overflow: hidden;
        text-overflow: ellipsis;
        -o-text-overflow: ellipsis;
        white-space:nowrap;
        width:100px;
        display: inline-block;
    }
    img#addimg{
        width: 15px;
        height: 15px;
        display: inline;
        margin-right: 10px;
    }
    img#deleteimg{
        width: 15px;
        height: 15px;
        margin-right: 10px;
        float: right;
        margin-top: 25px;
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