import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import cors from 'cors';
import authRouter from './routes/auth.route.js';
import userRouter from './routes/user.route.js';
import propertyRouter from './routes/property.route.js';

const app = express();
app.use(cors({
  origin: [
    'https://real-estate-website-qwrv.onrender.com', 
    'http://localhost:3000',
  ],
  credentials: true,               // allow credentials like cookies or auth headers
}));

dotenv.config();

app.use('/uploads',express.static('uploads'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect(process.env.MONGO_URL).then(() =>console.log('MongoDB connected')
).catch((error) => {
  console.error('MongoDB connection error:', error);
});


app.use('/auth',authRouter);
app.use('/user',userRouter);
app.use('/property',propertyRouter);

app.listen(process.env.PORT,() => {
  console.log(`Server is started at... http://localhost:${process.env.PORT}`);
});
