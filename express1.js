const express=require('express')
const app=express()
console.log(1)
app.get('/orders',(req,res)=>{
    console.log(`server is running`)
    res.send("Here  the list of all orders.")

})
app.post("/orders",(req,res)=>{
    res.send("A new order has been created.")
})
app.get("/users",(req,res)=>{
    res.send("Here is the list of all users.")
})
app.post("/users",(req,res)=>{
res.send("A new user has been added."

)
})
app.listen(3200)