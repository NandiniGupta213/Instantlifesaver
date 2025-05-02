import mongoose, { Schema } from "mongoose";
import validator from "validator"

const OrganDonateFormSchema=new Schema({
     name:{
            type:String,
            required:true,
            trim:true,
        },
    email:{
            type:String,
            required:true,
            unique:true,
            validate:{
            validator:validator.isEmail,
            message:props=>`${props.value} is not a valid email!`
        }
    },
    phone:{
        type:String,
        required:true,
        validate: {
            validator: function (value) {
                return /^[6789]\d{9}$/.test(value);
            },
            message: props => `${props.value} is not a valid phone number!`
        }
    },
    address:{
        type:String,
        required:true,
    },
    age:{
        type:String,
        required:true
    },
    bloodgroup:{
      type:String,
      required:true
    },
    organ:{
       type:String,
       required:true
    },
    emergencycontactname:{
        type:String,
        required:true
    },
    emergencyphone:{
        type:String,
        required:true,
        validate: {
            validator: function (value) {
                return /^[6789]\d{9}$/.test(value);
            },
            message: props => `${props.value} is not a valid phone number!`
        }
    }

})

export const OrganDonateForm=mongoose.model("OrganDonateForm",OrganDonateFormSchema);