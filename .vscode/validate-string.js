var s = "sharpener"
let sword=[]
    for (let i = 0; i < s.length; i++){
        sword[i]=s[i]
    }
    
    let start = 0
    let end = sword.length-1
    while (start < end) {
        [sword[start],sword[end]] = [sword[end],sword[start]]
        
        start++;
        end--;
    }
    let m=""
    for(let i=0;i<sword.length;i++){
        m=s[i]+m

    }
    if (m == s) {
        return(true);

    }
    else {
    return(false)
   }
