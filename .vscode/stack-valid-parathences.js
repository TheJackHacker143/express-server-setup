function isValid(s){
    let brr=[]
    let obj={
    "]" :"[","}":"{",")":"("
    }
for(let char of s){
    if(char in obj){
        if(obj[char]!==brr[brr.length-1]){
            return false
        }
        else{
            brr.pop()
        }
    }
    else{
        brr.push(char)
    }
}
return brr.length==0
}
console.log(isValid("{[]}(){[{()}]}"))
