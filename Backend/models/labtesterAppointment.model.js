import mongoose, { Schema } from "mongoose";
import validator from "validator"

const LabTesterAppointmentSchema=new Schema({
    name:{
            type:String,
            required:true,
            trim:true
        },
        email:{
            type:String,
            required:true,
            validate:{
                validator:validator.isEmail,
                message:props=>`${props.value} is not a valid email!`
            }
        },
        phonenumber:{
            type:String,
            required:true,
            validate: {
                validator: function (value) {
                    return /^[6789]\d{9}$/.test(value);
                },
                message: props => `${props.value} is not a valid phone number!`
            }
        },
        speciality: {
            type: String,
            required: true,
            enum: [
                'Blood Test',
                'Urine Test',
                'Hormone Tests',
                'Infectious Disease Tests',
                'Allergy & Sensitivity Tests',
                'Cancer Screening Tests',
            ]
        },
        Lab_name:{
            type:String,
            required:true
        },
        preferred_time:{
           type:String,
           required:true
        }
})



export const LabTesterAppointmentForm=mongoose.model("LabTesterAppointmentForm",LabTesterAppointmentSchema)