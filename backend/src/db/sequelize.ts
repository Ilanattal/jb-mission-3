import { Sequelize } from "sequelize-typescript";
import DevelopmentGroup from "../models/DevelopmentGroup";
import Meeting from "../models/Meeting";  // Assure-toi que tous tes modèles sont importés ici

const sequelize = new Sequelize({
  dialect: "mysql", 
  host: "localhost",
  username: "root",
  password: "",
  database: "dev_meetings",
  models: [DevelopmentGroup, Meeting], // Ajoute tous tes modèles ici
});

export default sequelize;