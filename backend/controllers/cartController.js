const User=require('../models/userModel');



//add item to user cart
exports.addToCart=async(req,res)=>{
    try{
        // console.log("Req body: "+req.body);
        let userData=await User.findOne({_id:req.body.userId});
         // Check if the user exists
        if (!userData) {
            return res.status(404).json({
            success: false,
            message: 'User not found',
            });
        }
        
        let cartData=await userData.cartData;
        if(!cartData[req.body.itemId]){
            cartData[req.body.itemId]=1;
        }else{
            cartData[req.body.itemId]+=1;
        }

        const updatedData=await User.findByIdAndUpdate(req.body.userId,{cartData});
        res.status(200).json({
            success: true,
            message:"Added TO Cart",
            updatedCart: updatedData.cartData
        });


    }catch(error){
        console.log(error);
        res.status(500).json({
            success: false,
            message:"Error in add to cart",
        })
    }
}
//remove items  from user cart
exports.removeFromCart=async(req,res)=>{
    try{
        const userData=await User.findById(req.body.userId);
        let cartData=userData.cartData;
        if(cartData[req.body.itemId]>0){
            cartData[req.body.itemId]-=1;
        }

        const updatedData=await User.findByIdAndUpdate(req.body.userId,{cartData});

        res.status(200).json({
            success:true,
            message:"Removed from cart",
            updatedCart: updatedData.cartData
        })

    }catch(error){
        console.log(error);
        res.status(500).json({
            success: false,
            message:"Error in remove to cart",
        })
    }
}
//fetch user cart data
exports.getCart=async(req,res)=>{
    try{
        const userData=await User.findById(req.body.userId);
        let cartData=userData.cartData;
        res.status(200).json({
            success:true,
            message:"get Cart Data successfully",
            cartData: cartData,
        })

    }catch(error){
        console.log(error);
        res.status(500).json({
            success: false,
            message:"Error in get cartData",
        })
    }
}






