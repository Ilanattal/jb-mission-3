import express from "express";
import sequelize from "./db/sequelize";  // Assure-toi que sequelize est bien importé
import meetingRoutes from "./routers/meetingRoutes";
import teamRoutes from "./routers/teamRoutes";
import cors from "cors";



const app = express();


app.use(cors());  // Autorise les requêtes venant de n'importe quelle origine
app.use(express.json());
app.use(meetingRoutes);  // Routes des meetings
app.use(teamRoutes);     // Routes des teams

// Synchronisation des modèles
sequelize.sync()
  .then(() => {
    console.log("Base de données synchronisée !");
    app.listen(3001, () => {
      console.log("Serveur démarré sur http://localhost:3001");
    });
  })
  .catch((error) => {
    console.error("Erreur lors de la synchronisation de la base de données : ", error);
  });