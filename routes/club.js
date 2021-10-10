import express from "express";
import mongoose from "mongoose";
import clubModel from "../models/clubs.js";
import { getClub, putClub, removeMember, getJoinButton, getVerifyPresident } from "../controllers/clubs.js";
import { postEvent } from "../controllers/events.js";
import { getClubApprovals, postApproval } from "../controllers/approvals.js";
import nodemailer from "nodemailer";
import imageUpload from "../middleware/imageUpload.js";

const router = express.Router();

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.usern,
        pass: process.env.passw
    }
});

router.get("/:clubId", async function (req,res, next) {

    const club = await getClub(req, res);
    const approvals = await getClubApprovals(req, res);
    const joinbutton = await getJoinButton(req,res);
    const verifypresident = await getVerifyPresident(req,res);

    switch ("[object Error]") {
        case Object.prototype.toString.call(club):
            if ((club.status) < 500)
            res.status(club.status).send(club.message);
            else
            next(club.message);
            break;

        case Object.prototype.toString.call(approvals):
            if ((approvals.status) < 500)
            res.status(approvals.status).send(approvals.message);
            else
            next(approvals.message);
            break;

        case Object.prototype.toString.call(joinbutton):
            if ((joinbutton.status) < 500)
            res.status(joinbutton.status).send(joinbutton.message);
            else
            next(joinbutton.message);
            break;
        
        case Object.prototype.toString.call(verifypresident):
            if ((verifypresident.status) < 500)
            res.status(verifypresident.status).send(verifypresident.message);
            else
            next(verifypresident.message);
            break;

        default:
            res.setHeader("ContentType", "application/json");
            // res.status(200).json({ club: club, approvals: approvals, joinbutton: joinbutton, verifypresident: verifypresident });
            res.render('club',{ club, approvals, joinbutton, verifypresident });
            break;
    }
});

router.get("/:clubId/edit", async function(req,res,next){

    const club = await getClub(req,res);

    if(req.session.passport === undefined)
    {
        var err = new Error("You are not logged in.");
        err.status = 400;
        res.status(err.status).send(err.message);
        return ;
    }

    if(Object.prototype.toString.call(club) === "[object Error]")
    {
        if((club.status) < 500)
        res.status(club.status).send(club.message);
        else
        next(club.message);
    }
    else
    {
        if(club.presidentid._id != req.session.passport.user)
        {
            var err = new Error("You are not president of club.");
            err.status = 400;
            res.status(error.status).send(error.message); 
            return ;
        }
    
        res.setHeader("ContentType", "application/json");
        // res.status(200).json({ message: "The club edit form will render here.", club: club });
        res.render('update_club.ejs',{ message: "The club edit form will render here.", club: club });
    }

});

router.post("/:clubId", imageUpload.single("image"), async function(req,res,next) {

    const club = await putClub(req,res);

    if(Object.prototype.toString.call(club) === "[object Error]")
    {
        if((club.status) < 500)
        res.status(club.status).send(club.message);
        else
        next(club.message);
    }
    else
    {
        res.setHeader("ContentType", "application/json");
        res.status(200).send("The club is updated successfully.");
    }
});

router.get("/:clubId/event", async function (req, res, next) {

    if (req.session.passport === undefined) {
        var err = new Error("You are not logged in.");
        err.status = 400;
        return res.status(err.status).send(err.message);
    }

    const { clubId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(clubId)) {
        var err = new Error("The Club doesn't exsist.");
        err.status = 406;
        return res.status(err.status).send(err.message);
    }

    var club;

    try {
        club = await clubModel.findOne({ _id: clubId });

    } catch (error) {
        error.message = "Unable to connect with database.";
        return res.status(error.status).send(error.message);
    }

    if (club === null) {
        var err = new Error("The Club doesn't exsist.");
        err.status = 406;
        return res.status(err.status).send(err.message);
    }

    if (club.presidentid != req.session.passport.user) {
        var err = new Error("You are not president of club.");
        err.status = 400;
        return res.status(err.status).send(err.message);
    }

    res.status(200).render('addEvent', { club });
    //res.status(200).send("The event creation form will render here.")
});

router.post("/:clubId/event", imageUpload.single("image"), async function (req, res, next) {

    const event = await postEvent(req, res);

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
        res.status(200).json({ message: "The Event is created Successfully. "});
    }

});

router.get("/:clubId/approval", async function(req,res,next) {

    const approval = await postApproval(req, res);

    if (Object.prototype.toString.call(approval) === "[object Error]") {
        if ((approval.status) < 500)
        res.status(approval.status).send(approval.message);
        else
        next(approval.message);
    }
    else {
        res.setHeader("ContentType", "application/json");
        res.status(200).send("Your approval has been submitted successfully.");
    }

});

router.get("/:clubId/remove/:studentId", async function(req,res,next) {

    const member = await removeMember(req,res);

    if(Object.prototype.toString.call(member) === "[object Error]")
    {
        if((member.status) < 500)
        res.status(member.status).send(member.message);
        else
        next(member.message);
    }
    else
    {
        res.setHeader("ContentType", "application/json");
        res.status(200).send("The member has been removed successfully.");

        var mailOptions = {
            from: process.env.usern,
            to: member.studentid.email,
            subject: `Fired from ${member.clubid.name}`,
            text: `Thank you for being with us. Sorry ${member.studentid.name}, you got fired from ${member.clubid.name} Club.`
        };

        transporter.sendMail(mailOptions, function (error, info) {
            next(error);
        });
    }

});

export default router;