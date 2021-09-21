import mongoose from "mongoose";

export const studentSchema = mongoose.Schema({
    name: {
        type: String,
        default: "",
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    phoneno: Number,
    linkedin: String,
    bio: String,
    branch: String,
    year: {
        type: Number,
        minimum: 1,
        maximum: 5
    },
    googleId: String

});

const studentModel = mongoose.model("studentModel", studentSchema);

export default studentModel;