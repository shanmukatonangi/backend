import axios from 'axios'
import React, { useState } from 'react'

const Protected = () => {
    const [message,setMessage]=useState("")

    const fetchmessage=async()=>{
        try {
            const token = localStorage.getItem("tokane")
            console.log(token)
            const response=await axios.get("http://localhost:8907/protected",{
                headers: {
                    'Authorization': token
                }

            })
            console.log(response)
            setMessage(response.data)
           
        } catch (error) {
            console.log(error)
        }

    }

  return (
    <div>
      <h2>protected route</h2>
      <button onClick={fetchmessage}>fetch secret info</button>
      <div >{message}</div>
    </div>
  )
}

export default Protected
