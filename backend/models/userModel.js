const mongoose = require('mongoose');

const userSchema=new mongoose.Schema({
    name:{type:"string",required:true},
    email:{type:"string",required:true,unique:true},
    password:{type:"string",required:true},
    cartData:{type:Object,default:{}}
},{minimize:false});

module.exports=mongoose.model('user',userSchema);