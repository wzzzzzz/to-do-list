import Vue from 'vue/dist/vue.js';
import group from "./components/group";
import "./style.css"

Vue.config.productionTip = false;

new Vue({
    el:"#group",
    template: `<group></group>`,
    components: {group}
});