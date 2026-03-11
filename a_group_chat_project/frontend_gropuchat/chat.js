const messageInput=document.querySelector(".chat-input input");
const messageInput2=document.getElementById("image");
const sendButton=document.querySelector(".chat-input button");
const chatMessages=document.querySelector(".chat-messages");

const aiSuggestions=document.getElementById("aiSuggestions");
const smartReplies=document.getElementById("smartReplies");

let roomName="";

const socket=io("http://localhost:3000",{auth:{token:localStorage.getItem("token")}});

function getTime(){
const now=new Date();
return now.toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"});
}

function getDisplayName(email){
const saved=localStorage.getItem("nick_"+email);
if(saved){return saved;}
return email;
}

/* ================= FILE PREVIEW FUNCTION ================= */

function getFilePreview(url){

const cleanUrl=url.split("?")[0];
const ext=cleanUrl.split(".").pop().toLowerCase();

if(["jpg","jpeg","png","gif","webp"].includes(ext)){

return `
<img src="${url}"
onclick="openImagePreview('${url}')"
style="max-width:200px;border-radius:6px;cursor:pointer;">
`;

}

else{

return `
<a href="${url}" target="_blank" style="color:#0b93f6;text-decoration:underline;">
Open File
</a>
`;

}

}

/* ================= IMAGE PREVIEW MODAL ================= */

let imagePreview=document.createElement("div");

imagePreview.style.position="fixed";
imagePreview.style.top="0";
imagePreview.style.left="0";
imagePreview.style.width="100%";
imagePreview.style.height="100%";
imagePreview.style.background="rgba(0,0,0,0.9)";
imagePreview.style.display="none";
imagePreview.style.flexDirection="column";
imagePreview.style.alignItems="center";
imagePreview.style.justifyContent="center";
imagePreview.style.zIndex="9999";

imagePreview.innerHTML=`

<img id="previewImg" style="max-width:90%;max-height:80%;border-radius:10px;">

<br>

<a id="downloadImage"
style="color:white;font-size:18px;margin-top:20px;cursor:pointer;">
Download
</a>

`;

document.body.appendChild(imagePreview);

function openImagePreview(url){

document.getElementById("previewImg").src=url;

const downloadBtn=document.getElementById("downloadImage");

downloadBtn.href=url;
downloadBtn.download="chat-image";

imagePreview.style.display="flex";

}

imagePreview.addEventListener("click",function(){
imagePreview.style.display="none";
});

/* ================= CUSTOM RIGHT CLICK MENU ================= */

let contextMenu=document.createElement("div");

contextMenu.id="contextMenu";

contextMenu.style.position="absolute";
contextMenu.style.background="#fff";
contextMenu.style.border="1px solid #ccc";
contextMenu.style.padding="5px";
contextMenu.style.display="none";
contextMenu.style.cursor="pointer";

contextMenu.innerHTML="Save As";

document.body.appendChild(contextMenu);

let selectedEmail="";

document.addEventListener("contextmenu",function(e){

if(e.target.tagName==="BUTTON"&&e.target.dataset.email){

e.preventDefault();

selectedEmail=e.target.dataset.email;

contextMenu.style.top=e.pageY+"px";
contextMenu.style.left=e.pageX+"px";

contextMenu.style.display="block";

}

});

document.addEventListener("click",function(){
contextMenu.style.display="none";
});

contextMenu.addEventListener("click",function(){

let nickname=prompt("Enter name");

if(nickname&&selectedEmail){

localStorage.setItem("nick_"+selectedEmail,nickname);

let btn=document.querySelector(`[data-email='${selectedEmail}']`);

if(btn){
btn.innerText=nickname;
}

}

});

/* ================= AI PREDICTIVE TYPING ================= */

let typingTimer;

messageInput.addEventListener("input",function(){

clearTimeout(typingTimer);

const text=messageInput.value.trim();

if(text.length<3){
aiSuggestions.innerHTML="";
return;
}

typingTimer=setTimeout(async()=>{

try{

const res=await fetch("http://localhost:3000/ai/predict",{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({text})

});

const data=await res.json();

aiSuggestions.innerHTML="";

data.suggestions.forEach(s=>{

const btn=document.createElement("button");

btn.innerText=s;

btn.style.margin="3px";

btn.onclick=function(){

messageInput.value = s;

aiSuggestions.innerHTML="";

messageInput.focus();

};
aiSuggestions.appendChild(btn);

});

}catch(err){

console.log("AI error",err);

}

},600);

});

/* ================= SEND MESSAGE ================= */

async function sendMessage(){

let message;
let time=`${getTime()}`;

if(messageInput2.files.length>0){

const file=messageInput2.files[0];

try{

const formData=new FormData();

formData.append("file",file);
formData.append("roomName",roomName);
formData.append("time",time);

const res=await axios.post(
"http://localhost:3000/messages/fileupload",
formData,
{
headers:{
authorization:localStorage.getItem("token")
}
}
);

const fileKey=res.data.fileKey;

const urlRes=await axios.get(
`http://localhost:3000/messages/file?key=${fileKey}`,
{
headers:{
authorization:localStorage.getItem("token")
}
}
);

const fileUrl=urlRes.data.url;

message=fileUrl;

}catch(err){

console.log("file upload error",err);

alert("file upload failed");

return;

}

}

else if(messageInput.value){

message=messageInput.value.trim();

}

if(message===undefined){
alert("enter message");
return;
}

if(!roomName){
alert("Select chat first");
return;
}

const data={
message:message,
time:time
};

socket.emit("new-message",{data,roomName});

messageInput.value="";
messageInput2.value="";
aiSuggestions.innerHTML="";

}

sendButton.addEventListener("click",sendMessage);

messageInput.addEventListener("keypress",function(e){

if(e.key==="Enter"){
sendMessage();
}

});

/* ================= RECEIVE MESSAGE ================= */

socket.on("new-message",async(res)=>{

const messageElement=document.createElement("div");

const currentUserId=localStorage.getItem("id");

if(res.userid==currentUserId){
messageElement.classList.add("message","sent");
}
else{
messageElement.classList.add("message","received");
}

let messageHTML="";

if(res.message.startsWith("http")){
messageHTML=getFilePreview(res.message);
}
else{
messageHTML=`<div class="text">${res.message}</div>`;
}

messageElement.innerHTML=`

${messageHTML}

<div class="time">${getTime()}</div>

`;

chatMessages.appendChild(messageElement);

chatMessages.scrollTop=chatMessages.scrollHeight;

/* ===== AI SMART REPLIES ===== */

if(res.userid!=currentUserId){

try{

const aiRes=await fetch("http://localhost:3000/ai/replies",{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({message:res.message})

});

const data=await aiRes.json();

smartReplies.innerHTML="";

data.replies.forEach(r=>{

const btn=document.createElement("button");

btn.innerText=r;

btn.style.margin="3px";

btn.onclick=function(){

messageInput.value=r;

};

smartReplies.appendChild(btn);

});

}catch(err){

console.log("AI reply error",err);

}

}

});

/* ================= OLD MESSAGES ================= */

socket.on("old-messages",(messages)=>{

chatMessages.innerHTML="";

messages.forEach(msg=>{

const messageElement=document.createElement("div");

if(msg.UserId==localStorage.getItem("id")){
messageElement.classList.add("message","sent");
}
else{
messageElement.classList.add("message","received");
}

let messageHTML="";

if(msg.message.startsWith("http")){
messageHTML=getFilePreview(msg.message);
}
else{
messageHTML=`<div class="text">${msg.message}</div>`;
}

messageElement.innerHTML=`

${messageHTML}

<div class="time">${msg.time}</div>

`;

chatMessages.appendChild(messageElement);

});

chatMessages.scrollTop=chatMessages.scrollHeight;

});

/* ================= SEARCH USER ================= */

async function search(event){

try{

const myEmail=localStorage.getItem("email");

let email;

if(event.id==="searchButton"){

email=document.getElementById("searchEmail").value.trim();

if(!email){
alert("Enter email");
return;
}

}

else{

email=event.dataset.email;

}

const res=await axios.post(
"http://localhost:3000/users/emailverify",
{email}
);

if(res.data.success===true){

const listUsers=document.getElementById("listusers");

let existingButton=document.getElementById(email);

if(!existingButton&&event.id==="searchButton"){

const listButton=document.createElement("button");

listButton.innerText=getDisplayName(email);

listButton.id=email;

listButton.dataset.email=email;

listButton.onclick=function(){
search(this);
};

listUsers.appendChild(listButton);

}

document.getElementById("name").innerText=`Chatting with ${res.data.name}`;

chatMessages.innerHTML="";

const nameOfRoom=[myEmail,email].sort().join("-");

socket.emit("join-room",nameOfRoom);

roomName=nameOfRoom;

alert("Joined room: "+nameOfRoom);

}

else{
alert("User does not exist");
}

}catch(error){

console.log("Search error:",error);

}

}