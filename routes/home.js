import express from "express";
import { getClubs } from "../controllers/clubs.js";
import { getEvent } from "../controllers/events.js";

const router = express.Router();

router.get('/', async function(req,res,next) {

    const clubs = await getClubs(req,res);
    const recentevents = await getEvent(req,res);

    if(Object.prototype.toString.call(clubs) === "[object Error]" || Object.prototype.toString.call(recentevents) === "[object Error]")
    {
        const err = new Error("Unable to fetch data");
        res.status(500).send(err);
    }
    else
    {
        res.setHeader("ContentType", "application/json");
        res.status(200).json({ clubs: clubs, recentevents: recentevents});
    }
})

export default router;