import express from "express";
import cors from "cors";
import sequelize from "./db/sequelize";
import teamRoutes from "./routers/teamRoutes";
import meetingRoutes from "./routers/meetingRoutes";

const app = express();
app.use(cors());
app.use(express.json());

// 📌 Routes
app.use("/api", teamRoutes);
app.use("/api", meetingRoutes);

// 📌 Démarrage du serveur et connexion à la base de données
const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Connexion à la base de données réussie !");
    await sequelize.sync({ alter: true });
    console.log("✅ Base de données synchronisée !");
    app.listen(3001, () => {
      console.log("🚀 Serveur démarré sur http://localhost:3001");
    });
  } catch (error) {
    console.error("❌ Erreur de synchronisation de la base de données :", error);
  }
};

startServer();