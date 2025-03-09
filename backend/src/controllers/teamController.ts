import { Request, Response } from "express";
import DevelopmentGroup from "../models/DevelopmentGroup";

// 📌 Récupérer tous les groupes de développement
export const getAllTeams = async (req: Request, res: Response) => {
  try {
    const teams = await DevelopmentGroup.findAll();
    res.json(teams);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error });
  }
};