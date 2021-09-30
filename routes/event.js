import express from "express";
import eventModel from "../models/events.js";
import { getEvent, putEvent, delEvent } from "../controllers/events.js";

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
        res.setHeader("ContentType", "application/json");
        res.status(200).json(event);
    }
});

router.get("/:eventId/edit", async function(req,res,next){

    // Already posted data redenering remaining
    
    if(req.session.passport === undefined)
    {
        var err = new Error("You are not logged in.");
        err.status = 400;
        res.status(err.status).send(err.message);
    }
    
    const { eventId } = req.params;

    if(!mongoose.Types.ObjectId.isValid(eventId))
    {
        var err = new Error("The Event doesn't exsist.");
        err.status = 406;
        res.status(err.status).send(err.message);
    }

    var event;
    
    try {
        event = await eventModel.findOne({ _id: eventId })
                                .populate("clubid", "presidentid");
        
    } catch (error) {
        error.message = "Unable to connect with database.";
        res.status(error.status).send(error.message);          
    }

    if(event === null)
    {
        var err = new Error("The Event doesn't exsist.");
        err.status = 406;
        res.status(error.status).send(error.message); 
    }

    if(event.clubid.presidentid != req.session.passport.user)
    {
        var err = new Error("You are not president of club.");
        err.status = 400;
        res.status(error.status).send(error.message); 
    }

    res.status(200).send("The event edit form will render here.")
});

router.put("/:eventId", async function(req,res,next) {

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

router.delete("/:eventId", async function(req,res,next) {

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