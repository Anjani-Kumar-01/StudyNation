import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css';
import { Route,Routes } from 'react-router-dom';
import Home from "./pages/Home";

function App() {
return (
<div className='w-screen min-h-screen bg-red-700 flex flex-col font-inter'>
<Routes>
      <Route path='/' element={<Home/>}/>
    </Routes>
</div>
);



}

export default App
