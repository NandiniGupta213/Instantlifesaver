import { asynchandler } from "../utils/asynchHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import {OrganDonateForm} from "../models/organDonateForm.model.js"

const DonateForm=asynchandler(async(req,res,next)=>{
    const {name,email,phone,address,age,bloodgroup,organ,emergencycontactname,emergencyphone}=req.body;

    if(
        [name,email,phone,address,age,bloodgroup,organ,emergencycontactname,emergencyphone].some((feild)=>feild?.trim()==="")
    ){
        throw new ApiError(400,"All feilds are required to fill");
    }

    try {
        const form=await OrganDonateForm.create({name,email,phone,address,age,bloodgroup,organ,emergencycontactname,emergencyphone});

        if(!form){
            throw new ApiError(500,"Something went wrong. Please try again later.")
        }
        console.log("Data Added to database");
        return res.status(201).json(new ApiResponse(201,form,"Form Submitted"));
    } catch (error) {
        console.log(error.message)
        throw new ApiError(500,"Form not submitted beacuse of some reason");
    }
})
export {DonateForm}