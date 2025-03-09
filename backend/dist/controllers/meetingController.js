"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateMeeting = exports.addMeeting = exports.deleteMeeting = exports.getMeetingsByTeam = void 0;
const sequelize_1 = require("sequelize");
const Meeting_1 = __importDefault(require("../models/Meeting"));
const DevelopmentGroup_1 = __importDefault(require("../models/DevelopmentGroup"));
// 📌 Récupérer toutes les réunions d’un groupe spécifique
// 📌 Récupérer toutes les réunions d’un groupe spécifique
const getMeetingsByTeam = async (req, res) => {
    const { teamId } = req.params;
    try {
        const meetings = await Meeting_1.default.findAll({
            where: { group_id: teamId },
            include: [
                { model: DevelopmentGroup_1.default, attributes: ["name"] },
            ],
            attributes: ["id", "meeting_datetime", "end_datetime", "description", "room"], // Ajout de `end_datetime` ici
        });
        res.json(meetings);
    }
    catch (error) {
        res.status(500).json({ message: "Erreur serveur", error });
    }
};
exports.getMeetingsByTeam = getMeetingsByTeam;
// 📌 Supprimer une réunion existante
const deleteMeeting = async (req, res) => {
    const { meetingId } = req.params;
    try {
        const meeting = await Meeting_1.default.findByPk(meetingId);
        if (!meeting) {
            return res.status(404).json({ message: "Réunion non trouvée" });
        }
        await meeting.destroy();
        res.json({ message: "Réunion supprimée avec succès" });
    }
    catch (error) {
        res.status(500).json({ message: "Erreur serveur", error });
    }
};
exports.deleteMeeting = deleteMeeting;
// 📌 Ajouter une nouvelle réunion avec vérification de conflit
const addMeeting = async (req, res) => {
    const { meeting_datetime, end_datetime, group_id, description, room } = req.body;
    try {
        // Vérifier si une réunion existe déjà qui chevauche celle à créer pour ce groupe
        const existingMeeting = await Meeting_1.default.findOne({
            where: {
                group_id,
                [sequelize_1.Op.or]: [
                    {
                        meeting_datetime: {
                            [sequelize_1.Op.lte]: end_datetime, // Vérifie si la réunion existante commence avant ou au même moment que la réunion finie
                        },
                        end_datetime: {
                            [sequelize_1.Op.gte]: meeting_datetime, // Vérifie si la réunion existante finit après ou au même moment que la réunion débutée
                        },
                    },
                ],
            },
        });
        if (existingMeeting) {
            return res.status(400).json({ message: "Une réunion existe déjà à cette heure pour ce groupe." });
        }
        // Créer la nouvelle réunion avec la date de fin
        const newMeeting = await Meeting_1.default.create({
            meeting_datetime,
            end_datetime, // Inclure la date de fin
            group_id,
            description,
            room,
        });
        res.status(201).json(newMeeting);
    }
    catch (error) {
        res.status(500).json({ message: "Erreur serveur", error });
    }
};
exports.addMeeting = addMeeting;
// 📌 Mettre à jour une réunion existante
const updateMeeting = async (req, res) => {
    const meetingId = req.params.id;
    const { meeting_datetime, end_datetime, description, room, group_id } = req.body;
    try {
        const meeting = await Meeting_1.default.findByPk(meetingId);
        if (!meeting) {
            return res.status(404).json({ message: "Réunion non trouvée" });
        }
        // Mise à jour des détails de la réunion, y compris `end_datetime`
        meeting.meeting_datetime = meeting_datetime;
        meeting.end_datetime = end_datetime; // Mise à jour de `end_datetime`
        meeting.description = description;
        meeting.room = room;
        meeting.group_id = group_id;
        await meeting.save();
        res.status(200).json(meeting);
    }
    catch (error) {
        res.status(500).json({ message: "Erreur serveur", error });
    }
};
exports.updateMeeting = updateMeeting;
