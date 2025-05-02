import {Router} from "express"
import {Form} from "../controllers/DoctorAppointmentform.controller.js"

const router=Router();

router.route("/DoctorAppointmentForm").post(Form)

export default router