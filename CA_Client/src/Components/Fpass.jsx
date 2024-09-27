import React from "react";
import { useState } from "react";
import axios from "axios";

const Fpass=()=>{

    const [email , setemail]=useState("");


    const handlesubmit=()=>{

        let api = "http://localhost:3000/user/forgotpassword";
         axios.post(api,{email : email})  .then((res)=>{
           alert(res.data.message);
         })

    }


    return(

        <>
      enter email :  <input type="email" onChange={(e)=>{setemail(e.target.value)}} value={email}  />
        <br />
        <input type="submit" onClick={handlesubmit} />
        
        
        </>
    )
}

export default Fpass;