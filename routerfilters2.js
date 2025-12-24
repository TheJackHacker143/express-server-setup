const express=require("express")
const app=express()
const try1=require("./routers/books")
app.use("/books",try1)
app.listen(3000,()=>{
    console.log("all ok")
})
