 const db=require("../dbconnection")
 const Users= require("../models/UsersTable")
 const Expenses= require("../models/expense")
 const bcrypt=require("bcrypt")
 const jwt=require("jsonwebtoken")
 //for userid encryption
function generateAccesssToken(UserId){
  return jwt.sign({userId:UserId},'secretkey')
}

//fetch all columns users+expense for show leaderboard in frontend
const reteriveUsersExpenses= async (req,res)=>{
  try {
    const allUsers=await Users.findAll({ 
  include: {
        model:Expenses ,
        attributes: ["id", "expense","userId"]
      }
})
if(!allUsers){
  return res.status(404).json({message:"no users found"});
}
    res.status(200).json(allUsers)
  } 
  catch (error) {
    res.status(600).json({error:error.message});
  }

}

const addUsers = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const hash = await bcrypt.hash(password, 10);

    const user = await Users.create({
      name,
      email,
      password: hash
    });

    res.status(201).json({
      message: "Successfully created new user"
    });

  } catch (error) {
    res.status(400).json({ error: "User already exists" });
  }
};


const checkEntry = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1️⃣ Find user using findAll
    const users = await Users.findAll({
      where: { email }
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
      name:users.name,
      email:users.email,
      password:users.password,
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



// const checkEntry=async (req,res)=>{
//     try {console.log("hii",req.body)
//         const {email,password}=req.body
//         console.log(email,password)
//        const user = await Expenses.findAll({
//   where: { email }
// });
// console.log(user)
// if(user.length>0){}
//        if(user==null) { return res.status(200).json({message: "user not found" })}
//       else if(user && password != user.password ){
//         return res.status(200).json({
//   message: "Invalid password"
// });
//  }
//       else if(user && password == user.password){
//    return res.status(200).json({
//   message: "Login successful",
//   userId: user.id
// });

//  }
//     } catch (error) {
//         res.status(500).json({error:error.message})
//     }

// }
module.exports={addUsers,checkEntry,reteriveUsersExpenses}