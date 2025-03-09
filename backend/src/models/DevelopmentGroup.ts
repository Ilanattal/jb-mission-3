import {
    Table,
    Column,
    Model,
    DataType,
    PrimaryKey,
    AutoIncrement,
    HasMany,
  } from "sequelize-typescript";
  import Meeting from "./Meeting";
  
  @Table({
    tableName: "development_groups",
    timestamps: false,
  })
  export default class DevelopmentGroup extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER)
    id: number;
  
    @Column(DataType.STRING(255))
    name: string;
  
    @HasMany(() => Meeting)
    meetings: Meeting[];
  }