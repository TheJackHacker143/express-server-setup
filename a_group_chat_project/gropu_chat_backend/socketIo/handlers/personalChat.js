const Messages=require("../../models/messagetable");

module.exports=(socket,io)=>{

socket.on("join-room",async(roomName)=>{

console.log("User",socket.user.name,"joined room:",roomName);

const currentRooms=Array.from(socket.rooms);

currentRooms.forEach((room)=>{
if(room!==socket.id){
socket.leave(room);
}
});

socket.join(roomName);

/* LOAD OLD MESSAGES */

const oldMessages=await Messages.findAll({
where:{roomName},
order:[["createdAt","ASC"]]
});

socket.emit("old-messages",oldMessages);

});


socket.on("new-message",async({data,roomName})=>{

console.log("User",socket.user.name,"said:",data.message,"in room:",roomName);

/* SAVE MESSAGE */

await Messages.create({
message:data.message,
roomName:roomName,
UserId:socket.user.id,
time:data.time
});

/* SEND MESSAGE */

io.to(roomName).emit("new-message",{
username:socket.user.name,
message:data.message,
userid:socket.user.id
});

});

};