import { Request, Response } from "express"
import { sequelize } from "../config/config"
import { account } from "../models/account";
import { auditlogs } from "../models/auditlogs";
import { withDrawBalance } from "../services/withdraw";
export const DebitBalance = async (req: Request, res: Response) => {
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
        const findAccountId = await account.findOne({
            where: {
                id: accountId
            },
            lock: transaction.LOCK.UPDATE,
            transaction,
        })
        if (!findAccountId) {
            throw new Error('Account not found');
        }
        if (findAccountId?.dataValues.isBlocked) {
            throw new Error('Account is blocked, Not possible to debit this account');
        }
        if (findAccountId.dataValues?.balance < balance) {
            throw new Error('Insuffcient balance')
        }
        const prevBalance = findAccountId.dataValues;
        console.log(prevBalance)
        const result = await withDrawBalance(balance, findAccountId)
        await auditlogs.create({
            url: req.originalUrl,
            table_name: account.tableName,
            operation_type: "withDraw",
            before_status: prevBalance,
            after_status: {message:"Successfully withdraw from account"}
        }, { transaction })
        await transaction.commit();
        return res.status(201).send({ message: "Successfully withdraw from account", result })

    } catch (error: any) {
        await auditlogs.create({
            url: req.originalUrl,
            table_name: account.tableName,
            operation_type: "withDraw",
            before_status: balance,
            after_status: {message:"Fail while withdraww money"}
        })
        await transaction.rollback();
        return res.status(500).send(error.message)
    }
}