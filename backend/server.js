import express from 'express';
const app = express(); // creating an instance of express

import { connectDB } from './config/db.js';

import dotenv from 'dotenv';
dotenv.config();

import promptRoutes from './routes/prompt.route.js';

const PORT = process.env.PORT || 5000;

app.use(express.json()); // middleware

app.use('/api/prompts', promptRoutes)


app.listen (PORT, async () => {
    await connectDB();
    console.log("Server has started on post "+PORT); 
});