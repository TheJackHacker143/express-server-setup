 const db=require("../dbconnection")
 const Expenses= require("../models/expenseTable")

const addExpenses=async (req,res)=>{
    try {
        const {name,email,password}=req.body
        console.log(name)
    
       const expense= await Expenses.create({
        name,email,password
        
       })

       res.status(201).json(expense)
    } catch (error) {
        res.status(400).json({er:"user already exists"})
    }

}
const checkEntry=async (req,res)=>{
    try {console.log("hii",req.body)
        const {email,password}=req.body
        console.log(email,password)
       const user = await Expenses.findOne({
  where: { email }
});
console.log(user)
       if(user==null) { return res.status(200).json({message: "user not found" })}
      else if(user && password != user.password ){
        return res.status(200).json({
  message: "Invalid password"
});
 }
      else if(user && password == user.password){
   return res.status(200).json({
  message: "Login successful",
  userId: user.id
});

 }
    } catch (error) {
        res.status(500).json({error:error.message})
    }

}
module.exports={addExpenses,checkEntry}