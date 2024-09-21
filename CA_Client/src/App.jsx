
import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Auth from './Components/Auth';
const App = () => {
  return (
    <>

    <BrowserRouter>
            <Routes>
               <Route path='/' element={<Auth/>} />

            </Routes>
    </BrowserRouter>
    
    </>
  );
};

export default App;
