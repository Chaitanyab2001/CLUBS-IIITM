import mongoose from "mongoose";

const eventSchema = mongoose.Schema({
    
    name: {
        type: String,
        unique: true
    },
    time: String,
    date: String,
    link: {
        type: String,
        unique: true
    },
    clubId: Number,
    description: String,
});

const eventModel = mongoose.Model("eventModel", eventSchema);

export default eventModel;