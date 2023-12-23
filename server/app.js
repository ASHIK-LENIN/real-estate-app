const express = require('express')
const connectDB = require('./DB/connect')
require('dotenv').config();
const userRouter = require('./Routes/user.route')
const authRouter = require('./Routes/auth.route')
const cookieParser = require('cookie-parser')

const cors = require('cors')

const app = express();

app.use(express.json());

app.use(cookieParser());

app.use(
    cors({
        origin: 'http://localhost:5173',
    })
);

const port = 3000;



app.use('/api/user', userRouter)
app.use('/api/auth', authRouter)

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    return res.status(statusCode).json({
      success: false,
      statusCode,
      message,
      
    });
  });
  


const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI);
        app.listen(port,() =>{
            console.log(`server listening at port ${port}`);
        });
    } catch (error) {
        console.log(error);
    }
};

start();