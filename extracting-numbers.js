str = "abc334v44d"
let num=0;
let value=false;
var result=[]
for(let i=0;i<str.length;i++){
    let som=str.charCodeAt(i)
    if(som>=48&&som<=57){
        num=num*10+(som-48)
        value=true
    }
    else{
        if(value){
            result.push(num)
            num=0;
            value=false

        }
    }
}
if(value){
    result.push(num)
}
return(result)




// var s = "abc334v44d";
// var ptr = [];
// xtr = [];
// var n = 0;
// var m = -1;
// var length = s.length;

// for (let j = 0; j < length; j++) {
//     for (let i = 48; i < 58; i++) {
//         if (s.charCodeAt(j) == i) {
//             m++;
//             ptr[m] = s[j];
//             for (let k = 97; k < 123; k++) {
//                 if (s.charCodeAt(j + 1) == k) {
//                     // ✅ push a copy of ptr instead of reference
//                     xtr[n] = [...ptr];  
//                     n++;
//                     // reset ptr + m for next group
//                     ptr = [];
//                     m = -1;
//                     break;
//                 }
//             }
//         }
//     }
// }
// console.log(xtr);
