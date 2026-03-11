const {DataTypes}=require("sequelize");
const sequelize=require("../dbconnection");

const Messages=sequelize.define("Messages",{
message:{
type:DataTypes.STRING,
allowNull:false
},
roomName:{
type:DataTypes.STRING,
allowNull:false
},
time:{
type:DataTypes.STRING,
allowNull:true
}
});

module.exports=Messages;