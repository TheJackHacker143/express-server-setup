const express=require("express")
const auth=require("../middleware/auth")
const expensecontroller=require("../controllers/expenseController")
const router=express.Router()
router.post("/",expensecontroller.addentries)
router.put("/:id",expensecontroller.updateEntry)
router.delete("/:id",expensecontroller.deleteEntry)
router.get("/",expensecontroller.reteriveEntry)
router.get("/:userId",auth.aunthenticate,expensecontroller.reteriveEntry)

module.exports=router;