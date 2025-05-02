import {Router} from "express"
import { DonateForm } from "../controllers/organDonateForm.controller.js"

const router=Router();

router.route("/DonateorganForm").post(DonateForm);

export default router