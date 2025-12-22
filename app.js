const express=require("express")
const app=express()
app.use((req,res,next)=>{
    console.log("hii")
    //res.send('<h1>helloooo</h1>')
    next()
})

app.use((req,res,next)=>{
    console.log("hii1")
    res.send('<h1>hello jagan</h1>')
})
app.listen(3000)