const express = require('express');
const multer = require('multer');

const foodRouter=express.Router();


//image storage Engin
const storage=multer.diskStorage({
    destination:"uploads",
    filename:(req,file,cb)=>{
        return cb(null,`${Date.now()}${file.originalname}`)
    }
})

const upload=multer({storage:storage});


const {addFood,listFood,removeFood}=require('../controllers/foodController');
foodRouter.post('/add',upload.single('image'),addFood);
foodRouter.get('/list',listFood);
foodRouter.post('/remove',removeFood);



module.exports=foodRouter;

