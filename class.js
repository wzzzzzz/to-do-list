var group=function(namestr){
    this.name=namestr;//组名
    this.id;//唯一标识
    this.locked=false;//锁状态
    this.deleted=false;//删除状态
    this.count=0;//计数
    this.items=new Array();//条目
}
group.prototype.rename=function(namestr){
    this.name=namestr;
}
group.prototype.changelock=function(){
    this.locked=!this.locked;
}


var item=function(namestr){
    this.name=namestr;//条目名字
    this.done=false;//完成状态
    this.deleted=false;//删除状态
}
item.prototype.rename=function(namestr){
    this.name=namestr;
}
item.prototype.changedone=function(){
    this.done=!this.done;
    //同时影响所在组的计数
}

var additem=function(id){
    
}
