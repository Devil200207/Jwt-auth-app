const express = require('express');
const jwt = require("jsonwebtoken");
const {authMiddleware} = require("middleware.js");

const app = express();
const PORT = 3000;
const sectret = "chinmay12345"

const Notes = [];
const Users = [];

app.use(express.json());


app.post("/signup",(req,res) =>{
    const username = req.body.username;
    const password = req.body.password;
    const existing = Users.find(user => user.username === username);
    if(existing)
    {
        res.status(400).json("User already exisit")
    }

    Users.push({
        username:username,
        password:password
    })

    res.status(200).json("New user added");
})

app.post("/signin",(req,res) =>{
    const username = req.body.username;
    const password = req.body.password;
    const existing = Users.find(user => user.username === username && user.password === password);
    if(!existing)
    {
        res.status(400).json("User did not exisit or Invalid credentials")
    }

    const token = jwt.sign({
        username:username
    },sectret)
    res.json({
        token: token
    })


})

app.post("/notes",authMiddleware,(req,res) =>{

    req.username = username

    const newnotes = {username:username,title:req.body.title};
    Notes.push(newnotes);
    res.json(newnotes);
})

app.get("/notes",authMiddleware,(req,res)=>{
    const username = req.username;

    const all_usertoken = Notes.filter(notes => notes.username === username);

    return res.json({
        notes:all_usertoken
    });
})

app.get("/",(req,res) =>{
    res.sendFile("/Volumes/T7 Shield/pratics/jwt and authnetication/frontend/index.html")
})

app.get("/signin",(req,res) =>{
    res.sendFile("/Volumes/T7 Shield/pratics/jwt and authnetication/frontend/signin.html")
})

app.get("/signup",(req,res) =>{
    res.sendFile("/Volumes/T7 Shield/pratics/jwt and authnetication/frontend/signup.html")
})

app.listen(PORT,()=>{
    console.log("app is listning on port: ",PORT);
})