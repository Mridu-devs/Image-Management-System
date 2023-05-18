import { DataTypes } from "sequelize";

export default (sequelize) =>
  sequelize.define(
    "album",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      default_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      keyword: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      input1: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      input2: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      input3: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      input4: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      image: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      timestamps: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  );
