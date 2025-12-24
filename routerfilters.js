
const express=require("express")
const app=express()
const try1=require("./routers/orders")
const try2=require("./routers/users")
app.use("/orders",try1)

app.use("/users",try2)
app.listen(3000)