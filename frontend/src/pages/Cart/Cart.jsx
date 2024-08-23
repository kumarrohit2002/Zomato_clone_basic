import { useContext } from 'react'
import './Cart.css'
import { StoreContext } from '../../context/StoreContext'
import { Link } from 'react-router-dom';


const Cart = () => {
  const {cartItems,food_list,removeFromCart,getTotalCartAmount,url}=useContext(StoreContext);

  return (
    <div className="cart">
      <div className="cart-items">
        <div className="cart-item-title">
          <p>Item</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br />
        <hr />
        {
          food_list.map((item,index)=>{
            if(cartItems[item._id]>0){
              return(
                <div key={index}>
                  <div className="cart-item-title cart-items-item">
                    <img src={url+"/images/"+item.image} alt="img" />
                    <p>{item.name}</p>
                    <p>${item.price}</p>
                    <p>{cartItems[item._id]}</p>
                    <p>${item.price*cartItems[item._id]}</p>
                    <p onClick={()=>removeFromCart(item._id)} className='cross'>X</p>
                  </div>
                  <hr />
                </div>
              )
            }
          })
        }
      </div>
      <div className="cart-buttom">
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
          <Link to='/order'><button>PROCEED TO CHECKOUT</button></Link>
        </div>
        <div className="cart-promocode">
          <div>
            <p>If you have a promo code, Enter it here</p>
            <div className="cart-promocode-input">
              <input type="text" placeholder="Enter Promo Code"/>
              <button>Submit</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart