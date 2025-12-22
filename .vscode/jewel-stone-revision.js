jewels="aAb"
stones="aAAbbbb"
let map=new Map()
for(let i=0;i<stones.length;i++){
    if(map.has(stones[i])){
        map.set(stones[i],map.get(stones[i])+1)
    }
    else{
        map.set(stones[i],1)
    }
}
let m=0
for(let i=0;i<jewels.length;i++){
m=m+map.get(jewels[i])
}
return(m)