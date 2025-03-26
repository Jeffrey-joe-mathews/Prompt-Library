import express from 'express';

import { connectDB } from './config/db.js';

import dotenv from 'dotenv';
dotenv.config();

const app = express();

app.get('/prompts', (req, res) => {
    console.log(process.env.MONGO_URI);
    res.send("Hello world");
})

app.listen (5000, () => {
    connectDB();
    console.log("Server has started on post 5000");
    
});