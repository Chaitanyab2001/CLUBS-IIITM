import mongoose from "mongoose";

const studentSchema = mongoose.Schema({
    name: {
        first: String,
        last: String
    },
    email: {
        type: String,
        unique: true
    },
    phoneno: {
        type: Number,
        unique: true
    }
})