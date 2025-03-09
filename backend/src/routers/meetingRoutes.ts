import express from "express";
import { getMeetingsByTeam, addMeeting, deleteMeeting } from "../controllers/meetingController";

const router = express.Router();

// 📌 Route pour récupérer les réunions d’un groupe spécifique
router.get("/meetings-per-team/:teamId", getMeetingsByTeam);

// 📌 Route pour ajouter une réunion
router.post("/meetings", async (req: express.Request, res: express.Response) => {
    await addMeeting(req, res);
})

// 📌 Route pour supprimer une réunion (✅ Correction ici)
router.delete("/meetings/:meetingId",async (req: express.Request, res: express.Response) => {
    await deleteMeeting(req, res);
})

export default router;