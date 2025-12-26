const path=require("path")
const getAllProducts=(req,res)=>{
    res.sendFile(path.join(__dirname,"..","view","express123.html"))
}
const getProductById=(req,res)=>{
    res.send(`fetching product with id:${req.params.id} `)
}
const addProduct=(req,res)=>{
    res.send("adding new  products")
}
module.exports={getAllProducts,addProduct,getProductById}