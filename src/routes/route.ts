import express from "express"
import { addCustomer, deleteCustomer, getCustomersDeatils, modifiyCustomerDetails } from "../controllers/customer";
import { createAccount } from "../controllers/account";
export const router=express.Router();
router.post('/createCustomer',addCustomer)
router.get('/fetchCustomers',getCustomersDeatils)
router.put('/updateCustomer/:id',modifiyCustomerDetails)
router.put('/deleteCustomer/:id',deleteCustomer)
router.post('/addAccount/:id',createAccount)