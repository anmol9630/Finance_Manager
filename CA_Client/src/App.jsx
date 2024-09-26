
import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Auth from './Components/Auth';
import VerifyComp from './Components/VerifyComp';
import Home from './Components/Home';
import Fpass from './Components/Fpass';
import Rpass from './Components/Rpass';
const App = () => {
  return (
    <>

    <BrowserRouter>
            <Routes>
               <Route path='/' element={<Auth/>} />
               <Route path='/home' element={<Home/>} />
               <Route path='/verify' element={<VerifyComp/>}/>
               <Route path='/fpass' element={<Fpass/>}/>
               <Route path='/resetpassword' element={<Rpass/>}/>
            </Routes>
    </BrowserRouter>
    
    </>
  );
};

export default App;
