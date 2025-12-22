arr=[1 ,2 ,3 ,5 ,6 ,7 ,4 ,9 ,9 ,45]
brr=[]
function jagan(){
for(let m=0;m<arr.length;m++){
    var p=0
var q=0
for(let i=0;i<m;i++){
    p=p+arr[i]
   // brr.push(p)
}
for(let j=arr.length-1;j>=m;j--){
    q=q+arr[j]
}
if(p==q) return (true)
    

}
return (false)
}
console.log(jagan())