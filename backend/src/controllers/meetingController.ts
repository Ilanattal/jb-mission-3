import { Request, Response } from "express";
import { Op } from "sequelize";
import Meeting from "../models/Meeting";
import DevelopmentGroup from "../models/DevelopmentGroup";

// 📌 Récupérer toutes les réunions d’un groupe spécifique
export const getMeetingsByTeam = async (req: Request, res: Response) => {
    const { teamId } = req.params;
  
    try {
      const meetings = await Meeting.findAll({
        where: { group_id: teamId },
        include: [{ model: DevelopmentGroup, attributes: ["name"] }],
      });
  
      res.json(meetings);
    } catch (error) {
      res.status(500).json({ message: "Erreur serveur", error });
    }
  };

// 📌 Ajouter une nouvelle réunion avec vérification de conflit
export const addMeeting = async (req: Request, res: Response) => {
    const { meeting_datetime, group_id, description, room } = req.body;
  
    try {
      // Vérifier si une réunion existe déjà à cette heure pour ce groupe
      const existingMeeting = await Meeting.findOne({
        where: {
          group_id,
          meeting_datetime,
        },
      });
  
      if (existingMeeting) {
        return res.status(400).json({ message: "Une réunion existe déjà à cette heure pour ce groupe." });
      }
  
      // Créer la nouvelle réunion
      const newMeeting = await Meeting.create({ meeting_datetime, group_id, description, room });
      res.status(201).json(newMeeting);
    } catch (error) {
      res.status(500).json({ message: "Erreur serveur", error });
    }
  };

// 📌 Supprimer une réunion existante
export const deleteMeeting = async (req: Request, res: Response) => {
  const { meetingId } = req.params;
  try {
    const meeting = await Meeting.findByPk(meetingId);
    if (!meeting) {
      return res.status(404).json({ message: "Réunion non trouvée" });
    }
    await meeting.destroy();
    res.json({ message: "Réunion supprimée avec succès" });
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error });
  }
};