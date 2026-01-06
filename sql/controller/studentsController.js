 const db=require("../utils/dbConnection")
 const Student= require("../models/students")
const addentries=async (req,res)=>{
    try {
        const {email,name}=req.body
    
       const student= await Student.create({
        name:name,
        email:email
       })
       res.status(201).send(`user ${name}inserted`)
    } catch (error) {
        res.status(500).send("unable to entry")
    }

}
const updateEntry=async (req,res)=>{
    try {
        const {name}=req.body
    const id=req.params.id
       const student= await Student.findByPk(id)
       if(!student) {res.status(404).send("user mot found")}
       student.name=name
    await student.save();
       res.status(200).send(`user ${name} has been updated`)
    } catch (error) {
        res.status(500).send("unable to upadte")
    }

}
const deleteEntry=async (req,res)=>{
        try {
        const {name}=req.body
    const id=req.params.id
       const student= await Student.destroy({
        where:{
            id:id
        }
       })
       if(!student) {res.status(404).send("user mot found")}

       res.status(200).send(`user ${name} has been deleted`)
    } catch (error) {
        res.status(500).send("unable to delete")
    }

}
const reteriveEntry=async (req,res)=>{
    try {
        const {email,name}=req.body
    
       const student= await Student.create({
        name:name,
        email:email
       })
       res.status(201).send(`user ${name}inserted`)
    } catch (error) {
        res.status(500).send("unable to entry")
    }

}


 module.exports={addentries,updateEntry,deleteEntry,reteriveEntry}
























 // const addentries=(req,res)=>{
//     const {email,name,age}=req.body
// const insertQuery=`insert into students (email,name,age) values(?,?,?)`
// db.query(insertQuery,[email,name,age],(err)=>{
//     if(err){
//         console.log(err);
//         res.status(500).send(err.message)
//         db.end();
//         return;
//     }
//     console.log("value inserted")
//     res.status(200).send(`students with name ${name} added`)
// })
// }
// const updateEntry=(req,res)=>{
//     const id=req.params.id
//     const {name}=req.body
//     console.log("PARAM ID:", id);
// console.log("BODY NAME:", name);

//     const updateQuery="update students set name= ? where id= ?";
//     db.query(updateQuery,[name,id],(err,result)=>{
//         if(err){
//             console.log(err.message)
//             res.status(500).send(err.message)
//             //db.end();
//             return;
//         }
//         if(result.affectedRows===0){
//             console.log("updated not succssfully")
            
//             res.status(400).send("student not found")
// return;
//         }
//         res.status(200).send("student  updated")

//             console.log("updated succssfully")
// })
// }
// const deleteEntry=(req,res)=>{
//     const id=req.params.id
//     const deleteQuery=`delete from students where id=?`
//     db.query(deleteQuery,[id],(err,result)=>{
// res.send("hello")
//     })
// }
// const reteriveEntry=(req,res)=>{
//     db.query("SELECT * FROM students", (err, result) => {
//     if (err) return res.status(500).send("DB error");
//     console.log(result)
//     res.send(result); // ✅ yahan actual DB data hota hai
//   });
// }
// module.exports={addentries,updateEntry,deleteEntry,reteriveEntry}
