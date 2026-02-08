const { Sequelize, DataTypes } = require('sequelize');
import { sequelize } from "../config/config";
export const account = sequelize.define(
    "Accounts",
    {
     id: {
        allowNull: false,
        autoIncrement: true,
        type: Sequelize.INTEGER
      },
      account_number: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        primaryKey: true,
      },
      account_type: {
        type: Sequelize.STRING,
        allowNull: false
      },
      balance: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
          min: 0
        }
      },
      branch_id: {
        type: Sequelize.STRING,
        references: {
          model: 'bank_branches',
          key: 'branch_id'
        },
        allowNull: false

      },
      customer_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Customers',
          key: 'id'
        },
        allowNull: false
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