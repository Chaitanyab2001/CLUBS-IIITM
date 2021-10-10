import express from "express";
import { getEvent, putEvent, delEvent } from "../controllers/events.js";
import imageUpload from "../middleware/imageUpload.js";
import clubModel from "../models/clubs.js";

const router = express.Router();

router.get("/:eventId", async function(req,res,next) {

    const event = await getEvent(req,res);

    if(Object.prototype.toString.call(event) === "[object Error]")
    {
        if((event.status) < 500)
        res.status(event.status).send(event.message);
        else
        next(event.message);
    }
    else
    {
        var ispresident = false;
        var club;
        try {
            club = await clubModel.findOne({ eventids: { $elemMatch: { $eq: event._id } } });
            
        } catch (error) {
            return res.status(error.status).send(error.message);            
        }

        if(club.presidentid == req.session.passport.user)
        {
            ispresident = true;
        }


        res.setHeader("ContentType", "application/json");
        res.status(200).render('events', { event, ispresident });
        //res.status(200).json(event);
    }
});

router.get("/:eventId/edit", async function(req,res,next){

    if (req.session.passport === undefined) {
        var err = new Error("You are not logged in.");
        err.status = 400;
        return res.status(err.status).send(err.message);
    }

    const event = await getEvent(req,res);

    if(Object.prototype.toString.call(event) === "[object Error]")
    {
        if((event.status) < 500)
        res.status(event.status).send(event.message);
        else
        next(event.message);
    }
    else
    {
        var club;
        try {
            club = await clubModel.findOne({ eventids: { $elemMatch: { $eq: event._id } } });
            
        } catch (error) {
            return res.status(error.status).send(error.message);            
        }

        if(club.presidentid != req.session.passport.user)
        {
            var err = new Error("You are not president of club.");
            err.status = 400;
            return res.status(err.status).send(err.message); 
        }
    
        res.setHeader("ContentType", "application/json");
        // res.status(200).json({ message: "The event edit form will render here.", event: event });
        res.status(200).render('edit_events',{ event: event });
    }

});

router.post("/:eventId", imageUpload.single("image"), async function(req,res,next) {

    const event = await putEvent(req,res);

    if(Object.prototype.toString.call(event) === "[object Error]")
    {
        if((event.status) < 500)
        res.status(event.status).send(event.message);
        else
        next(event.message);
    }
    else
    {
        res.setHeader("ContentType", "application/json");
        res.status(200).send("The event is updated successfully.");
    }
});

router.post("/:eventId/delete", async function(req,res,next) {

    const event = await delEvent(req,res);

    if(Object.prototype.toString.call(event) === "[object Error]")
    {
        if((event.status) < 500)
        res.status(event.status).send(event.message);
        else
        next(event.message);
    }
    else
    {
        res.setHeader("ContentType", "application/json");
        res.status(200).send("The event is deleted successfully.");
    }
});

export default router;