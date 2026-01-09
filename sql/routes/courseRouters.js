const express=require("express")
const coursecontroller=require("../controller/courseController")
const router=express.Router()
router.post("/addcourses",coursecontroller.addCourse)
router.post("/addstudentcourses",coursecontroller.addStudentToCourse)
module.exports=router;