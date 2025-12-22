arr=[1,4,8,2]
let a=arr[0+1].toString(2).split("1").length
console.log(a)
let m=arr.length

for(let i=0;i<arr.length;i++){
  for(let j=0;j<m-1;j++){
if((arr[j].toString(2).split("1").length)>(arr[j+1].toString(2).split("1").length)){
  let swap=arr[j]
  arr[j]=arr[j+1]
  arr[j+1]=swap
}
else if((arr[j].toString(2).split("1").length)==(arr[j+1].toString(2).split("1").length) && arr[j]>arr[j+1]){
  let swap=arr[j]
  arr[j]=arr[j+1]
  arr[j+1]=swap
}
//console.log(swap)
  }
 // m--
}
console.log(arr)