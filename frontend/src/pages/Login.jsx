import React, { useState } from 'react'
import axios from "axios"

const Login = () => {
    const [username,setUsername]=useState("");
    const [password,setPassword]=useState("");

const handleusername=(e)=>{
    setUsername(e.target.value)
}


const handlepassword=(e)=>{
    setPassword(e.target.value)
}

    const handleSubmit =async(e)=>{
  e.preventDefault()
  try{
    const response = await axios.post("http://localhost:8907/login",{
       username,
       password 
    })

    console.log(response)
    localStorage.setItem("tokane",response.data)

    alert("you have logged in ",response.data)

  }catch(err){
    console.log(err)
  }
    }

  return (
    <div>
        <form onSubmit={handleSubmit}>
            <label>
                Username:
                <input  type='text' value={username} onChange={handleusername}/>
            </label>

            <label>
                password:
                <input  type='text' value={password} onChange={handlepassword}/>
            </label>

            <button type='sunmit'>login</button>

        </form>
      
    </div>
  )
}

export default Login
