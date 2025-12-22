arr=[1,2,3,4,5]
var brr=[]
for(let i=0;i<arr.length;i++){
    arr[i]= String(arr[i])
}
for(let i=0;i<arr.length;i++){
    var m=""
    for(let j=i;j<arr.length;j++){
        m=m+arr[j];
        brr.push(m);
    }
}
 for(let i=0;i<brr.length;i++){  
    brr[i]=String(brr[i])
    
 }
 crr=[]
 console.log(brr) 
 for(let i=0; i<brr.length;i++){
    var k=0;
    for(let j=0;j<brr[i].length;j++){
    k=k+parseInt(brr[i][j])
   
    }
     //console.log(k)
   crr.push(k)
 }
 console.log(brr[crr.indexOf(10)])

// }
// var crr=[]
// for(let i=0;i<brr.length;i++){
//     crr[i]=[];
//     for(let j=0;j<brr[i].length;j++){
//         crr[i][j]=parseInt(brr[i][j])
//     }
// }
//  return crr