import {Router} from "express"
import { SignupUser,LoginUser,forgotPassword,resetPassword} from "../controllers/user.controller.js"

const router = Router();

router.route("/SignUp").post(SignupUser)
router.route("/LogIn").post(LoginUser)
router.route("/ForgotPassword").post(forgotPassword)
router.route("/ForgotPassword/:token").get((req, res) => {
    const { token } = req.params;
    console.log("Redirecting to reset password page with token:", token);
    res.redirect(`/Frontend/resetpassword.html?token=${token}`);
});
router.route("/ResetPassword/:token").post(resetPassword)

export default router