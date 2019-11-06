import Vue from 'vue/dist/vue.js';
import group from "./components/group";
import "./style.css"

Vue.config.productionTip = false;

let mainvue=new Vue({
    el:"#group",
    template: `<group ref="group"></group>`,
    components: {group},
    data:{
        currentPath:window.location.pathname,
    }
});

window.addEventListener("popstate",function(event){
    mainvue.currentPath=window.location.pathname;
    let id=event.state;
    //console.log(id);
    let data=mainvue.$refs.group.$data.allgroup;
    //console.log(data);
    let i=0;
    for(i;i<data.length;i++){
        if(data[i].id>=id){
            break;
        }
    }
    if(i==data.length||data[i].id>id){
        i--;
    }
    //console.log(i);
    if(data[i].title!=mainvue.currentPath){
        window.history.replaceState(data[i].id,"",data[i].title);
        mainvue.currentPath=window.location.pathname;
    }
    mainvue.$refs.group.changeshowind(null,i);
});