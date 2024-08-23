const express=require('express')
const cors=require('cors');

//app config
const app = express();
const PORT=4000;

//middleware 
app.use(express.json());
app.use(cors());

//DB connection
const db=require('./config/db');
db();


//api endpoints

const foodRouter=require('./routes/foodRoute');
const userRouter=require('./routes/userRoute');
const cartRouter=require('./routes/cartRoute');
const orderRouter=require('./routes/orderRoute')

app.use('/images',express.static('uploads'));
app.use('/api/food',foodRouter);
app.use('/api/user',userRouter);
app.use('/api/cart',cartRouter);
app.use('/api/order',orderRouter);



app.get('/',(req, res) => {
    res.send("API Working");
});

app.listen(PORT,()=>{
    console.log(`server stated on http://localhost:${PORT}`);
})
