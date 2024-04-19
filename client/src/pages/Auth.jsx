import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import {useCookies} from 'react-cookie'
import { useNavigate} from 'react-router-dom'
import config from '../configuration/config.js'


const Auth = () => {
  return (
    <>
    <div className='grid grid-cols-2 '>
    <Register/>
    <Login/>
    </div>
    </>
  )
}

export default Auth



const Register = () => {
  const [username, setUsername] = useState("") ; 
  const [password, setPassword] = useState("") ; 
  const handleSubmit = async(event) =>{
    event.preventDefault() ; 
    try{
      const response = await axios.post(`http://localhost:${config.backendPort}/auth/register`,{
        username,
        password
      }) ; 
      setUsername("");
      setPassword("");
      console.log()
      alert(`${response.data.message}`)
    }catch(err){
      console.log(err) ; 
    }
  }
  return (
    <div>
      <form onSubmit={(event)=>{handleSubmit(event)}} 
      className=''>
        <div >
        <label htmlFor="username">UserName : </label>
        <input type="text" name="username" id="username" value={username} onChange={(e)=>{
          setUsername(e.target.value) ; 
        }}/>
        </div>
        <div>
        <label htmlFor="password">Password : </label>
        <input type="password" name="password" id="password" value={password} onChange={(e)=>{
          setPassword(e.target.value) ; 
        }} />
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  )
}



const Login = () => {
  const [username, setUsername] = useState("") ; 
  const [password, setPassword] = useState("") ; 
  const [cookie, setCookie] = useCookies() ; 
  const navigate = useNavigate() ; 
  const handleSubmit = async(event) =>{
    event.preventDefault() ; 
    try{
      const response = await axios.post(`http://localhost:${config.backendPort}/auth/login`,{
        username,
        password
      }) ; 
      setUsername("");
      setPassword("");
      if(response.data.message !== "success"){
        alert(response.data.message) ;
      }else{
        setCookie("access_token",response.data.token) ; 
        window.localStorage.setItem("userId",response.data.userId) ; 
        navigate('/')
      }

      // alert(`${response.data.token}`)
    }catch(err){
      console.log(err) ; 
    }
  }
  return(

    <div>
      <form onSubmit={(event)=>{handleSubmit(event)}}>
        <div >
        <label htmlFor="username">UserName : </label>
        <input type="text" name="username" id="username" value={username} onChange={(e)=>{
          setUsername(e.target.value) ; 
        }}/>
        </div>
        <div>
        <label htmlFor="password">Password : </label>
        <input type="password" name="password" id="password" value={password} onChange={(e)=>{
          setPassword(e.target.value) ; 
        }} />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  )
}