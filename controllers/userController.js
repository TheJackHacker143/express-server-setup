const getAllUser=(req,res)=>{
    res.send("fetching all users")
}
const addUser=(req,res)=>{
    res.send(`fetching user with id:${req.params.id} `)
}
const getUserById=(req,res)=>{
    res.send("adding new user")
}
module.exports={
    getAllUser, addUser,getUserById
}