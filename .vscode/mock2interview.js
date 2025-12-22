nums = [4,5,6,7,0,1,2], target = 0
let l=0
let h=nums.length-1
let result=-1
function rotate(nums,target){
  while(l<=h){
  let m=Math.floor((l+h)/2)
  if(nums[m]==target){
    return m
  }
  else if(target>nums[l] && target<nums[m]){
    if(nums[m]<target){
       l=m+1
}
else{
  h=m-1
}
   
  }
  else {
    if(nums[m]>target){
       l=m+1
}
else{
  h=m-1
}
  }

  }
}
console.log(rotate(nums))
