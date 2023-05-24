import express from "express";
import {registerController,loginController, testController} from '../controller/authController.js'
import { isAdmin, requireSignIn } from "../middleware/authMiddlewar.js";

// router object
const router = express.Router()


// routing
// REGISTER || METHOD POST
router.post('/register',registerController)

// LOGIN || POST
router.post('/login',loginController)

//signIN || POST
router.post('/test',requireSignIn,isAdmin,testController)




export default router 
