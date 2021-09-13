import clubModel from "../models/clubs.js";

export const getClubs = async (req,res) => {
    try {
        const clubs = await clubModel.find();
        res.setHeader("ContentType", "application/json");
        res.status(200).json(clubs);
        
    } catch (error) {
        res.setHeader("ContentType", "application/json");
        res.status(error.status).json({ message: error.message });
    }

};

export const createClub = async (req,res) => {

    const body = req.body;
    const newClub = new clubModel(body);

    try {
        await newClub.save();
        res.setHeader("ContentType", "application/json");
        res.status(201).json(newClub);
        
    } catch (error) {
        res.setHeader("ContentType", "application/json");
        res.status(error.status).json({ message: error.message });        
    }

};
