import  express  from "express";
import { creditBalance } from "../controllers/creditbalance";
import { DebitBalance } from "../controllers/withdraw";
import { transactions } from "../controllers/balancetransactions";
export const transactionRouter=express.Router();
transactionRouter.put('/creditMoney/:id',creditBalance)
transactionRouter.put('/withDrawBalance/:id',DebitBalance)
transactionRouter.put('/trnascations',transactions)