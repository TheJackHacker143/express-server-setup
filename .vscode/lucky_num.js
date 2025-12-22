arr=[1,3,3,3,2,2,5,5,5,5,5,4,4,4,4]

    var m=1
let mymap= new Map();
brr=[]
for(let i=0; i <arr.length; i++){
    if(mymap.has(arr[i])){
        mymap.set(arr[i],(mymap.get(arr[i])+1))
    }
    else{
    mymap.set(arr[i],m);
    }
    
}
for(let [key,value] of mymap){
    if(key == value){
        brr.push(key)

    }
}
let x=brr[0]
for(let i=1; i<brr.length;i++){
    if(brr[i]>x){
        x=brr[i]
    }

}
 return x