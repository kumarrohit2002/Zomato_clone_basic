const jwt=require('jsonwebtoken');
require("dotenv").config();

const authMiddleware =async(req,res,next)=>{
    try{
        const {token}=req.headers;
        if(!token){
            return res.status(400).json({
                success: false,
                message: 'Not Authorized Login Again'
            })
        }

        const token_decode=jwt.verify(token,process.env.JWT_SECRET);
        req.body.userId=token_decode.id;
        next();

    }catch(error){
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Authentication Failed'
        })
    }
}


module.exports=authMiddleware;



