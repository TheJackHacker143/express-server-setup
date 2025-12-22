arr = [98,56,33,25,9,6,2, 1, 0, -85] 
target=9
let l=0;
let h=arr.length-1
function jagan(){
while(l<=h){
    let m=Math.floor((l+h)/2)
    if(arr[m]==target){
        return(m)
    }
    else if(arr[m]>target){
        h=m-1
    }
    else{
        l=m+1
    }
    }
}
console.log(jagan)
    