heights = [2,1,5,6,2,3]
let n=heights.length
let cur=0
let stack=[]
let right=[]
let left=[]
let area=0

for(let i=n-1;i>=0;i--){
    while(stack.length>0 && heights[stack[stack.length-1]]>heights[i]){
        stack.pop()
    }
    right[i]=stack.length==0 ? n:stack[stack.length-1]
    stack.push(i)
}
while(stack.length>0){
    stack.pop()
}
for(let i=0;i<n;i++){
    while(stack.length>0 && heights[stack[stack.length-1]]>heights[i]){
        stack.pop()
    }
    left[i]=stack.length==0 ? -1:stack[stack.length-1]
    stack.push(i)
}
for(let i=0;i<n;i++){
    area=heights[i]*(right[i]-left[i]-1)
    
    cur=Math.max(cur,area)
}
console.log(cur)