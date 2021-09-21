import express from "express";
import { getEvent } from "../controllers/events.js";

const router = express.Router();

router.get("/:eventId", async function(req,res,next) {

    const event = await getEvent(req,res);

    if(Object.prototype.toString.call(event) === "[object Error]")
    {
        if((event.status) < 500)
        res.status(event.status).send(event.message);
        else
        next(club.message);
    }
    else
    {
        res.setHeader("ContentType", "application/json");
        res.status(200).json(event);
    }
});

export default router;