import express from "express";
import { getAllTeams } from "../controllers/teamController";

const router = express.Router();

// 📌 Route pour récupérer tous les groupes de développement
router.get("/teams", getAllTeams);

export default router;