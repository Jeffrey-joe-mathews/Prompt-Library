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

const Prompt = mongoose.model('Prompt', promptSchema);

export default Prompt;