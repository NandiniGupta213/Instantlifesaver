import { asynchandler } from "../utils/asynchHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { sendPasswordResetEmail } from "../utils/nodemailer.js";
import jwt from "jsonwebtoken";
import * as crypto from "crypto";
import bcrypt from "bcrypt"





const SignupUser=asynchandler(async(req,res,next)=>{
    const {username,email,password,confirmpassword}=req.body
    console.log(req.body)

    if(
        [username,email,password,confirmpassword].some((feild)=>feild?.trim()==="")
    ){
        throw new ApiError(400,"All feilds are required to fill");
    }
    if(password != confirmpassword){
        throw new ApiError(400,"Password and confirmPassword are not similar");
    } 
    const existedUser=await User.findOne({
        $or:[{username},{email}]
    })
    if(existedUser){
        throw new ApiError(409,"User is already existed");
    }
    try {
        const user=await User.create({username,email,password});

        const createUser=await User.findById(user._id).select("-password");

        if(!createUser){
            throw new ApiError(500,"Something went wrong. Please try again later.")
        }
        console.log("Signup successfully");

        return res
        .status(201)
        .json(new ApiResponse(201,createUser,"Signup Succesful"));
    } catch (error) {
        console.log("Some Error Ocuured during signup");
        console.log(error.message)
        throw new ApiError(500,"User can not signup bcz of some reason");
    }
})
const LoginUser=asynchandler(async(req,res,next)=>{
    const {email,password}=req.body

    if(!email || !password){
        throw new ApiError(400,"Email and password are required");
    }

    const user=await User.findOne({email})

    if(!user){
        throw new ApiError(401,"User with given email is not found");
    }

    const ispasswordValid=await user.ispasswordCorrect(password)
    if(!ispasswordValid){
        throw new ApiError(401,"Password is not correct");
    }
    console.log("Logged In Successfully")

    return res
    .status(201)
    .json(new ApiResponse(200,"User LoggedIn Succesfully"));
})
const forgotPassword = asynchandler(async(req,res)=>{
    const {email} =req.body;

    const user = await User.findOne({email})

    if(!user){
        throw new ApiError(401,"User not found with this email");
    }

    const { jwtToken, resetToken } = user.ResetToken();
    await user.save();

    // const resetLink = `${req.protocol}://${req.get('host')}/user/ForgotPassword/${resetToken}`;
    const resetLink = `http://127.0.0.1:5501/Frontend/html/resetpassword.html?token=${jwtToken}`;


    await sendPasswordResetEmail(email,resetLink,resetToken);

    console.log("Reset Link send successfully")

    return res
    .status(201)
    .json(new ApiResponse(201,"Reset Link send successfully"));

})
const resetPassword = async (req, res, next) => {
    try {
        const { token } = req.params; 
        const { newPassword } = req.body;


        if (!token) {
            return res.status(400).json({ error: "Token is required" });
        }

        const decoded = jwt.verify(token, process.env.RESET_TOKEN_SECRET);
        const { _id, resetToken } = decoded;

        const user = await User.findById(_id);
        if (!user) {
            return res.status(401).json({ error: "Invalid token" });
        }

        if (!user.resetPasswordExpiry || user.resetPasswordExpiry < Date.now()) {
            return res.status(401).json({ error: "Reset token has expired" });
        }

        const hashedToken = crypto.createHash("sha256").update(resetToken).digest("hex");

        if (hashedToken !== user.resetPasswordToken) {
            return res.status(401).json({ error: "Invalid reset token" });
        }

        user.password = await bcrypt.hash(newPassword, 10);
        user.resetPasswordToken = undefined;
        user.resetPasswordExpiry = undefined;

        await user.save();

        return res.status(200).json({ message: "Password reset successfully" });
    } catch (error) {
        console.error("Reset password error:", error);
        return res.status(401).json({ error: "Invalid or expired token" });
    }
};






export {SignupUser,LoginUser,forgotPassword,resetPassword}