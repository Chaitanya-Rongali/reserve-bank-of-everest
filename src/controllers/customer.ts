import { Request,Response } from "express"
import { createCustomer, fetchCustomerDetails } from "../services/customer"

export const addCustomer=async(req:Request,res:Response)=>{
    try{
    const{firstName,lastName, email,mobile_number,adhar_number,pan_number}=req.body
    const new_customer={
       firstName,
       lastName,
       email,
       mobile_number,
       adhar_number,
       pan_number 
    }
    if(!firstName || !lastName || !email || !mobile_number || !adhar_number || !pan_number){
        return res.status(400).send("All values are required")
    }
    const result=await createCustomer(new_customer)
    return res.status(201).send({message:"Customer created successfully",result})

 }catch(error:any){
    if(error.name=='SequelizeValidationError'){
        return res.status(400).send({message:"Email must contain '@",error})
    }
    if(error.name=="SequelizeUniqueConstraintError")
    return res.status(500).send({message:"Already data exits with mobile_number/adhar_number/pan_number",error})
 }
}

export const getCustomersDeatils=async(req:Request,res:Response)=>{
 const result= await fetchCustomerDetails()
 console.log(result)
 if(result.length==0){
    return res.status(200).send({message:"Customers not exists",result})
 }
 return res.status(200).send({message:"Customers",result})
}