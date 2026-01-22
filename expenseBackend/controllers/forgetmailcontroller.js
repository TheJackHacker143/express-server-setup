const ForgetMail=require("../models/ForgotPasswordRequests")
const Users=require("../models/UsersTable")
 const bcrypt=require("bcrypt")

//add to forgotpasswordrequests 
const addForgotPasswordRequest=async (req,res,next)=>{
    try {
        const findUserId= await Users.findOne({where:{email:req.body.email}})
        console.log("findUserId",findUserId.id)
        const saved= await ForgetMail.create({isactive:true, userId:findUserId.id})
        console.log("post to forgrt tablr",saved)
        next()
    } catch (error) {
        console.log("error in adding forgot password request",error)
    }
}



const sendmail = async (req, res) => {
    try {
       var uid= await Users.findAll({where:{email:req.body.email},
        include:[{model:ForgetMail}]})
        var id=uid[0].ForgotPasswordRequests[0].id     
        console.log("uid for pass rest",uid,id)
    } catch (error) {
        console.log("error in fetching user id for forgot password",error)
    }
    const{email}=req.body
  const { request } = require("express");
  const SibApiV3Sdk=require("sib-api-v3-sdk")
  require("dotenv").config()
  const client = SibApiV3Sdk.ApiClient.instance;
  const apiKey=client.authentications['api-key']
  apiKey.apiKey=process.env.SENDINBLUE_API_KEY
  const transEmailApi=new SibApiV3Sdk.TransactionalEmailsApi()
  const sender={
      email:"nojagudada@gmail.com",
      name:"Jagan"
  
  }
  const receiver=[
      {email:email},
  
  ]
  transEmailApi.sendTransacEmail({
      sender,
      to:receiver,
      subject:"RESET YOUR PASSWORD",
        htmlContent:`<a href=http://localhost:3000/password/resetpassword/${id}>Click here to reset your password</a>`
  }).then(response=>{
      console.log("Email sent successfully",response)}).catch(error=>{
      console.log(
      " Error sending email",
      error.response?.body || error)
      })
      console.log("mailbackend.js run",email)
  
  
  
};
const resetpassword=async(req,res)=>{
    try {
        const checkIsactive= await ForgetMail.findOne({where:{id:req.params.id}})
        console.log("checkIsactive",checkIsactive)
        if(req.params.id && checkIsactive.isactive) {
         res.status(200).sendFile("C:/Users/parid/OneDrive/Desktop/nodetry/expense2/resetpassword.html")
         
        }
    } catch (error) {
        console.log("error in reset password link",error)
    }
}
const updatepassword=async(req,res)=>{
    try {
        const findRequest= await ForgetMail.findOne({where:{id:req.params.id}})
        console.log("findRequest",findRequest)
        const findUser= await Users.findOne({where:{id:findRequest.userId}})
        console.log("findUser",findUser)
        const newpassword=req.body.password
        const hash = await bcrypt.hash(newpassword, 10);
        const updatepassword= await Users.update({
            password:hash
        },{where:{id:findUser.id}})
        //save password updated
        await findUser.save()
        res.status(200).json({message:"Password reset successfully!",updatepassword})
        console.log("password updated",updatepassword)
    } catch (error) {
        console.log("error in updating password",error)
    }
}

module.exports={sendmail,addForgotPasswordRequest,resetpassword,updatepassword}