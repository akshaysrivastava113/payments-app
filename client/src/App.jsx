import { useState } from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Signup from './components/signup';
import Signin from './components/Signin';
import Dashboard from './components/Dashboard';
import SendMoney from './components/SendMoney';
import './App.css';
import { RecoilRoot } from 'recoil';

function App() {

  return (
    <>
    <RecoilRoot>
    <BrowserRouter>
      <Routes>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/signin' element={<Signin/>}/>
        <Route path='/dashboard' element={<Dashboard/>}/>
        <Route path='/send' element={<SendMoney/>}/>
      </Routes>
    </BrowserRouter>
    </RecoilRoot>     
    </>
  )
}

export default App
