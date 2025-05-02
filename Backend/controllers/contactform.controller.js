import { asynchandler } from "../utils/asynchHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { FormSchema } from "../models/contactfrom.model.js";

const contactform=asynchandler(async(req,res,next)=>{

    const {name,email,phonenumber,subject,message}=req.body;

    if(!email || !phonenumber){
        throw new ApiError(400,"Email or phonenumber is required");
    }
    if (phonenumber.length !== 10 || isNaN(phonenumber)) {
        throw new ApiError(400, "Phone number must be exactly 10 numeric digits");
    }

    try {
        const form=await FormSchema.create({name,email,phonenumber});

        console.log("data added");
        return res.status(201).json(new ApiResponse(201,form,"Form Submitted"));
    } catch (error) {
        console.log(error.message)
        throw new ApiError(500,"Form not submitted beacuse of some reason");
    } 
})
export {contactform}


