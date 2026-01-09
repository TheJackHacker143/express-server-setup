const express=require ("express")
const app=express()
const studentRoutes=require("./routes/studentsRoutes")

const courseRoutes=require("./routes/courseRouters")
 const Student= require("./models/students")
const usersRoutes=require("./routes/usersRoutes")
const busesRoutes=require("./routes/busesRoutes")
const db=require("./utils/dbConnection")
var cors=require('cors')

require("./models")
app.use(express.json());
app.use(cors())
app.get("/",(req,res)=>{
    res.send("hello")
})
app.use("/students",studentRoutes)
app.use("/users",usersRoutes)
app.use("/buses",busesRoutes)
app.use("/courses",courseRoutes)
// db.query("SET FOREIGN_KEY_CHECKS = 0")
//   .then(() => {
//     return db.sync({ force: true });
//   })
//   .then(() => {
//     app.listen(3000, () => {
//       console.log("server is running");
//     });
//   })
//   .catch(err => {
//     console.log(err);
//   });


db.sync({force:false}).then(()=>{

app.listen(3000,(er)=>{
    console.log("erver is running")
})
}).catch((err)=>{
    console.log(err)
})