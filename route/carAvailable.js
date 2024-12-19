import express from "express"
import {addAvailablecar,getCarsByUser,getCarByName,GetAllCar} from "../controller/car.js"
import upload from "../middleware/multer.js"
import {authMiddleware} from "../middleware/authethicateToken.js"
const carroute=express.Router();
carroute.post("/add",upload.single('image'),addAvailablecar);
carroute.get("/userCar",authMiddleware,getCarsByUser)
export default carroute;