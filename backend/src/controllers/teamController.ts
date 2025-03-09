import { Request, Response } from "express";
import DevelopmentGroup from "../models/DevelopmentGroup";

export const getAllTeams = async (req: Request, res: Response) => {
  try {
    const teams = await DevelopmentGroup.findAll();  // Récupérer tous les groupes
    res.json(teams);  // Retourner les équipes sous forme de JSON
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error });
  }
};