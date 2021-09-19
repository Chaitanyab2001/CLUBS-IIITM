import express from "express";
import { getClubs } from "../controllers/clubs.js";
import { getEvents } from "../controllers/events.js";

const router = express.Router();

router.get('/', async function(req,res,next) {

    const clubs = await getClubs(req,res);
    const recentevents = await getEvents(req,res);

    if(Object.prototype.toString.call(clubs) === "[object Error]" || Object.prototype.toString.call(recentevents) === "[object Error]")
    {
        if(Object.prototype.toString.call(clubs) === "[object Error]")
        {
            res.status(clubs.status).send(clubs);
            if((clubs.status)/100 === 5)
            next(clubs);
        }
        else
        {
            res.status(recentevents.status).send(recentevents);
            if((recentevents.status)/100 === 5)
            next(recentevents);
        }
    }
    else
    {
        res.setHeader("ContentType", "application/json");
        res.status(200).json({ clubs: clubs, recentevents: recentevents});
    }
})

export default router;