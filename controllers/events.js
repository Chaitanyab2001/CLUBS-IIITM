import mongoose from "mongoose";
import eventModel from "../models/events.js";

export const getEvent = async (req,res) => {

    const { eventId: _id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(_id))
    {
        var err = new Error("The Event doesn't exsist.");
        err.status = 406;
        return err;
    }

    try {
        const event = await eventModel.findOne({ _id: _id});
        return event;
        
    } catch (error) {
        return error;
    }

};

export const getRecentEvents = async (req,res) => {



};

export const getEvents = async (req,res) => {
    try {
        const events = await eventModel.find();
        return events;
        
    } catch (error) {
        return error;
    }

};

export const postEvent = async (req,res) => {

    const body = req.body;
    const newevent = new eventModel(body);

    try {
        await newevent.save();
        return newevent;
        
    } catch (error) {
        return error;     
    }

};

export const putEvent = async (req,res) => {
    var event;

    try {
        event = await eventModel.findOne({ _id: req.body._id});
        
    } catch (error) {
        return error;   

    }
    
    if(event!=null)
    {
        try {
            await eventModel.updateOne({ _id: req.body._id }, req.body);
            return (await eventModel.findOne(req.body));
        
        } catch (error) {
            return error;
        }
    }
    else
    {
        var err = new Error("The Event doesn't exsist.");
        err.code(406);
        return err;
    }
};

export const delEvent = async (req,res) => {

    var event;

    try {
        event = await eventModel.findOne({ _id: req.body._id});
        
    } catch (error) {
        return error;  

    }
    
    if(event!=null)
    {
        try {
            await eventModel.deleteOne(req.body);
            return req.body;
        
        } catch (error) {
            return error;
        }
    }
    else
    {
        var err = new Error("The Event doesn't exsist.");
        err.code(406);
        return err;
    }
};