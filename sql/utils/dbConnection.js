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
const createquery=` create table if not exists students (
id int auto_increment primary key,
name varchar(20),
email varchar(20)
); `   
connection.execute(createquery,(err)=>{
    if(err){
        console.log(err);
        connection.end();
        return;
    }
    console.log("table created")
})
})
module.exports=connection;

