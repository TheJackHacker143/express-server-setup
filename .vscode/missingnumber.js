arr=[1,4,3]
function jagan(){
for(let i=0;i<arr.length;i++){
    for(let j=i+1;j<arr.length;j++){
        if(arr[i]>arr[j]){
            var swap=arr[j]
            arr[j]=arr[i]
            arr[i]=swap
        }
    }
}
console.log(arr)
for(let i=1;i<=arr.length+1;i++){
if(i!=arr[i-1]){
    return i
}
}
}
console.log(jagan())