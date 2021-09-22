import express from "express";
import nodemailer from "nodemailer";
import approvalModel from "../models/approvals.js";
import { approveApproval, declineApproval } from "../controllers/approvals.js";
import { usern, passw } from "../credentials.js"

const router = express.Router();

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: usern,
        pass: passw
    }
});


router.get("/:approvalId/approve", async function (req, res, next) {

    const approve = await approveApproval(req, res);

    if (Object.prototype.toString.call(approve) === "[object Error]") 
    {
        if ((approve.status) < 500)
        res.status(approve.status).send(approve.message);
        else
        next(approve.message);
    }
    else 
    {
        res.setHeader("ContentType", "application/json");
        res.status(200).json({ message: "The approval approved successfully."});

        var mailOptions =  
        {
            from: usern,
            to: approve.studentid.email,
            subject: `WELCOME to ${approve.clubid.name} Club`,
            text: `Congratulations ${approve.studentid.name}, your approval for joining the ${approve.clubid.name} Club is approved.`
        };

        transporter.sendMail(mailOptions, function (error, info) {
            next(error);
        });
    }

});

router.get("/:approvalId/decline", async function (req, res, next) {

    const decline = await declineApproval(req, res);

    if (Object.prototype.toString.call(decline) === "[object Error]") {

        if ((decline.status) < 500)
        res.status(decline.status).send(decline.message);
        else
        next(decline.message);
    }
    else 
    {
        res.setHeader("ContentType", "application/json");
        res.status(200).json({ message: "The Approval declined Successfully."});

        var mailOptions = {
            from: usern,
            to: decline.studentid.email,
            subject: `Approval Declined`,
            text: `Sorry ${decline.studentid.name}, you approval for joining the ${decline.clubid.name} Club was declined.`
        };

        transporter.sendMail(mailOptions, function (error, info) {
            next(error);
        });
    }

});

router.get("/:approvalId/meet", async function (req, res, next) {

    res.status(200).send("Meet form will be loaded here.");

});

router.post("/:approvalId/meet", async function(req, res, next){

    const { approvalId } = req.params;

    const body = req.body;

    function makeid() 
    {
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      
        for (var i = 0; i < 10; i++)
          text += possible.charAt(Math.floor(Math.random() * possible.length));
      
        return text;
    }

    const meet = `meet.google.com/lookup/${makeid()}`;

    var approval;

    try {
        approval = approvalModel.findById(approvalId)
                                .populate("studentid", ["name", "email"])
                                .populate("clubid", "name");
        
    } catch (error) {
        error.message = "Unable to access database.";
        res.status(500).send(error.message);
        
    }

    var mailOptions = {
        from: usern,
        to: approval.studentid.email,
        bcc: req.user.email,
        subject: "Invitation to interview",
        text: `Dear ${approval.studentid.name},\n The president of ${approval.clubid.name} Club wants to interview you on ${body.date} at ${body.time}.\n The meet link is ${meet}.`
    };

    transporter.sendMail(mailOptions, function (error, info) {
        next(error);
    });
    
});

export default router;