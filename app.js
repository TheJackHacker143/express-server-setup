const express=require("express")
const app=express()
app.use("/welcome",(req,res,next)=>{
    req.user="guest"
    console.log(req.noDelay)
    res.send(`<h1>welcome ${req.user}</h1>`)
})

app.listen(3000)