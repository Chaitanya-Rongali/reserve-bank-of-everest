import { customer } from "../models/customer"
export const createCustomer = async (new_customer: any) => {
    const result = await customer.create(new_customer)
    return result;
}
export const fetchCustomerDetails = async () => {
    const result = await customer.findAll();
    return result;
}
export const updateCustomerDetails = async (updateDetails: any, id: string) => {
    const result = customer.update(updateDetails, {
        where: {
            id: id
        }
    })
    return result;
}