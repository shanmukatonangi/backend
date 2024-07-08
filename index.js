const express = require("express")
const app = express()
const jwt  = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const secretKey = "qwertyu"
const cors = require("cors")

app.use(express.json())
app.use(cors())

const users = [];

app.post("/register",async(req,res)=>{
    const {username,password} = req.body
    const hashpassword = await bcrypt.hash(password,10)
    users.push({username,password:hashpassword})
    res.status(201).send(users)

})
console.log(users)

app.post("/login",async(req,res)=>{
    const {username,password} = req.body
    const user = users.find((user)=>user.username === username )
   if(user && await bcrypt.compare(password,user.password)){
    const token  = jwt.sign({username:user.username},secretKey,{expiresIn:'30d'},(err,token)=>{
res.send(token)
    })
   }else{
    res.send("Invalid Credentials")
   }
})


app.get("/protected",(req,res)=>{
    const token = req.headers.authorization
    if(token){
        jwt.verify(token,secretKey,(err,decoded)=>{
            if(err){
                res.send("Invalid Token")
                }else{
                    res.send("Welcome "+decoded.username)
                    }
        })
    }

})



app.listen(8907,()=>{
    console.log("Server is running on port 8907")
})