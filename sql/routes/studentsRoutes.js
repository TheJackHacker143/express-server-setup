const express=require("express")
const studentcontroller=require("../controller/studentsController")
const router=express.Router()
router.post("/add",studentcontroller.addentries)
router.put("/update/:id",studentcontroller.updateEntry)
router.delete("/delete/:id",studentcontroller.deleteEntry)
module.exports=router;