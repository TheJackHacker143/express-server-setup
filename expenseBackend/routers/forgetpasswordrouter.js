const express=require("express")
const Mailbackend=require("../controllers/forgetmailcontroller")
const router=express.Router()
router.post("/forgotpassword",Mailbackend.addForgotPasswordRequest,Mailbackend.sendmail)
router.get("/resetpassword/:id",Mailbackend.resetpassword)
router.post("/resetpassword/:id",Mailbackend.updatepassword)

module.exports=router;