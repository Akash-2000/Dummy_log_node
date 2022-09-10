const express = require("express")
const app = express()
const cors = require("cors")
const User = require("./model/user")
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
const bcrypt = require("bcryptjs")
require("dotenv").config()
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true});
console.log("mongoose connected")
app.use(cors())
app.use(bodyParser.json())
app.post("/register" ,async(req,res)=>{
    const{name,email,password}=req.body
    const password1 = await bcrypt.hash(password,7)
    try {
        const user =await User.create({
        name:name,
        email:email,
        password:password1
    })
    res.json(user)
   }    
 catch (error) {
        console.error(error)       
    }
})


app.post("/login",async(req,res)=>{
    const {email,password}=req.body
    if(!email || !password){
        return res.json({status:"error",data:"Enter all mandatory fields before log in "})
    }
    const user = await User.findOne({email}).lean()
    if(!user){
        return res.json({status:"error",data:"invalid username & Password"})
    }
    console.log()
    if(await bcrypt.compare(password,user.password)){
        //token created
        res.json({status:"ok"})
    }
    else{
        res.json({status:'error',data:'Invalid password'})
    }
})

app.post("/add",async(req,res)=>{
    const {email} = req.body
    console.log(req.body)
    const{age,gender,date_of_birth,mobile}=req.body
    console.log(email)
    await User.findOne({email}).then(doc => {doc.details={age:age,gender:gender,date_of_birth:date_of_birth,mobile:mobile},doc.save()})
        
})

Port=5000

app.listen(process.env.PORT||Port,()=>{
    console.log("server set at 5000")
})