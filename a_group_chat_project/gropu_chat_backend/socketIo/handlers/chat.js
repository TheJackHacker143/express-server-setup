module.exports = (socket,io) => {
    console.log("User connected",socket.id);

    socket.on("chat-message",(data)=>{
        console.log("user",socket.id,"said",data.data.message);
        io.emit("chat-message",{userName:socket.user.name,message:data.data.message}) // send to all clients 
    });

    socket.on("disconnect",()=>{
        console.log("User disconnected");
    });
};