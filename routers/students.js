const express=require("express")
const app=express.Router()
const students = [{ id: 1, name: "Alice" },{ id: 2, name: "Bob" },{ id: 3, name: "Charlie" }];
app.get("/",(req,res)=>{
  let arr=[]
students.forEach((e)=>{
    arr.push(e.name)
})
res.send(`${arr}`)
})
app.get("/:id",(req,res)=>{
    if(req.params.id>3 || req.params.id<=0) res.send("not valid student")
  const student_id=students.filter(e => {
    return e.id==req.params.id
  });
    res.send(`hii${student_id[0].name}`)
})
module.exports=app