import express from "express";
import nodemailer from 'nodemailer';
import { getClub, postClub } from "../controllers/clubs.js";
import { postEvent } from "../controllers/events.js";
import { getApproval , getDecline , postApproval , getApprovalRequest} from "../controllers/approvals.js";
import {usern, passw} from "../credentials.js"

const router = express.Router();

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: usern,
        pass: passw
    }
});

router.get("/:clubId", async function(req,res,next) {

    const club = await getClub(req,res);

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
        res.status(200).json(club);
    }
});

router.post("/", async function(req,res,next) {

    const club = await postClub(req,res);

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
        res.status(200).json(club);
    }

});

router.post("/:clubId/event", async function(req,res,next) {

    const event = await postEvent(req,res);

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

router.get("/:clubId/approval", getApprovalRequest);

router.post("/:clubId/approval", async function(req,res,next) {

    const approval = await postApproval(req,res);

    if(Object.prototype.toString.call(approval) === "[object Error]")
    {
        if((approval.status) < 500)
        res.status(approval.status).send(approval.message);
        else
        next(approval.message);
    }
    else
    {
        res.setHeader("ContentType", "application/json");
        res.status(200).json(approval);
    }

});

router.get("/:clubId/approval/:approvalId/meet", async function (req, res, next) {

    function makeid() {
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      
        for (var i = 0; i < 10; i++)
          text += possible.charAt(Math.floor(Math.random() * possible.length));
      
        return text;
      }

    const meet = {
        link:`meet.google.com/lookup/${makeid()}`,
        time:`${Date()}`
    };
        res.setHeader("ContentType", "application/json");
        res.status(200).json(meet);

        let mailOptions = {
            from: usern,
            to: 'jayraykhere@gmail.com',
            subject: 'Meeting for interview',
            text: `Club head want to meet you at ${meet.time}. The meet link is ${meet.link}.`
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });
    

});

router.get("/:clubId/approval/:approvalId/approved", async function (req, res, next) {

    const approve = await getApproval(req, res);

    if (Object.prototype.toString.call(approve) === "[object Error]") {
        if ((approve.status) < 500)
            res.status(approve.status).send(approve.message);
        else
            next(approve.message);
    }
    else {
        res.setHeader("ContentType", "application/json");
        res.status(200).json(approve);

        let mailOptions = {
            from: usern,
            to: 'jayraykhere@gmail.com',
            subject: 'Approval message',
            text: 'Congratulations, you are approved.'
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });
    }

});

router.get("/:clubId/approval/:approvalId/declined", async function (req, res, next) {

    const decline = await getDecline(req, res);

    if (Object.prototype.toString.call(decline) === "[object Error]") {
        if ((decline.status) < 500)
            res.status(decline.status).send(decline.message);
        else
            next(decline.message);
    }
    else {
        res.setHeader("ContentType", "application/json");
        res.status(200).json(decline);

        let mailOptions = {
            from: usern,
            to: 'jayraykhere@gmail.com',
            subject: 'Declined message',
            text: 'you are declined.'
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });
    }

});

export default router;