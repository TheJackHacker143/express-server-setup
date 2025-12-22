arr=[1,3, 5,5,5,5, 67, 123, 125 ]
x=5
let low=0,high=arr.length-1;
for(let i=0;i<arr.length;i++){
    var mid=Math.floor((low+high)/2)
    //if(mid%2!=0) mid=mid-1
   // else if(mid%2==0) mid=mid
    if(x>arr[mid]) {
        low=mid+1

    }
    else if(x<arr[mid]){
         high=mid-1
         if(x>arr[high]||x<arr[high]){
            console.log(high)
         }
    }
    console.log(high)
}
console.log(mid)
