import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css';
import { Route,Routes } from 'react-router-dom';
import Home from "./pages/Home";

function App() {
return (
<div className='m-0 p-0 flex flex-col font-inter bg-gray-900 mt-0px'>
<Routes>
      <Route path='/' element={<Home/>}/>
    </Routes>
</div>
);



}

export default App
