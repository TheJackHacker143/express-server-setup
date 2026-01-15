const express=require ("express")
const app=express()
const db=require("./dbconnection")
const expenseRoutes= require("./routers/expenseRouters")
var cors=require('cors')

//require("./models")
app.use(express.json());
app.use(cors())
app.get("/",(req,res)=>{
    res.send("hello")
})
app.use("/expense",expenseRoutes)
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
// app.listen(3000,(er)=>{
//     console.log("erver is running")
// })
