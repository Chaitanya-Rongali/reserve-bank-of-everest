import  express  from "express";
import { blockStatus, createAccount } from "../controllers/account";
export const accountRouter=express.Router();
accountRouter.post('/addAccount/:id',createAccount)
accountRouter.put('/blockOrUnblockStatus/:id',blockStatus)