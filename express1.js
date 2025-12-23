const express=require('express')
const app=express()
app.get('/orders/:username',(req,res)=>{
    const name=req.params.username
    const role=req.query.role

    console.log(`server is running`)
    res.send(`<h1>welcome ${name},${role}</h1>`)
})
app.listen(3000)