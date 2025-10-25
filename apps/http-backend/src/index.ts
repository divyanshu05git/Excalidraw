import express from "express";

const app=express();
app.use(express.json());


app.post("/signup",async(req,res)=>{
    const email=req.body.email;
    const name=req.body.name;
    const pasword=req.body.password;
    const phot=""

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

app.post("/chat",async(req,res)=>{
    res.json({
        mesaage:"chat"
    })
})

app.listen(3001);