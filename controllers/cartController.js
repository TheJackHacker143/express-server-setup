const getCartForUser=(req,res)=>{
    res.send(`fetching cart for user with id:${req.params.id} `)
}
const addProductToCart=(req,res)=>{
    res.send(`adding  products  to cart for user-${req.params.id}`)
}
module.exports={
    getCartForUser,addProductToCart
}