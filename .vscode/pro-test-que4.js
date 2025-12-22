arr=[2,7,9,11,12]
target=16
function jagan(){
let n;
mysap= new Map()
for(let i=0; i<arr.length;i++){
    n=target-arr[i]
    if(mysap.has(n)){
        // if(mysap.get(n)==arr[i]){
        // return [mysap.get(n),i]
        // }
        // else{
            return [mysap.get(n),i]
        //}

    }
    
    
    

    mysap.set(arr[i],i)
    
}
}
//console.log(mysap)
console.log(jagan())