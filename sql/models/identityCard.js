const{Sequelize,DataTypes}=require("sequelize");
const sequelize=require("../utils/dbConnection")
const Identitycard=sequelize.define('Identitycard',{
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true,
        allowNull:false

    },
    cardNo:{
        
        type:DataTypes.INTEGER,
        unique:true,
    
        allowNull:false
    }
})
module.exports=Identitycard;