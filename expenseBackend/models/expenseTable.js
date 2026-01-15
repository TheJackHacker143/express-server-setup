const{DataTypes}=require("sequelize");
const sequelize=require("../dbconnection")
const Expenses=sequelize.define('Expenses',{
    name:{
type:DataTypes.STRING,
allowNull:true
    },
    email:{
        
type:DataTypes.STRING,
allowNull:true,
unique:true
    },
    password:{
type:DataTypes.STRING,
allowNull:true
    }
})
console.log("expense table created")
module.exports=Expenses;