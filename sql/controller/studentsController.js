 const db=require("../utils/dbConnection")
 const Student= require("../models/students")
 const Identitycard=require("../models/identityCard")
 const Student1= require("../models/students1")


 //const project2=require("../../project2/project2")
const addentries=async (req,res)=>{
    try {
        const {expense,description,category}=req.body
    
       const student= await Student.create({
        expense:expense,
        description:description,
        category:category
        
       })
       res.status(201).json(student)
    } catch (error) {
        res.status(500).send("unable to entry")
    }

}

const addValStudentsAndIdentitycardTable=async (req,res)=>{
    
     try {
        const student1= await Student1.create(req.body.student1)
        console .log("hii",student1.id)
        const Idcard=await Identitycard.bulkCreate(
            req.body.Idcard.map(card=>({
                ...card, Students1Id:student1.id
            })),
            
        )
        res.status(201).json({student1,Idcard})
    } catch (error) {
        res.status(500).json({error:error.message})
    }
}
const updateEntry=async (req,res)=>{
    try {
        const {expense,description,category}=req.body
        const id=req.params.id
    
       const student= await Student.findByPk(id)
       if(!student) {res.status(404).send("user mot found")}
       student.expense=expense
       student.description=description
       student.category=category
    await student.save();
       res.status(200).json(student)
    } catch (error) {
        res.status(500).send("unable to upadte")
    }

}
const deleteEntry=async (req,res)=>{
        try {
        
    const id=req.params.id
       const student= await Student.destroy({
        where:{
            id:id
        }
       })
       if(!student) {res.status(404).send("user mot found")}

       res.status(200).send("delted")
    } catch (error) {
        res.status(500).send("unable to delete")
    }

}
const reteriveEntry=async (req,res)=>{
   try {
    const student = await Student.findAll(); // ✅ pura table
    res.json(student); // frontend ko bhej diya
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch users" });
  } 
}


 module.exports={addentries,updateEntry,deleteEntry,reteriveEntry,addValStudentsAndIdentitycardTable}
























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
