const { Sequelize, DataTypes } = require('sequelize');
import { sequelize } from "../config/config";
export const customer = sequelize.define(
    "Customers",
    {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
        firstName: {
            allowNull: false,
            type: Sequelize.STRING
        },
        lastName: {
            allowNull: false,
            type: Sequelize.STRING
        },
        email: {
            allowNull: false,
            type: Sequelize.STRING,
            unique: true,
            validate: {
                isEmail: true,
            },

        },
        mobile_number: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true,
            validate: {
                len: [10, 10],
            },




        },
        adhar_number: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true,
            validate: {
                len: [12, 12],
            },

        },
        pan_number: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true,
            validate: {
                len: [10, 10],
            },

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