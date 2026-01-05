const db=require("../utils/dbConnection")
const addentries=(req,res)=>{
    const {email,name}=req.body
const insertQuery=`insert into students (email,name) values(?,?)`
db.query(insertQuery,[email,name],(err)=>{
    if(err){
        console.log(err);
        res.status(500).send(err.message)
        db.end();
        return;
    }
    console.log("value inserted")
    res.status(200).send(`students with name ${name} added`)
})
}
const updateEntry=(req,res)=>{
    const id=req.params.id
    const {name}=req.body
    console.log("PARAM ID:", id);
console.log("BODY NAME:", name);

    const updateQuery="update students set name= ? where id= ?";
    db.query(updateQuery,[name,id],(err,result)=>{
        if(err){
            console.log(err.message)
            res.status(500).send(err.message)
            //db.end();
            return;
        }
        if(result.affectedRows===0){
            console.log("updated not succssfully")
            
            res.status(400).send("student not found")
return;
        }
        res.status(200).send("student  updated")

            console.log("updated succssfully")
})
}
const deleteEntry=(req,res)=>{
    const id=req.params.id
    const deleteQuery=`delete from students where id=?`
    db.query(deleteQuery,[id],(err,result)=>{
res.send("hello")
    })
}
module.exports={addentries,updateEntry,deleteEntry}
