import mongoose,{Schema} from "mongoose"
import validator from "validator"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import * as crypto from "crypto";


const userSchema=new Schema({
    username:{
        type:String,
        required:true,
        trim:true,
        unique:true
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
    password:{
        type:String,
        required:[true,"PassWord is required"],
        unique:true
    },
    confirmpassword:{
        type:String,
    },
    resetPasswordToken:{
        type:String,
        unique:true
    },
    resetPasswordExpiry: Date
})

userSchema.pre("save",async function(next) {
    if(!this.isModified("password"))return next();

    this.password=await bcrypt.hash(this.password,10);
    next();
})
userSchema.methods.ispasswordCorrect=async function(password){
    return await bcrypt.compare(password,this.password);
}
userSchema.methods.ResetToken = function () {
    const resetToken = crypto.randomBytes(32).toString("hex");

    this.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex");
    this.resetPasswordExpiry = Date.now() + 15 * 60 * 1000;

    const jwtToken = jwt.sign(
        { _id: this._id, resetToken },
        process.env.RESET_TOKEN_SECRET,
        { expiresIn: "15m" }
    );

    return { jwtToken, resetToken };
};


export const User=mongoose.model("User",userSchema);
