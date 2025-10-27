import express from "express";
import jwt from "jsonwebtoken"
import { middleware } from "./middleware";
import { JWT_SECRET } from "./config";
import { CreateUserSchema , SigninSchema, CreateRoomSchema } from "@repo/common/types"
import { prismaClient } from "@repo/db/client"
import bcrypt from "bcrypt";
import cors from "cors";

const app=express();
app.use(express.json());
app.use(cors())


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
            name:name
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

        if(!user){
            res.status(400).json({
                message:"invald credentials"
            })
        }
        else{
            const passwordMatch=await bcrypt.compare(password,user.password);
            if(!passwordMatch){
                res.status(401).json({
                    message:"Incorrect password"
                })
            }

            const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: "7d" });

            res.json({
                message:"signin successful",
                token:token
            })
        }
    }
    catch(err){
        res.json({
            message:"could not signin"
        })
    }    

    
})

app.post("/room",middleware,async(req,res)=>{
    const parsedData = CreateRoomSchema.safeParse(req.body);
    if (!parsedData.success) {
        res.json({
            message: "Incorrect inputs"
        })
        return;
    }
    // @ts-ignore: TODO: Fix this
    const userId = req.userId;

    try {
        const room = await prismaClient.room.create({
            data: {
                slug: parsedData.data.name,
                adminId: userId
            }
        })

        res.json({
            roomId: room.id
        })
    } catch(e) {
        res.status(411).json({
            message: "Room already exists with this name"
        })
    }
})

app.get("/chats/:roomId",async(req,res)=>{
    try{
        
    }
})

app.listen(3001);