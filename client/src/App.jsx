import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css';
import { Route,Routes } from 'react-router-dom';
import Home from "./pages/Home";
import Navbar from "../src/component/comman/Navbar";
import Login from './pages/Login';
import Signup from './pages/Signup';
import ProfileDropdown from './component/auth/ProfileDropDown';
// import OpenRoute from "./components/core/Auth/OpenRoute"
import ForgotPassword from "./pages/ForgotPassword"
import VerifyEmail from "./pages/VerifyEmail"
import About from './pages/About';

function App() {
return (
<div className='m-0 p-0 flex flex-col font-inter bg-gray-900 mt-0px'>
  <Navbar/>
<Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/signup' element={<Signup/>}/>
      <Route path='/about' element={<About/>}/>
          <Route
          path="forgot-password"
          element={
      
              <ForgotPassword />
        
          }
        />
          <Route
          path="/verify-email"
          element={
      
              <VerifyEmail />
        
          }
        />
  
          <Route
          path="/dashboard/my-profile"
          element={
      <MyProfile/>
        
          }
        />
    </Routes>
</div>
);



}

export default App
