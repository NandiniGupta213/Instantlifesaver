import {Router} from "express"
import {RequistionForm} from "../controllers/organrequistion.controller.js"

const router=Router();

router.route("/RequistionorganForm").post(RequistionForm);

export default router