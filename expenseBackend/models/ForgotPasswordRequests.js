const{DataTypes}=require("sequelize");
const { v4: uuidv4 } = require('uuid')
const sequelize=require("../dbconnection")
const ForgotPasswordRequests=sequelize.define('ForgotPasswordRequests',{
    id:{
        type:DataTypes.UUID,
        primaryKey:true,
        defaultValue:uuidv4,
        allowNull:false},
    isactive:DataTypes.BOOLEAN

})
console.log("users table created")
module.exports=ForgotPasswordRequests;