import {
  Table,
  Column,
  Model,
  PrimaryKey,
  AutoIncrement,
  ForeignKey,
  BelongsTo,
  DataType,
} from "sequelize-typescript";
import DevelopmentGroup from "./DevelopmentGroup";

@Table({
  tableName: "meetings",
})
export default class Meeting extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  id!: number;

  @Column(DataType.DATE)
  meeting_datetime!: Date;

  @Column(DataType.DATE)  // Nouvelle colonne pour la date de fin
  end_datetime!: Date;   // Colonne ajoutée pour stocker la date et l'heure de fin de la réunion

  @ForeignKey(() => DevelopmentGroup)
  @Column
  group_id!: number;

  @BelongsTo(() => DevelopmentGroup)
  group!: DevelopmentGroup;

  @Column(DataType.TEXT)
  description!: string;

  @Column(DataType.STRING)
  room!: string;

  // ✅ Nouvelle colonne ajoutée (exemple : durée en minutes)
  @Column(DataType.INTEGER)
  duration!: number;
}