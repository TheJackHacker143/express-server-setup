n=10
if(n < 2) return 0
    let arr = new Array(n).fill(true)
    arr[0] = arr[1] = false
    for (let i = 2; i * i < n; i++){
        for (let j = i * i; j < n; j += i){
            if (arr[i]) {
                arr[j]=false
            }
        }
    }
    console.log(arr)
    let count=0
    for (let i = 0; i < arr.length; i++){
        if (arr[i] == true) {
            count++
        }
    }
    console.log(count)