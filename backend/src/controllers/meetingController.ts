import { Request, Response } from "express";
import { Op } from "sequelize";
import Meeting from "../models/Meeting";
import DevelopmentGroup from "../models/DevelopmentGroup";

// 📌 Récupérer toutes les réunions d’un groupe spécifique
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


// 📌 Ajouter une nouvelle réunion avec vérification de conflit
export const addMeeting = async (req: Request, res: Response) => {
  const { meeting_datetime, end_datetime, group_id, description, room } = req.body;

  try {
    // Vérifier si une réunion existe déjà qui chevauche celle à créer pour ce groupe
    const existingMeeting = await Meeting.findOne({
      where: {
        group_id,
        [Op.or]: [
          {
            meeting_datetime: {
              [Op.lte]: end_datetime,  // Vérifie si la réunion existante commence avant ou au même moment que la réunion finie
            },
            end_datetime: {
              [Op.gte]: meeting_datetime,  // Vérifie si la réunion existante finit après ou au même moment que la réunion débutée
            },
          },
        ],
      },
    });

    if (existingMeeting) {
      return res.status(400).json({ message: "Une réunion existe déjà à cette heure pour ce groupe." });
    }

    // Créer la nouvelle réunion avec la date de fin
    const newMeeting = await Meeting.create({
      meeting_datetime,
      end_datetime,  // Inclure la date de fin
      group_id,
      description,
      room,
    });

    res.status(201).json(newMeeting);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error });
  }
};

// 📌 Mettre à jour une réunion existante
export const updateMeeting = async (req: Request, res: Response) => {
  const meetingId = req.params.id;
  const { meeting_datetime, end_datetime, description, room, group_id } = req.body;

  try {
    const meeting = await Meeting.findByPk(meetingId);

    if (!meeting) {
      return res.status(404).json({ message: "Réunion non trouvée" });
    }

    // Mise à jour des détails de la réunion, y compris `end_datetime`
    meeting.meeting_datetime = meeting_datetime;
    meeting.end_datetime = end_datetime;  // Mise à jour de `end_datetime`
    meeting.description = description;
    meeting.room = room;
    meeting.group_id = group_id;

    await meeting.save();

    res.status(200).json(meeting);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error });
  }
};