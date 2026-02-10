import { sequelize } from "../config/config";
import { Request, Response } from "express";
import { account } from "../models/account";
import { transactionsServices } from "../services/balancetransaction";
import { auditlogs } from "../models/auditlogs";

export const transactions = async (req: Request, res: Response) => {
    const transaction = await sequelize.transaction();
    try {
        const { sendAccountId, recevierAccountId, balance } = req.body
        const receivingCustomer: any = await account.findOne({
            where: { id: recevierAccountId },
            lock: transaction.LOCK.UPDATE,
            transaction
        })
        const sendingCustomer: any = await account.findOne({
            where: { id: sendAccountId },
            lock: transaction.LOCK.UPDATE,
            transaction
        })
        if (sendingCustomer?.dataValues.balance < balance) {
            throw new Error('Insuffcient balance')
        }
        if (!receivingCustomer || !sendingCustomer) {
            throw new Error('Account not found');
        }
        if (balance < 0) {
            throw new Error('balance must be postive');
        }
        if(sendingCustomer.isBlocked){
            throw new Error('Acccount is blocked, not possible to send balance')
        }
         if(receivingCustomer.isBlocked){
            throw new Error('Acccount is blocked, not possible to receive balance')
        }
        const prevSendingCustomer = sendingCustomer.dataValues;
        const prevReceivingCustomer = receivingCustomer.dataValues;
        const prevState = { prevSendingCustomer, prevReceivingCustomer }
        const result = await transactionsServices(receivingCustomer, sendingCustomer, balance, transaction)
        await auditlogs.create({
            url: req.originalUrl,
            table_name: account.tableName,
            operation_type: "Transfer",
            before_status:prevState,
            after_status:{message:`Sucessfully trnasefer from ${sendAccountId} to ${recevierAccountId}`},
        }, { transaction })
        await transaction.commit();
        return res.send({ message: `successfully ${balance} rupees to the ${recevierAccountId}` })
    } catch (error: any) {
        await auditlogs.create({
            url: req.originalUrl,
            table_name: account.tableName,
            operation_type: "Transfer",
            before_status:{},
            after_status:{message:"Fail while transefering balance"},
        }, { transaction })
        await transaction.rollback();
        return res.status(500).send(error.message)
    }
}

