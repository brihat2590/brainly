import express from "express"
const app=express()
import jwt from "jsonwebtoken"
const JWT_SECRET='ilovekiara'
import { userModel,contentModel } from "./db"
import  {Middleware}  from "./middleware"
import {z} from "zod"
import mongoose from "mongoose"
app.use(express.json())

async function Main(){
    await mongoose.connect("mongodb+srv://brihat:Brihatbir1@cluster0.ymp18.mongodb.net/brainly")
    console.log("connected to the database")
    app.listen(3000,()=>{
        console.log("listening on port 3000")
    })
}
Main()

app.post("/api/v1/signup",async(req,res)=>{
    const requiredBody=z.object({
        username:z.string().min(3).max(10),
        password:z.string().min(3).max(12)
    })
    const parsedData=requiredBody.safeParse(req.body)
    if(!parsedData.success){
        res.json({
            message:parsedData.error.message
        })
    }
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

app.post("/api/v1/content",Middleware,async(req,res)=>{
    const{link,title}=req.body
    await contentModel.create({
        link,
        title,
        //@ts-ignore
        userId:req.userId,
        tags:[]
    })
    res.json({
        message:"your content has been updated successfully"
    })
    

})
app.put("/api/v1/content/:id",Middleware,(req,res)=>{

})
app.get("/api/v1/content",(req,res)=>{

})
app.post("/api/v1/brain/share",(req,res)=>{

})