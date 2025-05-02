import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import session from "express-session"
import UserRouter from "./routes/user.router.js"
import ContactForm from "./routes/contactform.router.js"
import DoctorAppointmentForm from "./routes/doctorAppointmentform.router.js"
import LabForm from "./routes/labtester.router.js"
import Donateform from "./routes/organDonateForm.router.js"
import Requistionform from "./routes/organrequistion.router.js"
import AmbulanceRequestform from "./routes/ambulancerequest.router.js"
dotenv.config({
    path:'./.env'
})

const app = express();

app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: process.env.SESSION_SECRET,
}));
  
app.use(cors({ origin: 'http://127.0.0.1:5501' })); 
app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended: true, limit: "16kb"}))



app.use("/user",UserRouter)
app.use("/contactform",ContactForm)
app.use("/doctorappointmentform",DoctorAppointmentForm)
app.use("/labtesterappointmentform",LabForm)
app.use("/OrganDonateForm",Donateform)
app.use("/OrganRequistiomForm",Requistionform)
app.use("/ambulance",AmbulanceRequestform)



export {app}