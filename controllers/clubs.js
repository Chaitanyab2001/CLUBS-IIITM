import mongoose from "mongoose";
import clubModel from "../models/clubs.js";

export const getClub = async (req, res) => {

    const { clubId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(clubId)) {
        var err = new Error("Club not found.");
        err.status = 406;
        return err;
    }

    try {
        const club = await clubModel.findOne({ _id: clubId }).populate("presidentid", "name")
                                                             .populate("eventids", "name");
        return club;

    } catch (error) {
        return error;
    }

};

export const getClubs = async (req, res) => {
    try {
        const clubs = await clubModel.find();
        return clubs;

    } catch (error) {
        return error;
    }

};

export const postClub = async (req, res) => {

    const body = req.body;
    const newClub = new clubModel(body);

    try {
        await newClub.save();
        return newClub;

    } catch (error) {
        return error;
    }

};


export const putClub = async (req, res) => {

    const body = req.body;
    var club;

    try {
        club = await clubModel.findOne({ _id: body._id });

    } catch (error) {
        return error;

    }

    if (club != null) {
        try {
            await clubModel.updateOne({ _id: body._id }, req.body);
            return (await clubModel.findOne(body));

        } catch (error) {
            return error;
        }
    }
    else {
        var err = new Error("The Club doesn't exsist.");
        err.status = 406;
        return err;
    }
};

export const delClub = async (req, res) => {

    const body = req.body;
    var club;

    try {
        club = await clubModel.findOne({ _id: body._id });

    } catch (error) {
        return error;

    }

    if (club != null) {
        try {
            await clubModel.deleteOne(body);
            return body;

        } catch (error) {
            return error;
        }
    }
    else {
        var err = new Error("The Club doesn't exsist.");
        err.status = 406;
        return err;
    }
};