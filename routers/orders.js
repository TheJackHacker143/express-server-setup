const express=require("express")
const app=express.Router()

app.get("/",(req,res)=>{
    res.send("orders list")
})
app.post("/",(req,res)=>{
    res.send("orders list")
})
module.exports=app