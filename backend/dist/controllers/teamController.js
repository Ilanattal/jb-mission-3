"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllTeams = void 0;
const DevelopmentGroup_1 = __importDefault(require("../models/DevelopmentGroup"));
// 📌 Récupérer tous les groupes de développement
const getAllTeams = async (req, res) => {
    try {
        const teams = await DevelopmentGroup_1.default.findAll();
        res.json(teams);
    }
    catch (error) {
        res.status(500).json({ message: "Erreur serveur", error });
    }
};
exports.getAllTeams = getAllTeams;
