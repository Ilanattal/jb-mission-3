import { Sequelize } from "sequelize-typescript";
import DevelopmentGroup from "../models/DevelopmentGroup";
import Meeting from "../models/Meeting";

const DB_NAME = "dev_meetings";
const DB_USER = "root";
const DB_PASSWORD = "";
const DB_HOST = "localhost";

const sequelize = new Sequelize({
  database: DB_NAME,
  username: DB_USER,
  password: DB_PASSWORD,
  host: DB_HOST,
  dialect: "mysql",
  models: [DevelopmentGroup, Meeting], // Ajout des modèles ici
  logging: false,
});

export default sequelize;