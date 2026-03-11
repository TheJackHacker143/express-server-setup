const { Server } = require("socket.io");
const socketAuth = require("../middleware/socketAuth");
const chatHandler = require("./handlers/chat");
const personalChatHandler = require("./handlers/personalChat");
module.exports = (server) => {
    //todo socket authentication using token from local storage in frontend and verify it in backend using socket middleware
console.log("Initializing Socket.IO...");
    const io = new Server(server,{
    cors:{
        origin:"*"
    }
});
console.log("Socket.IO initialized successfully.");
socketAuth(io) // Apply authentication middleware to Socket.IO
console.log("Socket authentication middleware applied.");
io.on("connection",(socket)=>{
    chatHandler(socket,io) // Handle chat events for the connected socket
    personalChatHandler(socket,io) // Handle personal chat events for the connected socket
    
});
console.log("Socket.IO connection handler set up.");

};