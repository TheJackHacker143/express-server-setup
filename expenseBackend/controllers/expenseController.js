 const db=require("../dbconnection")
 const Expense= require("../models/expense")
 const jswt= require('jsonwebtoken');
 //const Identitycard=require("../models/identityCard")
 //const Student1= require("../models/students1")
//const UserName = require("../models/userName");

 //const project2=require("../../project2/project2")
const addentries=async (req,res)=>{
    try {
        
        const {expense,description,category}=req.body
    //const decoded=jswt.verify(userId, 'secretkey');
       const exp= await Expense.create({
        expense:expense,
        description:description,
        category:category,
        userId:req.user.id
       // comment:comment
        
       })
       res.status(201).json(exp)
    } catch (error) {
        res.status(500).send("unable to add expense")
    }

}

// const addValStudentsAndIdentitycardTable=async (req,res)=>{
    
//      try {
//         const student1= await Student1.create(req.body.student1)
//         console .log("hii",student1.id)
//         const Idcard=await Identitycard.bulkCreate(
//             req.body.Idcard.map(card=>({
//                 ...card, Students1Id:student1.id
//             })),
            
//         )
//         res.status(201).json({student1,Idcard})
//     } catch (error) {
//         res.status(500).json({error:error.message})
//     }
// }
const updateEntry=async (req,res)=>{
    try {
        const {expense,description,category}=req.body
    
       const exp= await Expense.update({
        expense:expense,
        description:description,
        category:category,
        //comment:comment
        
       }, { where: { id: req.params.id, userId: req.user.id } })
       res.status(201).json({ message: "Updated" })
    } catch (error) {
        res.status(500).send("unpdte failed")
    }

    

}
const deleteEntry=async (req,res)=>{
        try {
        
    const id=req.params.id
       const exp= await Expense.destroy({
        where:{
            id:id
        }
       })
       if(!exp) {res.status(404).send("user mot found")}

       res.status(200).send("delted")
    } catch (error) {
        res.status(500).send("unable to delete")
    }

}
const reteriveEntry=async (req,res)=>{

try {
    const exp = await Expense.findAll({
        where:{ userId:req.user.id

        }
    });
console.log(exp)
   
    res.json(exp);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

const getExpensesWithPagination = async (req, res) => {
  try {
    // 1️⃣ page & limit query se lo
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 5;

    // 2️⃣ offset calculate karo
    const offset = (page - 1) * limit;

    // 3️⃣ DB se paginated data + count
    const { count, rows } = await Expense.findAndCountAll({
      where: { userId: req.user.id },   // auth middleware se
      limit: limit,
      offset: offset,
      order: [["createdAt", "DESC"]],
    });

    // 4️⃣ response bhejo
    res.status(200).json({
      expenses: rows,
      currentPage: page,
      totalPages: Math.ceil(count / limit),
      totalItems: count,
    });

  } catch (err) {
    console.log(" error is",err);
    res.status(500).json({ error: err.message });
  }
};

//module.exports = { getExpensesWithPagination };



 module.exports={addentries,updateEntry,deleteEntry,reteriveEntry,getExpensesWithPagination}
























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
