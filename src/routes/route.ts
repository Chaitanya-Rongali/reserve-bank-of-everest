import express from "express"
import { addCustomer, getCustomersDeatils, modifiyCustomerDetails } from "../controllers/customer";
export const router=express.Router();
router.post('/createCustomer',addCustomer)
router.get('/fetchCustomers',getCustomersDeatils)
router.put('/updateCustomer/:id',modifiyCustomerDetails)