brr=[{name:"jagan", age:20},1]
brr[0].name="mas"
console.log(brr[0].name)
arr=[3,6,4,7,2,8,0]
//let max=arr[0]
var swap;
for(let i=0;i<arr.length;i++){
    for(let m=i+1;m<arr.length;m++){
    if(arr[m]<arr[i]){
        swap=arr[m]
        arr[m]=arr[i]
        arr[i]=swap
    }
}

}
console.log(arr)