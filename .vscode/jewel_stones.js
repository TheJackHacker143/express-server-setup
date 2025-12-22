jewels = "z", stones = "ZZ"
var myset= new Map();

for(let i=0; i<stones.length;i++){
    if(myset.has(stones[i])){
        
        myset.set(stones[i],myset.get(stones[i])+1)
    }
    else{
        myset.set(stones[i],1)
    }

}
var r=myset.get(jewels[0]);
for(let j=1;j<jewels.length;j++){
    
    r=r+myset.get(jewels[j])

}
if(r== undefined){
    return(0)
}

return(r)