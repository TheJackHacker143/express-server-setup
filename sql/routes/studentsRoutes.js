const express=require("express")
const studentcontroller=require("../controller/studentsController")
const router=express.Router()
router.post("/",studentcontroller.addentries)
router.put("/:id",studentcontroller.updateEntry)
router.post("/adding",studentcontroller.addValStudentsAndIdentitycardTable)
router.delete("/:id",studentcontroller.deleteEntry)
router.get("/",studentcontroller.reteriveEntry)
router.get("/:id",studentcontroller.reteriveEntry)

module.exports=router;