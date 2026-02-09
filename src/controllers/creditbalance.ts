import { Request, Response } from "express"
import { sequelize } from "../config/config"
import { account } from "../models/account";
import { depositBalance } from "../services/creditbalance";
import { auditlogs } from "../models/auditlogs";
export const creditBalance = async (req: Request, res: Response) => {
    const accountId = req.params.id as string;
    const { balance } = req.body;
    const transaction = await sequelize.transaction();
    try {
        if (!accountId) {
             await transaction.rollback();
            return res.status(400).send({ message: "all values are required" })
        }
        if(balance<0){
             await transaction.rollback();
            return res.status(400).send({message:"balance must be postive"})
        }
        const findId = await account.findOne({
            where: {
                id: accountId
            },
            lock: transaction.LOCK.UPDATE,
            transaction,
        })
        if (!findId) {
             await transaction.rollback();
            return res.status(404).send({ message: "Account not found" })
        }
        if (findId?.dataValues.isBlocked) {
            await transaction.rollback();
            return res.status(403).send({ message: "Account is blocked, Not possible to credit this account" })
        }
        const result=await depositBalance(balance,findId)
        await auditlogs.create({
                    url: req.originalUrl,
                    table_name: account.tableName,
                    operation_type: "Deposit",
                    before_status: balance,
                    after_status: result.dataValues
                },{ transaction })
         await transaction.commit();
         return res.status(201).send({message:"Successfully credit to account",result})
        
    } catch (error) {
        await transaction.rollback();
        await auditlogs.create({
                    url: req.originalUrl,
                    table_name: account.tableName,
                    operation_type: "Deposit",
                    before_status: balance,
                    after_status: error
                },{ transaction })
         res.status(500).send({ message: "Error while credit balance his account", error })
    }
}