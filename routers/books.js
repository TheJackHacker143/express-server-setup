const express=require("express")
const app=express.Router()
app.get("/",(req,res)=>{
    //console.log("okkkkkk")
    res.send("Here is the list of books!")
})
app.post("/",(req,res)=>{
    res.send("Book has been added!")
})
module.exports=app