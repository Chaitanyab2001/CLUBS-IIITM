import express from "express";
import nodemailer from 'nodemailer';
import { getApproval , postApproval , getApprovalRequest} from "../controllers/approvals.js";
import {usern, passw} from "../credentials.js"

const router = express.Router();

router.get("/:approvalId/approve", async function (req, res, next) {

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

        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: usern,
                pass: passw
            }
        });

        var mailOptions = {
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

router.get("/:approvalId/meet", async function (req, res, next) {

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

        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: usern,
                pass: passw
            }
        });

        var mailOptions = {
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

router.post("/", async function(req,res,next) {

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

router.get("/", getApprovalRequest);

export default router;