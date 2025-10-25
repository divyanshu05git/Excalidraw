import { NextFunction , Request , Response } from "express";
import jwt from "jsonwebtoken"
import { JWT_SECRET } from "./config";


export function middleware(req:Request , res: Response , next: NextFunction){
    const token= req.headers["authorization"]??"";


    if(!token){
        res.status(403).json({
            message:"Invalid token"
        })
    }

    const decoded=jwt.verify(token,JWT_SECRET);

    try{
        if(decoded){
            //@ts-ignore
            req.userId=decoded.userId;
            next()
        }
        else{
            res.status(403).json({
                message:"Unauthorized"
            })
        }
    }
    catch(err){
        res.status(403).json({
            message:"Internal error"
        })
    }
}