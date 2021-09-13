import express from "express";

import { getClubs, createClub } from "../controllers/clubs.js";

const router = express.Router();

router.get("/", getClubs);
router.post("/", createClub);

export default router;