const{Sequelize,DataTypes}=require("sequelize");
const sequelize=require("../utils/dbConnection")
const Students=sequelize.define('Students',{
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true,
        allowNull:false

    },
    expense:{
type:DataTypes.STRING,
allowNull:false
    },
    description:{
        
type:DataTypes.STRING,
allowNull:false
    },
    category:{
type:DataTypes.STRING,
allowNull:false
    }
})
module.exports=Students;