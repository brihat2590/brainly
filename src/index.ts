import express from "express"
const app=express()
import jwt from "jsonwebtoken"
const JWT_SECRET='ilovekiara'
import { userModel } from "./db"
app.use(express.json())

app.post("/api/v1/signup",async(req,res)=>{
    const{username,password}=req.body
    await userModel.create({
        username:username,
        password:password
    })
    res.json({
        message:"you have been signed up successfully"
    })


})
app.post("/api/v1/login",async(req,res)=>{
    const{username,password}=req.body;
    const user=await userModel.findOne({
        username:username,
        password:password
    })
    if(user){
        const token=jwt.sign({
            id:user._id

        },JWT_SECRET)
        res.json({
            token:token
        })
    }
    else{
        res.json({
            message:"invalid credentials bro"
        })
    }


})
app.post("/api/v1/brain/share",(req,res)=>{

})
app.post("/api/v1/content",(rqe,res)=>{
    

})
app.get("/api/v1/content",(req,res)=>{

})