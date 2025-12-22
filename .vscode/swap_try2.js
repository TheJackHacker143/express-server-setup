arr=[19 ,12 ,11 ,7 ,5 ,1 ,4]
//function minSwapsToSort(arr) {
    count=0;
   // var min=arr[i];
    for(let i=0; i<arr.length;i++){
        var min=arr[i];
        
        for(var j=i+1;j<arr.length;j++){
            if(arr[i]>arr[j]){
                min=arr[j]
            }
                //arr[j]=arr[i]
 
 var swap=min
 min=arr[i]
 arr[i]=swap
}
if(arr[i]>min){
    count++
}
 }
        
    //console.log(count)
console.log(arr)
console.log(count)
//}
//console.log(minSwapsToSort(arr))