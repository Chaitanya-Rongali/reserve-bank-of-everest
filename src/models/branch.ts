const { Sequelize, DataTypes } = require('sequelize');
import { sequelize } from "../config/config";
export const branch = sequelize.define(
    "bank_branches",
    {
     id: {
        allowNull: false,
        autoIncrement: true,
        type: Sequelize.INTEGER
      },
      branch_id: {
        type: Sequelize.STRING,
        primaryKey: true,
        unique:true,
        allowNull:false
      },
      Name: {
        type: Sequelize.STRING,
        unique:true,
        allowNull:false
      },
      Address: {
        type: Sequelize.STRING,
        allowNull:false
      },
      bank_code: {
        type: Sequelize.STRING,
        references:{
          model:{
            tableName:'banks',
          },
          key:"bank_code"
        },
        allowNull:false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    }

)