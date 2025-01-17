import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import connectDB from './config/mongodb.js';

const app = express();
const PORT = process.env.PORT || 3000;
connectDB();
dotenv.config()

app.use(express.json()); // it parses the incoming json request from req.body for POST & PUT methods - will be undefined without configuration
app.use(cookieParser()); // it parses the cookies sent in the req.cookies and makes them availabe via req.cookies
app.use(cors({ credentials: true }));


app.get('/', (req, res) => {
    res.send('Heellooooo')
})


app.listen(PORT, () => {
    console.log(`app listening on the port ${PORT}`);
})