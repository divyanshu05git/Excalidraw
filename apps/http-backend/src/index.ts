import express from "express";
import jwt from "jsonwebtoken"
import { middleware } from "./middleware";
import { JWT_SECRET } from "./config";
import { CreateUserSchema } from "@repo/common/types"

const app=express();
app.use(express.json());


app.post("/signup",async(req,res)=>{
    const email=req.body.email;
    const name=req.body.name;
    const pasword=req.body.password;
    const photo=""

    const data= CreateUserSchema.safeParse(req.body);
    if(!data.success){
        res.json({
            message:"Incorrect inputs"
        })
    }

    res.json({
        message:"Signed up"
    })
})

app.post("/signin",async(req,res)=>{
    const email=req.body.email;
    const password=req.body.password;

    res.json({
        message:"Signed in"
    })
})

app.post("/room",async(req,res)=>{
    res.json({
        mesaage:"chat"
    })
})

app.listen(3001);