const {Sequelize}=require("sequelize");
const sequelize=new Sequelize('groupchat','root','123Jagan#',{
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