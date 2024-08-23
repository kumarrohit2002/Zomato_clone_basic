import './PlaceOrder.css';
import { useContext, useState } from 'react';
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';


const PlaceOrder = () => {
  const {getTotalCartAmount,token,food_list,cartItems,url}=useContext(StoreContext);
  const [data,setData]=useState({
    firstName:"",
    lastName:"",
    email:"",
    street:"",
    city:"",
    state:"",
    zipcode:"",
    country:"",
    phone:"",
  })

  const changeHandler =(event)=>{
    const name = event.target.name;
    const value=event.target.value;
    setData((data)=>({...data,[name]:value}));
  }

  const placeOrder=async(event)=>{
    event.preventDefault();
    let orderItems=[];
    food_list.map((item)=>{
      if(cartItems[item._id]>0){
        let itemInfo=item;
        itemInfo["quantity"]=cartItems[item._id];
        orderItems.push(itemInfo);
      }
    })
    console.log(orderItems);
    let orderData={
      address:data,
      items:orderItems,
      amount:getTotalCartAmount()+2
    }

    let response=await axios.post(url+"/api/order/place",orderData,{headers:{token}});
    if(response.data.success){
      const {session_url}=response.data;
      window.location.replace(session_url);
    }else{
      alert("Error in place order fun")
    }
  }




  return ( 
    <form onSubmit={placeOrder} className="place-order">
      <div className="place-order-left">
        <p className="title">Delivery Information</p>
        <div className="multi-fields">
          <input name='firstName' onChange={changeHandler} value={data.firstName} type="text" placeholder="First name" required />
          <input name='lastName' onChange={changeHandler} value={data.lastName} type="text" placeholder="Last name" required/>
        </div>
        <input name='email' onChange={changeHandler} value={data.email} type="email" placeholder='Email Address' required/>
        <input name='street' onChange={changeHandler} value={data.street} type="text" placeholder='Street' required/>
        <div className="multi-fields">
          <input name='city' onChange={changeHandler} value={data.city} type="text" placeholder="City" required/>
          <input name='state' onChange={changeHandler} value={data.state} type="text" placeholder="State" required/>
        </div>
        <div className="multi-fields">
          <input name='zipcode' onChange={changeHandler} value={data.zipcode} type="text" placeholder="Zip code" required/>
          <input name='country' onChange={changeHandler} value={data.country} type="text" placeholder="Country" required/>
        </div>
        <input name='phone' onChange={changeHandler} value={data.phone} type="number"  placeholder="Phone" required/>
      </div>
      <div className="place-order-right">
      <div className="cart-total">
          <h2>Cart Totals</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>${getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Deliveryfee</p>
              <p>${getTotalCartAmount()===0?0:2}</p>
            </div>
            <hr />
            <div className="cart-total-details total">  
              <p>Total</p>
              <p>${getTotalCartAmount()+getTotalCartAmount()===0?0:2}</p>
            </div>
          </div>
          <button type="submit">PROCEED TO PAYMENT</button>
        </div>
      </div>
    </form>
  )
}

export default PlaceOrder