arr=[9 ,10 ,8 ,15 ,12 ,1 ,2 ,3 ,4 ,5]
//function minSwapsToSort(arr) {
    count=0;
    var min;
    for(let i=0; i<arr.length;i++){
         min=i;
        for(var j=i+1;j<arr.length;j++){
            if(arr[min]>arr[j]){
                min=j
            }
 }
 var swap=arr[min];
 arr[min]=arr[i]
 arr[i]=swap
 
 if(arr[i]<arr[min]){
    count++
 }
 }
 
 
        
    //console.log(count)
console.log(arr)
console.log(count)
//}
//console.log(minSwapsToSort(arr))