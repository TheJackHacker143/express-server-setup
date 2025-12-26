const express=require("express")
const app=express.Router()

app.get("/",(req,res)=>{
    res.send("users list")
})
app.post("/",(re,res)=>{
    res.send("users list")
})
module.exports=app