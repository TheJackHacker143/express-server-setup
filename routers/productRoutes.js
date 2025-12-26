const expres=require("express")
const app=expres.Router()
const productController=require("../controllers/productController")
app.get("/products",productController.getAllProducts)
app.get("/:id",productController.getProductById)
app.post("/",productController.addProduct)
module.exports=app