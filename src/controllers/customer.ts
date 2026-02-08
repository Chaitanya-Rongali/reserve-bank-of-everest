import { Request, Response } from "express"
import { createCustomer, deleteCustomerServices, fetchCustomerDetails, updateCustomerDetails } from "../services/customer"
import { customer } from "../models/customer"

export const addCustomer = async (req: Request, res: Response) => {
    try {
        const { firstName, lastName, email, mobile_number, adhar_number, pan_number } = req.body
        const new_customer = {
            firstName,
            lastName,
            email,
            mobile_number,
            adhar_number,
            pan_number
        }
        if (!firstName || !lastName || !email || !mobile_number || !adhar_number || !pan_number) {
            return res.status(400).send("All values are required")
        }
        const result = await createCustomer(new_customer)
        return res.status(201).send({ message: "Customer created successfully", result })

    } catch (error: any) {
        if (error.name == 'SequelizeValidationError') {
            return res.status(400).send({ message: "Email must contain '@", error })
        }
        if (error.name == "SequelizeUniqueConstraintError") {
            return res.status(403).send({ message: "Already data exits with mobile_number/adhar_number/pan_number", error })
        }
        return res.status(500).send({ message: "Error while adding customer", error })
    }
}

export const getCustomersDeatils = async (req: Request, res: Response) => {
    try {
        const result = await fetchCustomerDetails()
        if (result.length == 0) {
            return res.status(200).send({ message: "Customers not exists", result })
        }
        return res.status(200).send({ message: "Customers", result })

    } catch (error) {
        return res.send(500).send({ mesage: "Error while fetching tasks", error })
    }

}

export const modifiyCustomerDetails = async (req: Request, res: Response) => {
    try {
        const id = req.params.id as string
        const { email, mobile_number } = req.body
        const updateDetails = {
            email,
            mobile_number
        }
        const findCustomer = await customer.findByPk(id)
        console.log(findCustomer)
        if (!id) {
            res.status(400).send({ message: "Id is required" })
        }
        if (!findCustomer) {
            return res.status(404).send({ message: "Not found", })
        }
        const result = await updateCustomerDetails(updateDetails, id)
        return res.status(201).send({ message: "Sucessfully updated the customer details", result })

    } catch (error) {
        return res.status(500).send({ message: "Error while modifiying data", error })

    }

}
export const deleteCustomer = async (req: Request, res: Response) => {
    try {
        const customerId = req.params.id as string
        if (!customerId) {
            return res.status(400).send('id is required');
        }
        const findCustomer = await customer.findByPk(customerId)
        if (!findCustomer) {
            return res.status(400).send("Customer not exists")
        }
        const result=await deleteCustomerServices(customerId)
        console.log(result)
         return res.status(200).send({message:"Successfully delted the customer"});

    } catch (error) {
        res.status(500).send({ message: "Error while deleted customer", error })
    }
}