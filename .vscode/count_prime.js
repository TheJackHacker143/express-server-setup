let n=33
var brr=[2,3]
for(let i=4; i<n;i++){
    var count=0;
for(let j=2;j<=i/2;j++){
    if(i%j==0){
       count++ 

    }
    

}
if(count==0){
        brr.push(i)
    }
}
return (brr)