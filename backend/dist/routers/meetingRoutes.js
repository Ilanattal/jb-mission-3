"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const meetingController_1 = require("../controllers/meetingController");
const router = express_1.default.Router();
// 📌 Route pour récupérer les réunions d’un groupe spécifique
router.get("/meetings-per-team/:teamId", meetingController_1.getMeetingsByTeam);
// 📌 Route pour ajouter une réunion
router.post("/meetings", async (req, res) => {
    await (0, meetingController_1.addMeeting)(req, res);
});
// 📌 Route pour supprimer une réunion (✅ Correction ici)
router.delete("/meetings/:meetingId", async (req, res) => {
    await (0, meetingController_1.deleteMeeting)(req, res);
});
router.put("/meetings/:id", async (req, res) => {
    await (0, meetingController_1.updateMeeting)(req, res);
});
exports.default = router;
