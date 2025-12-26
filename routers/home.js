const express=require("express")
const app=express.Router()
app.get("/",(req,res)=>{

    res.send("wlcome")
})
app.post("/",(req,res)=>{
    res.send("welcome")
})
module.exports=app