import { sequelize } from "../config/config";
import { account } from "../models/account"

export const depositBalance=async (balance:number,findId:any)=>{
   findId.balance=parseFloat(findId.balance)+ balance;
   findId.save()
   return findId;
 }