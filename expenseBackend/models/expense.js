const{Sequelize,DataTypes}=require("sequelize");
const sequelize=require("../dbconnection")
const exp=sequelize.define('Expense',{
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true,
        allowNull:false

    },
    expense:{
type:DataTypes.STRING,
allowNull:true
    },
    description:{
        
type:DataTypes.STRING,
allowNull:true
    },
    category:{
type:DataTypes.STRING,
allowNull:true
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull:false
    }
//     comment:{
// type:DataTypes.STRING,
// allowNull:true
//     }
})
module.exports=exp;