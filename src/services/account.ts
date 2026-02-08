import { account } from "../models/account"

export const addAccount = async (account_number: string, account_type: string, balance: number, branch_id: string, id: string) => {
    const result = await account.create({
        account_number: account_number,
        account_type: account_type,
        balance: balance, branch_id,
        customer_id: id
    })
    return result;
}