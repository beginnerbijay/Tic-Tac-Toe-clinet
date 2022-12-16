import React, { useContext, useEffect } from 'react'
import {useNavigate} from 'react-router-dom'
import UserContext from '../context';

function Home() {
    const nav = useNavigate()
    const {roomid,setroomid,name,setname} = useContext(UserContext)
   
    const handler =(e)=>{
        e.preventDefault()
        localStorage.setItem('user',name)
        localStorage.setItem('room',roomid)
        nav('/game')
    }
    useEffect(()=>{
      const user = localStorage.getItem('room')
      if(user){
        nav('/game')
      }
    },[])
  return (
    <div className='home'>
        <h1 className='header'>Tic Tac Toe Multiplayer</h1>
        <form onSubmit={handler} className='form'>
        <input type='text' id='name' placeholder='enter your name' value={name} onChange={e=>setname(e.target.value)}/>
        <input type='text' id='rmidinput' placeholder='enter roomid' value={roomid} onChange={e=>setroomid(e.target.value)}/>
        <button type='submit' className='btn'>Start</button>
        </form>
    </div>
  )
}

export default Home