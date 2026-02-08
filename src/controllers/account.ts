import { Request, Response } from "express";
import { customer } from "../models/customer";
import { branch } from "../models/branch";
import { addAccount } from "../services/account";
import { auditlogs } from "../models/auditlogs";
import { account } from "../models/account"
import { sequelize } from "../config/config";
export const createAccount = async (req: Request, res: Response) => {
    const transaction = await sequelize.transaction();
    try {
        const { account_number, account_type, balance, branch_id } = req.body;
        const id = req.params.id as string;
        if (!account_number || !account_type || !balance || !branch_id) {
            return res.status(400).send({ message: "All values are required" })
        }
        const findCustomer = await customer.findByPk(id)
        if (!findCustomer) {
            return res.status(404).send({ message: "Customer is not exists" })
        }
        if (findCustomer?.dataValues.is_deleted == true) {
            return res.status(201).send({ message: "customer is in active" })
        }
        const findBranch = await branch.findByPk(branch_id)
        if (!findBranch) {
            return res.status(404).send({ message: "Branch is not exists" })
        }

        const result = await addAccount(account_number, account_type, balance, branch_id, id)
         await auditlogs.create({
            url: req.originalUrl,
            table_name: account.tableName,
            operation_type: "POST",
            before_status: {},
            after_status: result.dataValues
        },{ transaction })
        await transaction.commit();
        return res.status(201).send({ message: "Successfully create account", result })
    } catch (error) {
        await transaction.rollback();
        return res.status(500).send({ message: "Error while creatinmg task", error })
    }

}

