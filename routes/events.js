import mongoose from "mongoose";

const eventSchema = mongoose.Schema({
    name: {
        type: String,
        unique: true
    },
    date: Date,
    meetlink: {
        type: String,
        unique: true
    },
    description: String,

});

const eventModel = mongoose.Model("eventModel", eventSchema);

export default eventModel;