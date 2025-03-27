import express from 'express';

import { connectDB } from './config/db.js';

import dotenv from 'dotenv';
import Prompt from './models/prompt.model.js';
dotenv.config();

const app = express(); // creating an instance of express
app.use(express.json()); // middleware

app.post('/api/prompts', async(req, res) => {
    const item = req.body;

    // if one of  the required data is not priovided
    if (!item.name || !item.image || !item.prompt) {
        res.status(400).json (
            {
                "success" : false,
                "message" : "please provide all the fields",
            }
        );
    }

    // if all the data is provided
    else {
        const newItem = new Prompt(item);

        try {
            await newItem.save();
            res.status(201).json(
                {
                    "success" : true,
                    "data": newItem,
                    "message" : "the data has been successfully offloaded onto the mongo cloud" ,
                }
            );
        } 
        
        catch (error) {
            console.error(`error emncountered while creating a product : ${error.message}`);
            res.status(500).json(
                {
                    "success" : false,
                    "data" : newItem,
                    "message" : "Server error please try again later"
                }
            );
        }

    }
}) 


app.listen (5000, async () => {
    await connectDB();
    console.log("Server has started on post 5000"); 
});