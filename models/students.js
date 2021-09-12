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
    branch: {
        enum: ["BCS", "IMT", "IMG", "MBA", "MTCN", "MTVLSI", "MTIS", null],
        default: null
    },
    year: {
        type: Number,
        minimum: 1,
        maximum: 5
    }

});

const studentModel = mongoose.Model("studentModel", studentSchema);

export default studentModel;