import { asynchandler } from "../utils/asynchHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import {DoctorAppointmentForm} from "../models/doctorAppointmentform.model.js"

const Form=asynchandler(async(req,res,next)=>{
    const {name,email,phonenumber,speciality,hospital_name,preferred_time}=req.body;
    console.log(req.body)

    if(
        [name,email,phonenumber,speciality,hospital_name,preferred_time].some((feild)=>feild?.trim()==="")
    ){
        throw new ApiError(400,"All feilds are required to fill");
    }

    try {
            const form=await DoctorAppointmentForm.create({name,email,phonenumber,speciality,hospital_name,preferred_time});
            if(!form){
                throw new ApiError(500,"Something went wrong. Please try again later.")
            }
            console.log("data added");
            return res.status(201).json(new ApiResponse(201,form,"Form Submitted"));
        } catch (error) {
            console.log(error.message)
            throw new ApiError(500,"Form not submitted beacuse of some reason");
        } 
})
export {Form}