import Vue from 'vue/dist/vue.js';
import group from "./components/group";
import "./style.css"

Vue.config.productionTip = false;

let mainvue=new Vue({
    el:"#group",
    template: `<group></group>`,
    components: {group},
    data:{
        currentPath:window.location.pathname,
    }
});

window.addEventListener("popstate",function(){
    mainvue.currentPath=window.location.pathname;
    let stateobj=JSON.parse(state);
    let ind=this.allgroup.indexOf(stateobj);
    this.showind=ind;
});