const { Sequelize, DataTypes } = require('sequelize');
import { sequelize } from "../config/config";
export const auditlogs = sequelize.define(
    "AuditLogs",
    {
     id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      url:{
      type:Sequelize.STRING,
       allowNull:false
      },
      table_name: {
        type: Sequelize.STRING,
        allowNull:false
      },
      operation_type: {
        allowNull: false,
        type: Sequelize.STRING
      },
      before_status:{
        allowNull:false,
        type:Sequelize.JSON
      },
      after_status:{
        allowNull:false,
        type:Sequelize.JSON
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