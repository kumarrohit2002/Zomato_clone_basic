import './List.css';
import {useState,useEffect} from "react";
import axios from "axios";
import {toast} from 'react-toastify'

const List = ({url}) => {
  
  const [list,setList]=useState([]);

  const fetchList=async()=>{
    const response=await axios.get(`${url}/api/food/list`);
    if(response.data.success){
      setList(response.data.foods);
      
    }else{
      toast.error(response.data.message)
    }
  }

  const removeItem=async(itemId)=>{
    const response=await axios.post(`${url}/api/food/remove`,{id:itemId});
    // console.log(response.data);
    await fetchList();
    if(response.data.success){
      toast.success(response.data.message);
    }else{
      toast.error(response.data.message);
    }
  }

  useEffect(()=>{
    fetchList();
  },[])


  return (
    <div className="list add flex-col">
      <p>All Foods List</p>
      <div className="list-table">
        <div className="list-table-format title">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>
        {
          list.map((item,index)=>{
            return(
              <div key={index} className="list-table-format">
                <img src={`${url}/images/`+item.image} alt="itemImg" />
                <p>{item.name}</p>
                <p>{item.category}</p>
                <p>{item.price}</p>
                <b onClick={()=>removeItem(item._id)} className="cross">X</b>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}

export default List;