const express=require("express")
const app=express()
const try1=require("./routers/productRoutes")
app.use("/api",try1)

app.listen(3000,()=>{
    console.log("all ok")
})
