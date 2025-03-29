import express from 'express';
const app = express(); // creating an instance of express
import path from 'path';

import { connectDB } from './config/db.js';

import dotenv from 'dotenv';
dotenv.config();

import promptRoutes from './routes/prompt.route.js';

const PORT = process.env.PORT || 5000;

const __dirname = path.resolve();

app.use(express.json()); // middleware

app.use('/api/prompts', promptRoutes)

if(process.env.NODE_ENV === "production") {
 app.use(express.static(path.join(__dirname, "/frontend/dist")));   

 app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
 })
}

app.listen (PORT, async () => {
    await connectDB();
    console.log("Server has started on post "+PORT); 
});