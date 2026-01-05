const db=require("../utils/dbConnection")
const addentries=(req,res)=>{
    const {email,name}=req.body
const insertQuery=`insert into users (email,name) values(?,?)`
db.query(insertQuery,[email,name],(err)=>{
    if(err){
        console.log(err);
        res.status(500).send(err.message)
        //db.end();
        return;
    }
    console.log("value inserted")
    res.status(200).send(`students with name ${name} added`)
})
}
const reteriveEntry=(req,res)=>{
    db.query("SELECT * FROM users", (err, result) => {
    if (err) return res.status(500).send("DB error");
    console.log(result)
    res.send(result); // ✅ yahan actual DB data hota hai
  });
}
module.exports={addentries,reteriveEntry}
