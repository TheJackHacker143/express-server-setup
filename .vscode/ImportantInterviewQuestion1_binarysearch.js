arr= [1,2,1,3,5,6,4]
var findPeakElement = function(arr) {
    arr[-1] = arr[0] - 1;
    arr[arr.length] = arr[arr.length - 1]-1;
    for (let i = 0; i < arr.length-1; i++) {
        if (arr[i - 1] < arr[i] && arr[i] > arr[i + 1]) {
            return(arr.indexOf(arr[i]))
        }
    }
};
console.log(findPeakElement(arr))