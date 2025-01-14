const express = require('express');
const mongoose  = require('mongoose');
const cors = require('cors');
const app = express();
const port = 3000;
const postRoutes = require('./routes/posts-routes');
const userRoutes = require('./routes/user-routes');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');

app.use(helmet());
app.use(cookieParser());
// app.use(cors());
app.use(cors({
    origin: 'http://localhost:4200',
    credentials: true,
    optionsSuccessStatus: 200
}));


// const rateLimit = require('express-rate-limit');

// const limiter = rateLimit({
//     windowMs: 15 * 60 * 1000, // 15 λεπτά
//     max: 100 // περιορισμός σε 100 αιτήσεις ανά 15 λεπτά
// });

// app.use(limiter);

app.use(express.json());
app.use(express.urlencoded({extended:true}));



mongoose.connect(process.env.MONGODB_URI)
    .then(
        ()=>{console.log('Connected to MongoDB')},
        err =>{console.log('Failed to connect to MongoDB')}
    )


app.use('/api/users',userRoutes);
app.use('/api/posts',postRoutes);

app.listen(port,()=>{
    console.log("Server is up");
})