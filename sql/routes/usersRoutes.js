const express=require("express")
const studentcontroller=require("../controller/usersControllers")
const router=express.Router()
router.post("/",studentcontroller.addentries)
router.get("/",studentcontroller.reteriveEntry)
module.exports=router;