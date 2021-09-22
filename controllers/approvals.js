import mongoose from "mongoose";
import approvalModel from "../models/approvals.js";

export const getApproval = async (req,res) => {

    // const { _id: _id } = req.params;

    // if(!mongoose.Types.ObjectId.isValid(_id))
    // {
    //     var err = new Error("The Event doesn't exsist.");
    //     err.status = 406;
    //     return err;
    // }

    try {
        await approvalModel.updateOne({ _id: req.body._id }, {approved:true})
        const approve = await approvalModel.findOne({ _id: req.body._id});
        // res.json(approve);
        return approve;
        
    } catch (error) {
        error.message = "Unable to connect with database.";
        return error;
    }
};


export const postApproval = async (req,res) => {

    // const { studentId } = req.params;
    
    // if(!mongoose.Types.ObjectId.isValid(studentId))
    // {
    //     var err = new Error("The Club doesn't exsist.");
    //     err.status = 406;
    //     return err; 
    // }

    const body = req.body;
    const newapproval = new approvalModel(body);
    try {
        await newapproval.save();
            await await newapproval.save();
            return newapproval;
            
        } catch (error) {
            error.status = 400;
            error.message = "The request approval doesn't exsist.";
            return error;            
        }
};

export const getApprovalRequest = async (req,res) => {
    try {
        const approveReq = await approvalModel.find();
        res.json(approveReq);
        return approveReq;
        
    } catch (error) {
        error.message = "Unable to connect with database.";
        return error;
    }
};