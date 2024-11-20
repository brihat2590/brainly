const JWT_SECRET='ilovekiara'
import { Express } from "express"
import { NextFunction,Request,Response } from "express"

import jwt from "jsonwebtoken"
export function Middleware(req:Request,res:Response,next:NextFunction){
    const token=req.headers['authorization']
    const decoded=jwt.verify(token as string,JWT_SECRET)
    if(decoded){
        //@ts-ignore
        req.userId=decoded.id
        next();
    }
    else{
        res.status(404).send({
            message:"the token in invalid"
        })
    }
    

}