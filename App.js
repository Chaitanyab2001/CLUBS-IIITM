import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";

import { username, password } from "./credentials.js";

import clubRouter from "./routes/clubs.js";
import eventRouter from "./routes/events.js";

const app = express();

app.use(express.urlencoded({extended: true}));
app.use(express.json()) 
app.use(cors());

app.use("/club", clubRouter);
app.use("/event", eventRouter);

const CONNECTION_URL = `mongodb+srv://${username}:${password}@clubsiiitm.awqoq.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const PORT = process.env.PORT || 5000;

mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => app.listen(PORT, () => console.log(`The server is running on port: ${PORT}`)))
    .catch((error) => console.log(error.message));

