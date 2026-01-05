const express=require ("express")
const app=express()
const studentRoutes=require("./routes/studentsRoutes")
//const db=require("./utils/dbConnection")
app.use(express.json());
app.get("/",(req,res)=>{
    res.send("hello")
})
app.use("/students",studentRoutes)
app.listen(3000,(er)=>{
    console.log("erver is running")
})