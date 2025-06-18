import React, { useContext, useEffect } from 'react'
import './Verify.css'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios'

const Verify = () => {

  const [searchParam,setSearchParams] = useSearchParams();
  const success = searchParam.get("success");
  const orderId = searchParam.get("orderId");
  const {url} = useContext(StoreContext)
  const navigate = useNavigate();

//   console.log(success,orderId)

const verifyPayment = async () =>{
    const response = await axios.post(url+"/api/order/verify",{success,orderId});
    if(response.data.success){
        navigate("/myorders");
    }
    else{
        navigate("/")
    }
}
useEffect(()=>{
    verifyPayment();
},[])

  return (
    <div className='verify'>
      <div className="spinner"></div>
    </div>
  )
}

//Card: 4000 0027 6000 3184

export default Verify
