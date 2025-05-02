import {Router} from "express"
import { requestAmbulance } from "../controllers/ambulancerequest.controller.js"; 

const router=Router();

router.route("/request").post(requestAmbulance)

export default router;