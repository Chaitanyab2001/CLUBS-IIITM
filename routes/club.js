import express from "express";
import { getClub } from "../controllers/clubs.js";

const router = express.Router();

router.get("/:id", async function(req,res,next) {

    const club = await getClub(req,res);

    if(Object.prototype.toString.call(club) === "[object Error]")
    {
        res.status(club.status).send(club.message);
        if((club.status)/100 === 5)
        next(club);
    }
    else
    {
        res.setHeader("ContentType", "application/json");
        res.status(200).json(club);
    }
});

export default router;