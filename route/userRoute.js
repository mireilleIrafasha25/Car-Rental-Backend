
import {SignIn,SignUp,ResetPassword,ForgotPassword,Validateopt,Logout,test, getAllusers} from '../controller/user.js';
import express from 'express';
import { signUpValidation,signInValidation,otpValidation,resetPasswordValidation,forgotpasswordValidation, } from '../utils/validation.js';
import {authenticateToken} from "../middleware/authethicateToken.js"
const route= express.Router();
route.get("/Test",test)
route.post('/signup',SignUp)
route.post('/signin',SignIn)
route.get('/listAll',getAllusers)
route.post('/resetpassword',resetPasswordValidation,ResetPassword)
route.post('/forgotpassword',forgotpasswordValidation,ForgotPassword)
route.post('/verify',otpValidation,Validateopt)
route.post('/logout',Logout)

export default route;
