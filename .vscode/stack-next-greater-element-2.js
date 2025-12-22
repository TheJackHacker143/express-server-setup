nums=[3,6,5,4,2]
let n=nums.length
let ans=new Array(n);
let indexstack=[]



for(let i=2*n-1;i>=0;i--){
    
if((indexstack.length==0)){
    ans[i%n]=-1
    indexstack.push(i%n)
}
else{
     if(nums[i%n]<nums[indexstack[indexstack.length-1]]){
    ans[i%n]=nums[indexstack[indexstack.length-1]]
    indexstack.push(i%n)
}
else {

while((nums[i%n]>nums[indexstack[indexstack.length-1]]) && (indexstack.length>0)){
    indexstack.pop()
    
}
if(indexstack.length==0){
ans[i%n]=-1
indexstack.push(i%n)
}
else if(indexstack.length>0){
ans[i%n]=nums[indexstack[indexstack.length-1]]
indexstack.push(i%n)
}
}
}
}

console.log(ans)