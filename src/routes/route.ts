import express from "express"
import { addCustomer, getCustomersDeatils } from "../controllers/customer";
export const router=express.Router();
router.post('/createCustomer',addCustomer)
router.get('/fetchCustomers',getCustomersDeatils)