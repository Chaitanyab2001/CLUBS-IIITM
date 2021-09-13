import mongoose from "mongoose";

const studentSchema = mongoose.Schema({
    name: {
        type: String,
        default: ""
    },
    email: {
        type: String,
        unique: true
    },
    phoneno: {
        type: Number,
        unique: true,
        minimum: 1000000000,
        maximum: 9999999999
    },
    linkedin: {
        type: String,
        default: ""
    },
    bio: {
        type: String,
        default: ""
    },
    branch: String,
    year: {
        type: Number,
        minimum: 1,
        maximum: 5
    }

});

const studentModel = mongoose.model("studentModel", studentSchema);

export default studentModel;