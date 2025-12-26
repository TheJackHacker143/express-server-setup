const express=require("express")
const app=express.Router()
const students = [{ id: 1, name: "Frontend", description: "HTML, CSS, JS, React" },{ id: 2, name: "Backend", description: "Node.js, Express, MongoDB" }];
app.get("/",(req,res)=>{
    let arr=[]
students.forEach((e)=>{
    arr.push(e.name)
})
res.send(`${arr}`)
})
app.get("/:id",(req,res)=>{
    if(req.params.id>2 || req.params.id<=0) res.send("not valid course")
  const student_id=students.filter(e => {
    return e.id==req.params.id
  });
    res.send(`name-${student_id[0].name} des-${student_id[0].description}`)
})
module.exports=app