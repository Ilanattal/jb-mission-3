"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const sequelize_1 = __importDefault(require("./db/sequelize"));
const teamRoutes_1 = __importDefault(require("./routers/teamRoutes"));
const meetingRoutes_1 = __importDefault(require("./routers/meetingRoutes"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// 📌 Routes
app.use("/api", teamRoutes_1.default);
app.use("/api", meetingRoutes_1.default);
// 📌 Démarrage du serveur et connexion à la base de données
const startServer = async () => {
    try {
        await sequelize_1.default.authenticate();
        console.log("✅ Connexion à la base de données réussie !");
        await sequelize_1.default.sync({ alter: true });
        console.log("✅ Base de données synchronisée !");
        app.listen(3001, () => {
            console.log("🚀 Serveur démarré sur http://localhost:3001");
        });
    }
    catch (error) {
        console.error("❌ Erreur de synchronisation de la base de données :", error);
    }
};
startServer();
