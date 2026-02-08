import { Sequelize } from "sequelize";
import dotenv from 'dotenv'
dotenv.config({ path: '.env' })
export const sequelize= new Sequelize({
    username: process.env.USER_NAME,
    password: process.env.PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: 'postgres'
})