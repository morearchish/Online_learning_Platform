import express from "express";
import registerController from "../controller/authController.js"

// router object
const router = express.Router()


// routing
// REGISTER || METHOD POST
router.post('/register',registerController)

export default router 
