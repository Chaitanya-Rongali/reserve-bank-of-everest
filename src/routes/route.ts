import express from "express"
import { addCustomer } from "../controllers/customer";
export const router=express.Router();
router.post('/createCustomer',addCustomer)