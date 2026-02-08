import { sequelize } from "../config/config";
import { account } from "../models/account"

export const addAccount = async (account_number: string, account_type: string, balance: number, branch_id: string, id: string) => {
     const transaction = await sequelize.transaction();
    const result = await account.create({
        account_number: account_number,
        account_type: account_type,
        balance: balance, branch_id,
        customer_id: id
    },{transaction})
    return result;
}

export const blockStatusServices=async(id:string,isBlocked:boolean)=>{
    const result= await account.update({isBlocked},{
    where: {
      id: id,
    },
  })
  return result;
}