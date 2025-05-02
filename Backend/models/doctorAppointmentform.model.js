import mongoose, { Schema } from "mongoose";
import validator from "validator"
import bcrypt from "bcrypt"

const DoctorAppointmentSchema=new Schema({
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
                'Child Specialist',
                'Dentist',
                'Cardiologist',
                'Neurologist',
                'Orthopedist',
                'Dermatologist',
                'Gynecologist',
                'General Physician'
            ]
        },
        hospital_name:{
            type:String,
            required:true
        },
        preferred_time:{
           type:String,
           required:true
        }
})


export const DoctorAppointmentForm=mongoose.model("DoctorAppointmentForm",DoctorAppointmentSchema)