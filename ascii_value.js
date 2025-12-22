
const ame='varun';
var sans=String.fromCharCode(219-(ame.charCodeAt(0)))
var ans;
for(let i=1;i <ame.length;i++){
    
    ans=String.fromCharCode(219-(ame.charCodeAt(i)))
    sans=sans+ans;
}
console.log(sans)