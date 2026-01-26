const jswt= require('jsonwebtoken');
const User = require('../models/UsersTable')

const aunthenticate= async(req,res,next)=>{
try {
    console.log("qqqqq",req.headers)
        const token=req.params.userId|| req.headers.authorization;
        console.log("aaa",token)
        const decoded=jswt.verify(token, 'secretkey');
        console.log("decoded",decoded)
     User.findByPk(decoded.userId).then(user=>{
        req.user=user
        next()} ) .catch(err=>{console.log(err);
            res.status(401).json({message:"unauthorized", success:false})
})   

    } catch (error) {
        console.log(error);
       res.status(401).json({message:"invalid token", success:false})
    }
}
module.exports={aunthenticate};
