import { asynchandler } from "../utils/asynchHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { AmbulanceRequest } from "../models/ambulancerequest.model.js"

export const requestAmbulance = asynchandler(async (req, res) => {
  const { name, email, phonenumber, location, emergencyDetails } = req.body;

  if (!name || !email || !phonenumber || !location || !emergencyDetails) {
    throw new ApiError(400, "All fields are required.");
  }


 try {
     const request = await AmbulanceRequest.create({
       name,
       email,
       phonenumber,
       location,
       emergencyDetails
     });
   
     return res.status(201).json(
       new ApiResponse(201, request, "Ambulance request submitted successfully.")
     );
 } catch (error) {
    console.error(error);
    throw new ApiError(500, "An unexpected error occurred.");
 }
});

