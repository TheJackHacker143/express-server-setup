require("dotenv").config();
require("./cron/ArchivedChat");
const http = require("http");
const express=require ("express")
const db=require("./dbconnection")
const usersTomessages=require("./models/usersTOmessages")
const oldDataArchivedChatTable=require("./models/oldDataArchivedChat")
const userMessagesRoutes=require("./routers/usermessagesRoutes")

const userRoutes=require("./routers/userRouters")
const socketIo=require("./socketIo/index")
const cors=require("cors")

const app=express()

app.use(cors())
app.use(express.json())

const aiRoutes = require("./routers/aiRoutes");
app.use("/ai", aiRoutes);
app.use("/users",userRoutes)
app.use("/messages",userMessagesRoutes)

const server = http.createServer(app);
socketIo(server) // Initialize Socket.IO with the server

db.sync().then(()=>{
server.listen(3000,()=>{
console.log("server is running")
})
})
