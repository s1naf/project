const express = require('express');
const mongoose  = require('mongoose');
const app = express();
const port = 3000;

mongoose.connect(process.env.MONGODB_URI)
    .then(
        ()=>{console.log('Connected to MongoDB')},
        err =>{console.log('Failed to connect to MongoDB')}
    )

app.use(express.json())

app.post('/register',(req,res)=>{
    let firstname = req.body.firstname;
    let lastname = req.body.lastname;
    let email = req.body.email;
    let password = req.body.password;
    let age = req.body.age;

    console.log("Registe user:" ,firstname , lastname, email)
    res.send(firstname)
})

const user = require('/routes/user.routes');
app.use('/api/user',user);

app.listen(port,()=>{
    console.log("Server is up")
})