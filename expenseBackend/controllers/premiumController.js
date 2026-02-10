
 const Users= require("../models/UsersTable")
 const updatePremiumStatus= async(req,res)=>{
    try{
       // const{isPremiumUser}=req.body;
        const userId=req.params.id;
        const user= await Users.findByPk(userId);
        if(!user){
            return  res.status(404).json({message:"User not found"});
 

        }
        user.isPremiumUser=true;
        await user.save();
        res.status(200).json({user});
    }catch(error){
        console.error("Error updating premium status:",error);
        res.status(500).json({message:"Internal server error"});
    }
    }
   const getpremiumStatus=async(req,res)=>{
    try{
        const userId=req.params.id;
        const user= await Users.findByPk(userId);
        if(!user){
            return  res.status(404).json({message:"User not found by get premium statud"});
        }
        res.status(200).json({user});
    }catch(error){
        console.error("Error getting premium status:",error);
        res.status(500).json({message:"Internal server error"});
    }
    }

    module.exports={updatePremiumStatus,getpremiumStatus}