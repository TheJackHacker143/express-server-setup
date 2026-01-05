const express=require("express")
const studentcontroller=require("../controller/busesControllers")
const router=express.Router()
router.post("/",studentcontroller.addentries)
router.get("/available/:seats",studentcontroller.reteriveEntry)
module.exports=router;