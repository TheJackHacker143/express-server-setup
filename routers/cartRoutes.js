const expres=require("express")
const app=expres.Router()
const cartController=require("../controllers/cartController")
app.get("/:id",cartController.getCartForUser)
app.post("/:id",cartController.addProductToCart)
module.exports=app