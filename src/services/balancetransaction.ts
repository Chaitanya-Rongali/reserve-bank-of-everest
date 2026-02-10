import { sequelize } from "../config/config";
export const transactionsServices= async(receivingCustomer:any,sendingCustomer:any,balance:number,transaction:any)=>{
  sendingCustomer.balance=parseFloat(sendingCustomer.balance)-balance;
  receivingCustomer.balance=parseFloat(receivingCustomer.balance)+balance;
  await sendingCustomer.save({transaction});
  await receivingCustomer.save({transaction})
  return {senderDetails:sendingCustomer.dataValues,receiverDetails:receivingCustomer.dataValues}
}