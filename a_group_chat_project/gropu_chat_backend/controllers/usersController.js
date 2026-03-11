const db=require("../dbconnection")
 const Users= require("../models/usersmodel")
 const bcrypt=require("bcrypt")
 const jwt=require("jsonwebtoken")
 function generateAccesssToken(UserId){
   return jwt.sign({userId:UserId},process.env.JWT_SECRET,{expiresIn:"1h"})
 }
 

const addUsers = async (req, res) => {
  try {
    const { name, email, password,phone } = req.body;

    const hash = await bcrypt.hash(password, 10);

    const user = await Users.create({
      name,
      email,
      phone,
      password: hash
    });

    res.status(201).json({
      message: "Successfully created new user"
    });

  } catch (error) {
    console.log("erorrr",error.errors[0].message);
    
  res.status(400).json({ message: error.errors[0].message });
}
};

const checkEntry = async (req, res) => {
  try {
    const { email, password,phone } = req.body;

    // 1️⃣ Find user using findAll
    const users = await Users.findAll({
      where: { email,phone }
    });
//console.log(users)
    //  Check user exists or not
    if (users.length === 0) {
      return res.status(200).json({
        
        success: false,
        message: "User does not exist"
      });
    }

    // Ideally length is 1 (unique email)
    const user = users[0];

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
//console.log(isMatch)
    if (!isMatch) {
      return res.status(200).json({
        success: false,
        message: "Password is incorrect"
      });
    }

    //  Login success
    return res.status(200).json({
      name:user.name,
      email:user.email,
      password:user.password,
      id: user.id,
      success: true,
      message: "User logged in successfully",
      token: generateAccesssToken(user.id)
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
//check user verified or not by email
const checkVerified=async(req,res)=>{
  try {
    const { email } = req.body;
    const users = await Users.findOne({
      where: { email }
    });
    if (!users) {
      return res.status(200).json({
        success: false,
        message: "User does not exist"
      });
    }
    res.status(200).json({
      success: true,
      message: "User is verified",
      email:users.email,
      name:users.name
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
}

module.exports={addUsers,checkEntry,checkVerified}
