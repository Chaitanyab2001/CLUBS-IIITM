import mongoose from "mongoose";

const clubSchema = mongoose.Schema({
    
    name: {
        type: String,
        unique: true
    },
    description: String,
    achievements: [String],
    eventids: [eventSchema],
    memberids: [studentSchema],
    presidentid: studentSchema,
    typeofclub: {
        enum: ["Technical", "Cultural"],
        default: "Technical"
    }
});

const clubModel = mongoose.Model("clubModel", clubSchema);

export default clubModel;