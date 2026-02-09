import express from "express"
import { addCustomer, deleteCustomer, getCustomersDeatils, modifiyCustomerDetails } from "../controllers/customer";
import { blockStatus, createAccount } from "../controllers/account";
import { creditBalance } from "../controllers/creditbalance";
import { DebitBalance } from "../controllers/withdraw";
export const router=express.Router();
router.post('/createCustomer',addCustomer)
router.get('/fetchCustomers',getCustomersDeatils)
router.put('/updateCustomer/:id',modifiyCustomerDetails)
router.put('/deleteCustomer/:id',deleteCustomer)
router.post('/addAccount/:id',createAccount)
router.put('/blockOrUnblockStatus/:id',blockStatus)
router.put('/creditMoney/:id',creditBalance)
router.put('/withDrawBalance/:id',DebitBalance)