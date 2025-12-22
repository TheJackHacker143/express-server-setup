nums = [4,3,2,7,8,2,3,1]
// let swap;
// for(let i=0;i<nums.length;i++){
//     for(let j=i+1;j<nums.length;j++){
//         if(nums[i]>nums[j]){
//             swap=nums[j]
//             nums[j]=nums[i]
//             nums[i]=swap
//             }
//     }
// }

for(let i=0;i<nums.length;){
    let index=nums[i]-1
    if(nums[i]!=nums[index]){
       [ nums[i],nums[index]]=[nums[index],nums[i]]
    }
else{
    i++
}}
var result=[]
for(let i=0;i<nums.length;i++){
    if(nums[i]!=i+1) result.push(i+1)

}
console.warn(result)
// for(let i=0;i<nums[nums.length-1];i++){
//     if((i+1)!=nums[i]){
//         nums[i]=i+1
//         brr.push(nums[i])
        

//     }
// }