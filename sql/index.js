const express=require ("express")
const app=express()
const studentRoutes=require("./routes/studentsRoutes")

 const Student= require("./models/students")
const usersRoutes=require("./routes/usersRoutes")
const busesRoutes=require("./routes/busesRoutes")
const db=require("./utils/dbConnection")
var cors=require('cors')

app.use(express.json());
app.use(cors())
app.get("/",(req,res)=>{
    res.send("hello")
})
app.use("/students",studentRoutes)
app.use("/users",usersRoutes)
app.use("/buses",busesRoutes)

db.sync({force:false}).then(()=>{

app.listen(3000,(er)=>{
    console.log("erver is running")
})
}).catch((err)=>{
    console.log(err)
})