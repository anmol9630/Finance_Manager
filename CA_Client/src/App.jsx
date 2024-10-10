import { BrowserRouter, Routes, Route } from "react-router-dom";
import Auth from './Pages/Auth'
import VerifyComp from './Components/VerifyComp';
import Home from './Pages/Home';
import Fpass from './Components/Fpass';
import Rpass from './Components/Rpass';
import Layout from "./Layout/Layout";
import ProtectedRoutes from "./Hooks/ProtectedRoutes";
import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import axios from "axios";
import ProfilePage from "./Pages/Profile";
const App = () => {
  
  const [user , setUser] = useState(false); 

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_BASE_URL}/user/me` , {withCredentials:true})
    .then(({data}) => {
      setUser(true);
      // console.log(data.user)
    })
    .catch(err => {
      setUser(false);
      // console.log(err);
    })
  },[])

  return (
    <>

    <BrowserRouter>
            <Routes>
               {/* <Route element={<ProtectedRoutes user={user}/>} > */}
                  <Route element={<Layout/>}>
                    <Route path='/' element={<Home/>} />
                    {/* <Route path='/profile' element={<ProfilePage/>} /> */}
                    <Route path='/verify' element={<VerifyComp/>}/>
                    <Route path='/fpass' element={<Fpass/>}/>
                    <Route path='/resetpassword' element={<Rpass/>}/>

                  </Route>
               {/* </Route> */}
               <Route path='/auth' element={
                <ProtectedRoutes user={!user} redirect="/">
                  <Auth/>
                </ProtectedRoutes>
                } />
            </Routes>
                <ToastContainer />
    </BrowserRouter>
    
    </>
  );
};

export default App;

