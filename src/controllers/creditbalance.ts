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
            throw new Error('all values are required');
        }
        if (balance < 0) {
            throw new Error('balance must be postive');
        }
        const findId = await account.findOne({
            where: {
                id: accountId
            },
            lock: transaction.LOCK.UPDATE,
            transaction,
        })
        if (!findId) {
            throw new Error('Account not found');
        }
        if (findId?.dataValues.isBlocked) {
            throw new Error('Account is blocked, Not possible to credit this account');
        }
        const result = await depositBalance(balance, findId)
        await auditlogs.create({
            url: req.originalUrl,
            table_name: account.tableName,
            operation_type: "Deposit",
            before_status: balance,
            after_status: {message:"Sucessfully deposit the balance"}
        }, { transaction })
        await transaction.commit();
        return res.status(201).send({ message: "Successfully credit to account", result })

    } catch (error:any) {
       await auditlogs.create({
            url: req.originalUrl,
            table_name: account.tableName,
            operation_type: "Deposit",
            before_status: balance,
            after_status: {message:"Fail while deposit the balance"}
        })
        await transaction.rollback();
       return res.status(500).send(error.message)
    }
}