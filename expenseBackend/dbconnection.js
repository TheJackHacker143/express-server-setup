const {Sequelize}=require("sequelize");
const sequelize=new Sequelize('testdb','root','123Jagan#',{
    host:"localhost",
    dialect:"mysql"
});
(async ()=>{
    try {
    await sequelize.authenticate()
    console.log("connection to the the database made successfully")
} catch (error) {
    console.log(error)
}})()

module.exports=sequelize;




































// const mysql=require("mysql2")
// const connection=mysql.createConnection(
//     {
//         host:"localhost",
//         user:"root",
//         password:"123Jagan#",
//         database:"testdb"
//     }
// )
// connection.connect((err)=>{
//     if(err){
//         console.log(err)
//         return
//     }
// console.log("no error")
// const createquery=` create table if not exists students (
// id int auto_increment primary key,
// name varchar(20),
// email varchar(20),
// age int
// ); `   
// connection.execute(createquery,(err)=>{
//     if(err){
//         console.log(err);
//         connection.end();
//         return;
//     }
//     console.log("table created")
// })
// const createquery2=` create table if not exists users (
// id int auto_increment primary key,
// name varchar(20),
// email varchar(20)
// ); `   
// connection.execute(createquery2,(err)=>{
//     if(err){
//         console.log(err);
//         connection.end();
//         return;
//     }
//     console.log("table created2")
// })
// const createquery3=` create table if not exists buses (
// id int auto_increment primary key,
// buscount int,
// availableSeats int
// ); `   
// connection.execute(createquery3,(err)=>{
//     if(err){
//         console.log(err);
//         connection.end();
//         return;
//     }
//     console.log("table created3")
// })

// })
// module.exports=connection;

