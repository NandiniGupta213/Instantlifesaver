import {Router} from "express"
import { LabtesterForm } from "../controllers/labTesterAppointment.controller.js";

const router=Router();

router.route("/LabTesterAppointmentForm").post(LabtesterForm)

export default router