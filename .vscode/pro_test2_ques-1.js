arr=[19 ,12 ,11 ,7 ,5 ,1 ,4]
let mid
for(let i=0;i<arr.length;i++){
    mid=i;
    let swap;
    for(let j=i+1;j<arr.length;j++){
        if(arr[j]<arr[mid])  {
            mid=j;
        }
    }
    swap=arr[mid]
    arr[mid]=arr[i]
    arr[i]=swap
}
console.log(arr)