const express=require("express")
const usercontroler=require("../controllers/usersController")
const router=express.Router()
router.post("/signup",usercontroler.addUsers)
router.get("/signup",(req,res)=>{
    res.send("signup")
})
router.post("/login",usercontroler.checkEntry)
router.post("/emailverify",usercontroler.checkVerified)
module.exports=router;