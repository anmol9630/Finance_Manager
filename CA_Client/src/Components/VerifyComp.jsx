import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';

const VerifyComp = () => {
    const [params] = useSearchParams();
    const token = params.get('token')
    const [error , setError] = useState('');
    const navigator = useNavigate();

    console.log(token);
    useEffect(() => {
        const verifyEmail =async () => {
            const res = await axios.get('http://localhost:3000/user/verifyemail?token='+token);
            console.log(res);
            if(res?.data?.success) {
                navigator("/home")
            }else{
                setError(res?.data?.message);
            }
        }
        verifyEmail();
    },[])

  return (
    <div>
        {error && <p>{error}</p>}
      Verify Page
    </div>
  )
}

export default VerifyComp;
