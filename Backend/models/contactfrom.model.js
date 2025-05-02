import mongoose, { Schema } from "mongoose";
import validator from "validator"

const formSchema=new Schema({
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
    },
    subject:{
        type:String,
        required:true
    },
    message:{
        type:String
    }

})

export const FormSchema=mongoose.model("FormSchema",formSchema);