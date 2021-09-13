import mongoose from "mongoose";

import eventModel from "./events.js"

const clubSchema = mongoose.Schema({
    
    name: {
        type: String,
        unique: true
    },
    description: String,
    achievements: [String],
    eventids: [{ type: ObjectId, ref: 'eventModel'}],
    memberids: [studentSchema],
    presidentid: studentSchema,
    typeofclub: {
        enum: ["Technical", "Cultural"],
        default: "Technical"
    }
});

const clubModel = mongoose.Model("clubModel", clubSchema);

export default clubModel;