import express from "express";
import { getMeetingsByTeam, addMeeting, deleteMeeting, updateMeeting } from "../controllers/meetingController";

const router = express.Router();

// 📌 Route pour récupérer les réunions d'un groupe spécifique
router.get("/meetings/:teamId", getMeetingsByTeam);

// 📌 Autres routes pour ajouter, supprimer et mettre à jour les réunions
router.post("/meetings", async (req: express.Request, res: express.Response) => {
    await addMeeting(req, res);
});

router.delete("/meetings/:meetingId", async (req: express.Request, res: express.Response) => {
    await deleteMeeting(req, res);
});

router.put("/meetings/:id", async (req: express.Request, res: express.Response) => {
    await updateMeeting(req, res);
});

export default router;