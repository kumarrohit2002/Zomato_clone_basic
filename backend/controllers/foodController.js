const Food = require('../models/foodModel')
const fs = require('fs').promises;


//add food item
exports.addFood=async(req,res)=>{
    try{
        //fetch data from req body
        const image_filename=`${req.file.filename}`;
        const {name,description,price,category}=req.body;

        const food=new Food({name,description,price,category,image:image_filename});
        await food.save();

        return res.status(200).json({
            success:true,
            message:"Food Save Succefully",
            food:food,
        });
        
    }catch(error){
        console.log(error);
        res.status(500).json({
            success: false,
            message:error.message,
        });
    }
}

//list food
exports.listFood=async(req,res)=>{
    try{
        const foods=await Food.find({});
        if(!foods){
            return res.status(401).json({
                success:false,
                message:"Issue in fetch data from DB"
            })
        }
        return res.status(200).json({
            success:true,
            message:"get food list successfully!",
            foods:foods
        })

    }catch(error){
        console.log(error);
        res.status(500).json({
            success: false,
            message:error.message,
        });
    }
}


//remove food item
exports.removeFood=async(req,res)=>{
    try{
        //find food item
        const {id}=req.body;
        const food=await Food.findById(id);
        if(!food){
           return res.status(401).json({
                success:false,
                message:"Issue in fetch data from DB, or Invalid id"
            })
        }

        // Delete food image
        // C:\Users\Rohit Ranjan\Desktop\Food Del\backend\uploads\1720765931711wlogo.png
        try {
            await fs.unlink(`C:/Users/Rohit Ranjan/Desktop/Food Del/backend/uploads/${food.image}`);
        } catch (err) {
            console.error(`Failed to delete image file: ${err}`);
            return res.status(402).json({
                success:false,
                message:"Issue in delete image file"
            })
            // Optionally, you can still proceed with deleting the food item from the database
        }

        
        //delete food item
        await Food.findByIdAndDelete(id);
        return res.status(200).json({
            success:true,
            message:"Food item is deleted successfully",
            item:food
        })

    }catch(error){
        console.log(error);
        res.status(500).json({
            success: false,
            message:error.message,
        });
    }
}

