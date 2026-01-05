const db=require("../utils/dbConnection")
const addentries=(req,res)=>{
    const {buscount,seat}=req.body
const insertQuery=`insert into buses (buscount,availableseats) values(?,?)`
db.query(insertQuery,[buscount,seat],(err)=>{
    if(err){
        console.log(err);
        res.status(500).send(err.message)
        //db.end();
        return;
    }
    console.log("value inserted")
    res.status(200).send(`students with name ${buscount} added`)
})
}
const reteriveEntry=(req,res)=>{
    const seats=req.params.seats
    const reteriveQuery="SELECT * FROM buses where availableseats>?"
    db.query(reteriveQuery,seats ,(err, result) => {
    if (err) return res.status(500).send("DB error");
    console.log(result)
    res.send(result); // ✅ yahan actual DB data hota hai
  });
}
module.exports={addentries,reteriveEntry}
