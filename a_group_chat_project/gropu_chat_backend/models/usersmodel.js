const{DataTypes}=require("sequelize");
const sequelize=require("../dbconnection")
const Users=sequelize.define('Users',{
    name:{
type:DataTypes.STRING,
allowNull:true
    },
    email:{
        
type:DataTypes.STRING,
allowNull:true,
unique:true
    },
    phone:{
type:DataTypes.STRING,
allowNull:true,
unique:true
    },
    password:{
type:DataTypes.STRING,
allowNull:true
    }
 })
console.log("users table created")
module.exports=Users;