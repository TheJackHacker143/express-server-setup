arr=[8,7,6,5,4,3,2,1]
brr=[]
var m=0;
for(let i=1;i<=7;i++){
    brr[m]=i
    for(let j=0;arr[j]!=i;j++){
        m++
        brr[m]=arr[j]
        
        
    }
    m++
}
const myset= new Set(brr)
const crr=[...myset];
console.log(crr)
console.log(crr.length-7)