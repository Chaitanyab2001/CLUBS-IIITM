import eventModel from "../models/events.js";

export const getEvent = async (req,res) => {
    try {
        const events = await eventModel.find();
        res.setHeader("ContentType", "application/json");
        res.status(200).json(events);
        
    } catch (error) {
        res.setHeader("ContentType", "application/json");
        res.status(error.status).json({ message: error.message });
    }

};

export const postEvent = async (req,res) => {

    const body = req.body;
    const newevent = new eventModel(body);
    try {
        await newevent.save();
        res.setHeader("ContentType", "application/json");
        res.status(201).json(newevent);
        
    } catch (error) {
        res.setHeader("ContentType", "application/json");
        res.status(error.status).json({ message: error.message });        
    }

};

export const putEvent = async (req,res) => {
    try {
        await eventModel.updateOne({name:req.body.name},req.body);
        res.setHeader("ContentType", "application/json");
        res.status(201).json(req.body);
        
    } catch (error) {
        res.setHeader("ContentType", "application/json");
        res.status(error.status).json({ message: error.message });
    }
};

export const delEvent = async (req,res) => {
    try {
        await eventModel.deleteOne(req.body);
        res.setHeader("ContentType", "application/json");
        res.status(201).json(req.body);
        
    } catch (error) {
        res.setHeader("ContentType", "application/json");
        res.status(error.status).json({ message: error.message });
    }
};