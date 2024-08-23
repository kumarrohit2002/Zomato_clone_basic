const mongoose = require('mongoose');

const orderSchema=new mongoose.Schema({
    userId:{type: 'string',require:true},
    items:{type: Array,require:true},
    amount:{type: Number,require:true},
    address:{type: Object,require:true},
    status:{type: String,default: 'Food Processing'},
    date:{type: Date,default: Date.now()},
    payment:{type:Boolean,default: false},
})

module.exports=mongoose.model('Order',orderSchema);


