import mongoose, { Schema } from "mongoose";
import validator from "validator"

const ambulanceRequestSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },

  email:{
         type:String,
         required:true,
         validate:{
                     validator:validator.isEmail,
                     message:props=>`${props.value} is not a valid email!`
         }
     },
  phonenumber: {
    type: String,
    required: true,
    trim: true
  },

  location: {
    type: String,
    required: true,
    trim: true
  },

  emergencyDetails: {
    type: String,
    required: true,
    trim: true
  }

});

export const AmbulanceRequest = mongoose.model('AmbulanceRequest', ambulanceRequestSchema);

