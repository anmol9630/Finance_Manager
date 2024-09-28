import React from "react";
import { useState } from "react";
import { useNavigate, useSearchParams } from 'react-router-dom';
import axios from "axios";


const Rpass=()=>{

    const [password , setpassword]=useState("");
    const [conpassword , setconpassword]=useState("");

    const [params] = useSearchParams();
    const token = params.get('token')

    const handlesubmit=()=>{
       
        let api = "http://localhost:3000/user/resetpassword";
        axios.post(api,{token:token,password : password}).then((res)=>{
            alert(res.data.message);
        })
       
        

    }

    


    return(

        <>
      Enter Newpassword :  <input type="text" onChange={(e)=>{setpassword(e.target.value)}} value={password}  />
      Re-Enterpassword :  <input type="text" onChange={(e)=>{setconpassword(e.target.value)}} value={conpassword}  />
        <br />
        <input type="submit" onClick={handlesubmit} />
        
        
        </>
    )
}

export default Rpass;