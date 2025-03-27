import express from 'express';
import { connectDB } from './config/db.js';
import dotenv from 'dotenv';

import promptRoutes from './routes/prompt.route.js';

dotenv.config();

const app = express(); // creating an instance of express
app.use(express.json()); // middleware

app.use('/api/prompts', promptRoutes)


app.listen (5000, async () => {
    await connectDB();
    console.log("Server has started on post 5000"); 
});