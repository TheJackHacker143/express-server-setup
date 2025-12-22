arr=[3,4,2,6,8,1]
let swap=0
for (let i = 0; i < arr.length; i++){
        let max=i
        for(let j=i+1;j<arr.length;j++){
            if(arr[max]<arr[j]){
                max=j

            }
        }
        swap=arr[i]
        arr[i]=arr[max]
        arr[max]=swap
    }
console.log(arr)