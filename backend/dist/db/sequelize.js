"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_typescript_1 = require("sequelize-typescript");
const DevelopmentGroup_1 = __importDefault(require("../models/DevelopmentGroup"));
const Meeting_1 = __importDefault(require("../models/Meeting")); // Importer le modèle mis à jour avec `end_datetime`
const DB_NAME = "dev_meetings";
const DB_USER = "root";
const DB_PASSWORD = "";
const DB_HOST = "localhost";
// Configuration de Sequelize
const sequelize = new sequelize_typescript_1.Sequelize({
    database: DB_NAME,
    username: DB_USER,
    password: DB_PASSWORD,
    host: DB_HOST,
    dialect: "mysql",
    models: [DevelopmentGroup_1.default, Meeting_1.default], // Assurez-vous que le modèle Meeting avec `end_datetime` est ici
    logging: false,
});
exports.default = sequelize;
