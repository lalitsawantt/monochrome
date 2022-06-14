import React from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'; 
import Home from '../src/core/Home';
import Signin from './user/helper/Signin';
import Signup from './user/helper/Signup';
const Routing = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/signin" element={<Signin/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default Routing