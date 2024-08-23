const Order=require('../models/orderModel');
const User=require('../models/userModel');
const Stripe=require('stripe');

const stripe=new Stripe(process.env.STRIPE_SECRET);



// //placing user order for frontend

exports.placeOrder=async(req,res)=>{
    const frontend_url=" http://localhost:5173";

    try{
        const {userId,amount,address,items}=req.body;
        const newOrder=new Order({
            userId: userId,
            items: items,
            amount: amount,
            address: address,
        })
        await newOrder.save();
        await User.findByIdAndUpdate(userId,{cartData:{}});

        const line_items=items.map((item)=>({
            price_data:{
                currency:"inr",
                product_data:{
                    name: item.name,
                    
                },
                unit_amount: item.price*100*80
            },
            quantity: item.quantity
        }));

        line_items.push({
            price_data:{
                currency:"inr",
                product_data:{
                    name:"Delivery charges",
                    
                },
                unit_amount: 2*100*80
            },
            quantity: 1
        })


        // const session=await stripe.checkout.sessions.create({
        //     line_items:line_items,
        //     mode:"payment",
        //     success_url:`${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
        //     cancel_url:`${frontend_url}/verify?success=false&orderId=${newOrder._id}`,
        // })

        res.status(200).json({
            success:true,
            // session_url:session.url
        })

    }catch(error){
        console.log(error);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

