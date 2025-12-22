pushed = [1,2,3,4,5], popped = [4,5,3,2,1]
function valid(){
    let m=0
let stack=[]
for(let i=0;i<popped.length;i++){
    if(stack.length==0){
        for(let j=0;j<pushed.length;j++){
            if(m==0){
                stack.push(pushed[j])
            }
            if(popped[m]==stack[stack.length-1]){
                stack.pop()
                m++
                
            }
        }
    }
    else{
        
            if(popped[i]==stack[stack.length-1]){
                stack.pop()
            }
        
    }
}
return stack.length==0
}
console.log(valid())