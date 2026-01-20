const express=require("express")
const userscontroller=require("../controllers/usersController")
const router=express.Router()
router.post("/signup",userscontroller.addUsers)
router.put("/:id",userscontroller.addUsers)
router.delete("/:id",userscontroller.addUsers)
router.get("/signup",userscontroller.addUsers)
router.post("/login",userscontroller.checkEntry)
router.get("/",userscontroller.reteriveUsersExpenses)

module.exports=router;