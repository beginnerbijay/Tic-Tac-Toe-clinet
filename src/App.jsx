import 'react'
import { useState } from 'react';
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import './App.css'
import { io } from "socket.io-client";
import UserContext from './context';
import Game from './pages/Game';
import Home from './pages/Home';

function App() {
  const socket = io('http://localhost:5000')
  const [roomid, setroomid] = useState('')
  const [name, setname] = useState('')
  return (
    <BrowserRouter>
    <UserContext.Provider value={{roomid,setroomid,socket,name,setname}}>
    <Routes>
    <Route path='/' element={<Home/>}/>
    <Route path='/game' element={<Game/>}/>
    </Routes>
    </UserContext.Provider>
    </BrowserRouter>
  )
}

export default App
