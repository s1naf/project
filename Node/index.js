const express = require('express');
const mongoose  = require('mongoose');
const cors = require('cors');
const app = express();
const port = 3000;
const questionsRoutes = require('./routes/choices-routes');
const userRoutes = require('./routes/user-routes');

app.use(cors());

mongoose.connect(process.env.MONGODB_URI)
    .then(
        ()=>{console.log('Connected to MongoDB')},
        err =>{console.log('Failed to connect to MongoDB')}
    )

app.use(express.json());


app.use('/api/users',userRoutes);
app.use('/api/choices',questionsRoutes);

app.listen(port,()=>{
    console.log("Server is up");
})