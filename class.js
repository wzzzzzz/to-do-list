var group=function(namestr){
    this.name=namestr;//组名
    this.id;//唯一标识
    this.locked=false;//锁状态
    this.deleted=false;//删除状态
    this.count=0;
    this.items=new Array();
}

var item=function(namestr){
    this.name=namestr;
    this.done=false;
    this.deleted=false;//删除状态
}