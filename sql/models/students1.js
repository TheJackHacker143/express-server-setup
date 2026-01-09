const{Sequelize,DataTypes}=require("sequelize");
const sequelize=require("../utils/dbConnection")
const Students1=sequelize.define('Students1',{
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true,
        allowNull:false

    },
    name:{
type:DataTypes.STRING,
allowNull:false
    }
})
module.exports=Students1;