import express from "express";
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