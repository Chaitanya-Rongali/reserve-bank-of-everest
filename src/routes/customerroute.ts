import  express  from "express";
import { addCustomer, deleteCustomer, getCustomersDeatils, modifiyCustomerDetails } from "../controllers/customer";
export const customerRouter=express.Router();
customerRouter.post('/createCustomer',addCustomer)
customerRouter.get('/fetchCustomers',getCustomersDeatils)
customerRouter.put('/updateCustomer/:id',modifiyCustomerDetails)
customerRouter.put('/deleteCustomer/:id',deleteCustomer)