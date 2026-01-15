const express=require("express")
const expensecontroller=require("../controllers/expenseController")
const router=express.Router()
router.post("/signup",expensecontroller.addExpenses)
router.put("/:id",expensecontroller.addExpenses)
router.delete("/:id",expensecontroller.addExpenses)
router.get("/signup",expensecontroller.addExpenses)
router.post("/login",expensecontroller.checkEntry)

module.exports=router;