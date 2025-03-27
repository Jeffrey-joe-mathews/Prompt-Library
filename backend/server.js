import express from 'express';

import { connectDB } from './config/db.js';

import dotenv from 'dotenv';
import Prompt from './models/prompt.model.js';
import mongoose, { Mongoose } from 'mongoose';
dotenv.config();

const app = express(); // creating an instance of express
app.use(express.json()); // middleware

app.get('/api/prompts', async(req, res) => {
    try {
        const prompts = await Prompt.find({}); // empty object means to fetch all prompts from thwe database
        res.status(200).json(
            {
                "success" : true,
                "data" : prompts
            }
        );
    }
    catch (error) {
        console.error(`error in GET for getting the prompts : ${error.message}`);
        res.status(400).json(
            {
                "success" : false,
                "message" : "unable to GET prompts"
            }
        )
    }
})

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

app.put('/api/prompts/:id', async(req, res) => {
    const {id} = req.params;
    const prompt = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        res.status(404).json(
            {
                "success" : false,
                "message" : "unable to PUT as the id appears tyo be non exixtent... TO BE OR NOT TO BE THAT IS THE QUESTION"
            }
        )
    }

    try {
        const updatedPrompt = await Prompt.findByIdAndUpdate(id, prompt, {new : true});
        res.status(200).json(
            {
                "success" : true,
                "data" : updatedPrompt
            }
        );
    }
    catch (error) {
        console.error("Unable to PUT(update) product");
        res.status(500).json(
            {
                "success" : false,
                "message" : "unable to update the prompt.. somethging seems to be wrong"
            }
        );
    }

})

app.delete('/api/prompts/:id', async(req, res) => {
    const {id} = req.params;
    console.log(`id : ${id}`);
    try {
        await Prompt.findByIdAndDelete(id);
        res.status(200).json(
            {
                "success" : true,
                "message" : "the entity has been deleted successfully",
            }
        );
    }
    catch (error) {
        console.error(`deletion error : ${error}`);
        res.status(404).json(
            {
                "success" : false,
                "message" : "error in deleting the document"
            }
        );
    }
})


app.listen (5000, async () => {
    await connectDB();
    console.log("Server has started on post 5000"); 
});