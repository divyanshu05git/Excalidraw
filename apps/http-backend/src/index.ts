import express from "express";
import jwt from "jsonwebtoken"
import { middleware } from "./middleware";
import { JWT_SECRET } from "./config";
import { CreateUserSchema } from "@repo/common/types"
import { prismaClient } from "@repo/db/client"
import bcrypt from "bcrypt";

const app=express();
app.use(express.json());


app.post("/signup",async(req,res)=>{
    const email=req.body.email;
    const password=req.body.password;
    const name=req.body.name;

    if(!email || !password || !name){
        res.status(400).json({
            message:"Missing required fields"
        })
    }

    //check db already has this mail
    const user = await prismaClient.user.findUnique({
        where: { email: email },
    });

    if(user){
        res.json({
            message:"user already exist with this mail"
        })
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await prismaClient.user.create({
        data:{
            email:email,
            password:hashedPassword,
            name:name,
            photo:"",

        }
    })


    res.json({
        message:"signed up"
    })
})

app.post("/signin",async(req,res)=>{
    const email=req.body.email;
    const password=req.body.password;

    try{
        const user = await prismaClient.user.findUnique({
            where: { email: email },
        });

        
    }
    catch(err){

    }    

    
})

app.post("/room",async(req,res)=>{
    res.json({
        mesaage:"chat"
    })
})

app.listen(3001);