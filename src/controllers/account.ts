import { Request, Response } from "express";
import { customer } from "../models/customer";
import { branch } from "../models/branch";
import { addAccount } from "../services/account";

export const createAccount = async (req: Request, res: Response) => {
    try {
        const { account_number, account_type, balance, branch_id} = req.body;
        const id=req.params.id as string;
        if (!account_number || !account_type || !balance || !branch_id) {
            return res.status(400).send({ message: "All values are required" })
        }
        const findCustomer = await customer.findByPk(id)
        if (!findCustomer) {
            return res.status(404).send({ message: "Customer is not exists" })
        }
        if(findCustomer?.dataValues.is_deleted==true){
            return res.status(201).send({message:"customer is in active"})
        }
       const findBranch = await branch.findByPk(branch_id)
        if (!findBranch) {
            return res.status(404).send({ message: "Branch is not exists" })
        }
     
        const result = await addAccount(account_number,account_type,balance,branch_id,id)
        return res.status(201).send({message:"Successfully create account",result})


    } catch (error) {
        res.status(500).send({ message: "Error while creatinmg task", error })
    }

}

