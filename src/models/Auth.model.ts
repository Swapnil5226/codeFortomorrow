import { Model, DataTypes } from "sequelize";
import sequelize from "./db.sequelize";

export class AuthUser extends Model {
  id: bigint;
  first_name: string;
  last_name: string;
  mobile_number: string;
  email: string;
  password: string;
  session_id?: string;
}

AuthUser.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      field: "id",
    },

    first_name: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: "first_name",
    },
    last_name: {
      type: DataTypes.STRING(45),
      allowNull: true,
      field: "last_name",
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: "email",
      unique: true,
    },
    mobile_number: {
      type: DataTypes.STRING(55),
      allowNull: true,
      field: "mobile_number",
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: "password",
    },
    session_id: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: "session_id",
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: true,
      field: "created_at",
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: true,
      field: "updated_at",
    },
    deletedAt: {
      type: DataTypes.DATE,
      allowNull: true,
      field: "deleted_at",
    },
  },
  { sequelize, paranoid: true, freezeTableName: true, modelName: "users" }
);
// AuthUser.hasOne(Guard_Details, {
//     foreignKey: 'guard_id', as: 'guardDetails',
// });
