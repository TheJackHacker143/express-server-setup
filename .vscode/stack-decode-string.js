let s="3[a2[c]e]f"
var decodeString = function(s) {
    let strstack=[]
    let numstack=[]
    let k=0
    let curstr=""
    for(let key of s){
        if(!(isNaN(key))){
            k=k*10+Number(key)
        }
        else if(key=="["){
            strstack.push(curstr)
            numstack.push(k)
            k=0
            curstr=""
        }
        else if(key=="]"){
            if(strstack.length>=0){
                var prestr=strstack.pop()
            }
            if(numstack.length>=0){
                var prenum=numstack.pop()
            }
            let loopstr=""
            for(let i=0;i<prenum;i++){
                loopstr+=curstr
            }
            curstr=prestr+loopstr
        }
        else{
            curstr+=key;
        }
    }
    return curstr
};
console.log(decodeString(s))