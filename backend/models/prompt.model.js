import mongoose from 'mongoose';

const promptSchema = new mongoose.Schema({
    name:{
        type: String,
        required: false,
    },
    prompt:{
        type: String,
        required: true,
    },
    image:{
        type: String,
        required: true,
    },

}, {
    timestamps: true, // contains created at and updated at
});

// here the prompt which is declared as a const is the collection
const Prompt = mongoose.model('Prompt', promptSchema); // mongoose will aoutomatically make it something like this : prompts as a collection so use captitalized singular version

export default Prompt;