arr = [1,2,2,3,3,3]
let map = new Map()
    let a=1
    for (let i = 0; i < arr.length; i++){
        if (map.has(arr[i])) {
            map.set(arr[i],map.get(arr[i])+1)
        }
        else{
        map.set(arr[i],a)
        }
    }
    brr=[]
    //console.log(brr.length)
    for(let [key,value] of map){
        if(key==value){
brr.push(key)
        }
        if(brr.length==0){
            return -1
        }
    }
    console.log(brr)
    let max=brr[0]
    for(let i=1;i<brr.length;i++){
        if(max<brr[i]){
            max=brr[i]
        }
    }
    console.log(max)