
import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Auth from './Components/Auth';
import VerifyComp from './Components/VerifyComp';
const App = () => {
  return (
    <>

    <BrowserRouter>
            <Routes>
               <Route path='/' element={<Auth/>} />
               <Route path='/verify' element={<VerifyComp/>}/>
            </Routes>
    </BrowserRouter>
    
    </>
  );
};

export default App;
