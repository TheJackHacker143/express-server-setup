const express=require("express")
const {aunthenticate}=require("../middleware/auth")
const expensecontroller=require("../controllers/expenseController")
const router=express.Router()
//const { aunthenticate } = require("../middleware/auth");
//const { getExpensesWithPagination } = require("../controllers/expenseController");

router.post("/",aunthenticate,expensecontroller.addentries)
router.put("/:id",aunthenticate,expensecontroller.updateEntry)
router.delete("/:id",aunthenticate,expensecontroller.deleteEntry)
router.get("/",aunthenticate,expensecontroller.getExpensesWithPagination)
router.get("/:userId",aunthenticate,expensecontroller.reteriveEntry)
//router.get("/:userId", aunthenticate, expenseController.getExpensesWithPagination);
//router.get("/:userId", auth.aunthenticate,expensecontroller.getExpensesWithPagination);

module.exports=router;