const express = require("express");
const jwt=require("jsonwebtoken");

const app = express();

app.use(express.json())

app.get('/', (req,res)=>{
    res.json({
        message: "Berada di route"
    })  
})

app.post('/', verifyUser, (req,res)=>{
    res.json({
        message: "Data Berhasil di buat",
        data: req.body
    })
})

app.post('/login', (req,res)=>{
    const user={
        id: 1,
        username: "diptya",
        email: "diptya@gmail.com"
    }
    jwt.sign(user, 'secret', {expiresIn: '30s'}, (err,token)=>{
        if(err){
            console.log(err);
            res.sendStatus(404);
            return
         }
         const Token = token;
         res.json({
            user: user,
            token: Token
         });
    })
})

function verifyUser(req,res,next){
    const barrer= req.headers.barrer;
    jwt.verify(barrer, "secret", (err,data)=>{
        if(err){
            console.log(err.message);
            res.json(err);
            return
        }
        req.body= data
        next()
    })
}

app.listen(4000, ()=>{
    console.log("server berjalan di port 4000");
})