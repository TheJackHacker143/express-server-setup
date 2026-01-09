 const db=require("../utils/dbConnection")
 const Course= require("../models/courses")
const  Student1 = require("../models/students1")
const addCourse=async (req,res)=>{
    try {
        const {name}=req.body
    
       const course= await Course.create({
        name:name,
        
       })
       res.status(201).json(course)
    } catch (error) {
        res.status(500).json({error:error.message})
    }

}
const addStudentToCourse=async (req,res)=>{
    try {
        const {studentId,courseId}=req.body
    
       const student= await Student1.findByPk(studentId)
       const course=await Course.findAll({
        where:{
            id:courseId
        }
       })
      // if(!student) {res.status(404).send("user mot found")}
       await student.addCourses(course)
       const updateStudent= await Student1.findByPk(studentId,{include:Course})
       
       res.status(200).json(updateStudent)
       
    } catch (error) {
        res.status(500).json({error:error.message})
    }

}

module.exports={addCourse,addStudentToCourse}