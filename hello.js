let A = "aaaaababacdc"
let x=""
let brr=[]
let myset=new Set()
for(let i=0; i<A.length;i++){
  if(myset.has(A[i])){
    brr.shift()
  }
  else {
  //   if(brr.length>1){
  //   myset.clear()
  // }else{
     myset.add(A[i])
    brr.push(A[i])
  //}
  }
  if(brr[0]==undefined) {
      if(myset.size>1){const first = myset.values().next().value
         myset.delete(first)
      }
  x+="#"
      }
  else  x+=brr[0]
      }
console.log(x)