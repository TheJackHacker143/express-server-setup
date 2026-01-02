const express=require ("express")
const app=express()
const mysql=require("mysql2")
const connection=mysql.createConnection(
    {
        host:"localhost",
        user:"root",
        password:"123Jagan#",
        database:"testdb"
    }
)
connection.connect((err)=>{
    if(err){
        console.log(err)
        return
    }

console.log("no error")
const createquery=` create table Users (
id int auto_increment primary key,
name varchar(20),
email varchar(20)
); `
const query2=`create table buses(id int auto_increment primary key,
 totalseats int, availableseats int);`
connection.execute(createquery,(err)=>{
    if(err){
    console.log(err)
    connection.end()
    return
} console.log("table created")}
)

 connection.execute(query2,(err)=>{
    if(err){
    console.log(err)
    connection.end()
    return
} console.log("table created2")}
)
   
})

    


app.get("/",(req,res)=>{
    res.send("hello")
})
app.listen(3000,(er)=>{
    console.log("erver is running")
})