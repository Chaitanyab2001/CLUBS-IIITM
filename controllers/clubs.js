import clubModel from "../models/clubs.js";

export const getClubs = async (req,res) => {
    try {
        const clubs = await clubModel.find();
        res.status(200).json(clubs);
        
    } catch (error) {
        res.status(error.status).json({ message: error.message });
    }

};

export const createClub = async (req,res) => {

    const body = req.body;
    const newClub = new clubModel(body);
    console.log(body);

    try {
        await newClub.save();
        res.status(201).json(newClub);
        
    } catch (error) {
        res.status(error.status).json({ message: error.message });        
    }

};
