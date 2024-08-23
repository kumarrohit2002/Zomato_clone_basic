import axios from "axios";
import { createContext, useEffect, useState } from "react";


export const StoreContext=createContext();

const StoreContextProvider=(props)=>{
    const [food_list,setFoodList]=useState([]);
    const [token,setToken]=useState("");
    const [cartItems,setCartItems]=useState({});

    const url="http://localhost:4000";

    const addToCart=async(itemId)=>{
        if(!cartItems[itemId]){
            setCartItems(prev=>({...prev,[itemId]:1}));
        }else{
            setCartItems(prev=>({...prev,[itemId]:prev[itemId]+1}));
        }
        if(token){
            await axios.post(url+"/api/cart/add",{itemId},{headers:{token}})
        }
    }
    
    const removeFromCart=async(itemId)=>{
        setCartItems(prev=>({...prev,[itemId]:prev[itemId]-1}));
        if(token){
            await axios.post(url+"/api/cart/add",{itemId},{headers:{token}})
        }
    }
    
    const getTotalCartAmount=()=>{  
        let totalAmount=0;
        for(const item in cartItems){
            if(cartItems[item]>0){
                let  itemInfo=food_list.find(product=>product._id===item);
                totalAmount+=itemInfo.price*cartItems[item];
            }
        }
        return totalAmount;
    }

    const loadCartData = async (token) => {
        if (token) {
          try {
            const response = await axios.post(url+"/api/cart/get",{id:"idif"},{headers:{token}})
            console.log("Response in loadCart:", response.data);
            // setCartItems(response.data.cartData);
          } catch (error) {
            console.log(error);
            console.error("Error loading cart data:", error.response);
          }
        }
      };

    const fetchFoodList=async()=>{
        const response=await axios.get(url+"/api/food/list");   
        setFoodList(response.data.foods);
    }
    
    useEffect(()=>{
        async function loadData(){
            await fetchFoodList();
            let Token=localStorage.getItem("token");
            if(Token){
                setToken(Token);
                await loadCartData(Token);
            }
        }
        loadData();
    },[])   

    const contextValue={
        food_list,
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        url,
        token,
        setToken,
    };

    return(
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}

export default StoreContextProvider;


