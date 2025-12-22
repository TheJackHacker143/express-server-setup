arr=[[-1,2,-3],[-4,5,-6],[-7,-8,-9]]
brr=[]
crr=[]
for(let i=0;i<arr.length;i++){
    brr[i]=arr[i][i];
}
var max=brr[0];
for(let i=0;i<brr.length;i++){
    if(max<brr[i+1]){
        max=brr[i+1]
    }
}
var m=0;
console.log(arr)
console.log(arr.length-1)
for(let i=arr.length-1;i>=0;i--){
    crr[m]=arr[i][m]
    m++
}
console.log(crr)
var x=crr[0]
for(let i=0;i<crr.length;i++){
    if(x<crr[i+1]){
        x=crr[i+1]
    }
}
console.log(max,x)