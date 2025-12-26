const expres=require("express")
const app=expres.Router()
const userControler=require("../controllers/userController")
app.get("/",userControler.getAllUser)
app.get("/:id",userControler.addUser)
app.post("/",userControler.getUserById)
module.exports=app